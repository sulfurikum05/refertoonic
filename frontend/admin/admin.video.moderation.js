const videosTableBody = document.querySelector(".videos-table tbody");

async function fetchModerationVideos() {
    try {

        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/admin/getModerationVideos", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        
        populateTable(data)
    } catch (error) {
        console.error("Не удалось получить данные:", error);
    }
}


function populateTable(data) {
    videosTableBody.innerHTML = "";
    data.forEach(item => {

        const date = new Date(item.upload_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
if (item.status == 0) {
    item.status = "Moderation"
}else{
    item.status = "Rejected"
}

        const row = document.createElement("tr");
        row.dataset.id = `${item.id}`
        row.innerHTML = `
            <td>
                <video class="library-video">
                    <source src="${item.video_url}" type="video/mp4">
                </video>
            </td>
            <td>${item.title}</td>
            <td>${item.keywords}</td>
            <td>${item.user_id}</td>
            <td>${formattedDate}</td>
            <td>${item.status}</td>
            <td>
                <div class="actions_col">
                <button class="publish-video action-button" onClick="publishVideo(this)" title="Publish"><img src="../icons/publish.gif" class="icon" alt="publish_icon"></button>
                <button class="reject-video action-button" onClick="rejectVideo(this)" title="Reject"><img src="../icons/reject.gif" class="icon ${item.status == "Rejected" ? "hide" : ""}" alt="reject_icon"></button>
                <button class="delete-video action-button" onClick="deleteVideo(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                </div>
            </td>
        `;
        videosTableBody.insertBefore(row, videosTableBody.firstChild);
        
    });
}            



fetchModerationVideos()

//DELETE VIDEO START//

function deleteVideo(elem) {

        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        fetch('http://localhost:3030/api/v1/admin/deleteModerationVideo', {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ id: rowId })
        })
            .then(() => fetchModerationVideos())
            .catch(console.error);



}

//DELETE VIDEO END//


//PUBLISH VIDEO START//

function publishVideo(elem) {

         
        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        fetch('http://localhost:3030/api/v1/admin/publishModerationVideo', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ id: rowId })
        })
            .then(() => fetchModerationVideos())
            .catch(console.error);



}

//PUBLISH VIDEO END//


//REJECT VIDEO START//

function rejectVideo(elem) {

         
        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        fetch('http://localhost:3030/api/v1/admin/rejectModerationVideo', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ id: rowId })
        })
            .then(() => fetchModerationVideos())
            .catch(console.error);



}

//REJECT VIDEO END//