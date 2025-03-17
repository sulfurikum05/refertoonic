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

    item.status = "Moderation"


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
                <button class="send-video action-button" onClick="sendVideoToModeration(this)" title="Send"><img src="../icons/send.gif" class="icon" alt="send_icon"></button>
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

async function deleteVideo(elem) {
        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/admin/deleteModerationVideo', {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ id: rowId })
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
            const data = await response.json()
            fetchModerationVideos()
            showMessage(data.message)
}

//DELETE VIDEO END//

//REJECT VIDEO START//

async function rejectVideo(elem) {
        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/admin/rejectModerationVideo', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ id: rowId })
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
            const data = await response.json()
            fetchModerationVideos()
            showMessage(data.message)



}

//REJECT VIDEO END//


async function sendVideoToModeration(elem){
    const row = elem.closest('tr')
    const videoId = row.dataset.id
    const token = localStorage.getItem("accessToken");
            const response = await fetch('http://localhost:3030/api/v1/admin/changeModerationVideoStatus', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id: videoId })
            })
            if(response.status == 401){
                localStorage.removeItem("accessToken")
                window.open("../dashboard.html");
              }
                const data = await response.json()
                fetchModerationVideos()
                showMessage(data.message)

}

function showMessage(messageText) {

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer')
    messageContainer.innerHTML = `
        <span>${messageText}</span>
    `;
    document.body.appendChild(messageContainer)
    messageContainer.classList.add('showMessageContainer');
    setTimeout(() => {
        messageContainer.classList.remove('showMessageContainer');
    }, 2000); 
}