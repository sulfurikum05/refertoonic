const videosTableBody = document.querySelector(".videos-table tbody");
let page = 0;
const limit = 10;
let isLoading = false;
async function fetchLibraryData() {
    if (isLoading) return;
    isLoading = true;
    try {
         const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:3030/api/v1/superadmin/getfileLibraryData?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: { 
                "Authorization": `Bearer ${token}`
             },
        });
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
        }
        const data = await response.json();
        if (data.length > 0) {
            populateTable(data)
            page++;
        }
        fetchVideosCount(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    } finally {
        isLoading = false;
    }
}


function populateTable(data) {

    data.forEach(item => {
        const date = new Date(item.upload_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const row = document.createElement("tr");
        row.dataset.id = `${item.id}`
        row.innerHTML = `
            <td><img src="${item.gif_url}" alt="Video" class="library-gif"></td>
            <td>${item.title}</td>
            <td>${item.keywords}</td>
            <td>${item.user_id}</td>
            <td>${formattedDate}</td>
            <td>
                <div class="actions_col">
                    <button class="delete-video action-button" onClick="deleteLibraryVideo(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                    <button class="unpublish action-button" onClick="unpublishVideo(this)" title="Unpublish"><img src="../icons/unpublish.png" class="icon" alt="unpublish_icon"></button>
                </div>
            </td>
        `;
        videosTableBody.insertBefore(row, videosTableBody.firstChild);
        
    });        
}       

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
        fetchLibraryData();
    }
});

function fetchVideosCount(data) {
    const infoContainer = document.querySelector(".info-container");
    const infoDiv = document.createElement("div");
    infoDiv.classList.add('infoDiv')
    const videosCount = data.length
    infoDiv.innerHTML = `
                    <span class="videosCountInfoDiv hide">Videos: ${videosCount}</span>
                `;
                infoContainer.appendChild(infoDiv);
}


document.querySelector('.video-upload-button').addEventListener('click', function () {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="video-name-cell"></td>
        <td><input type="text" class="title-input input"></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <input type="file" class="video-input" accept="video/*" style="display: none;">
            <input type="file" class="gif-input" accept="gif/*" style="display: none;">
            <div class="actions_col">
                <button class="upload-gif action-button" title="Upload gif"><img src="../icons/upload.gif" class="icon" alt="upload_icon"></button>
                <button class="upload-video action-button" title="Upload mp4"><img src="../icons/upload.gif" class="icon" alt="upload_icon"></button>
                <button class="save-video action-button" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
            </div>
        </td>
    `;
    videosTableBody.insertBefore(newRow, videosTableBody.firstChild);

    const uploadVideoButton = newRow.querySelector('.upload-video');
    const uploadGifButton = newRow.querySelector('.upload-gif');
    const videoInput = newRow.querySelector('.video-input');
    const gifInput = newRow.querySelector('.gif-input');

    uploadVideoButton.addEventListener('click', function () {
        videoInput.click(); 
    });
    uploadGifButton.addEventListener('click', function () {
        gifInput.click(); 
    });

    videoInput.addEventListener('change', function () {
        if (videoInput.files && videoInput.files.length > 0) {
            const fileName = videoInput.files[0].name; 
            const videoNameCell = newRow.querySelector('.video-name-cell');
            videoNameCell.textContent = fileName;
        }
    });
    gifInput.addEventListener('change', function () {
        if (gifInput.files && gifInput.files.length > 0) {
            const fileName = gifInput.files[0].name; 
            const videoNameCell = newRow.querySelector('.video-name-cell');
            videoNameCell.textContent = fileName;
        }
    });

    const saveButton = newRow.querySelector('.save-video');
    saveButton.addEventListener('click', async function () {
        const videoFile = videoInput.files[0];
        const gifFile = gifInput.files[0];
        const title = newRow.querySelector('.title-input');

        if (!videoFile || !gifFile) {
            alert('Please select a file before saving');
            return;
        }
        const videoFileNameWithoutExtension = videoFile.name.replace(".mp4", "");
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('gif', gifFile);
        formData.append('title', title.value);
        formData.append('keywords', videoFileNameWithoutExtension);
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/uploadLibraryVideo', {
            method: 'POST',
            headers: { 
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        if(response.status == 401) {
            localStorage.removeItem("accessToken");
            window.open("../dashboard.html");
        }
        const data = await response.json();
        if (!data.success) {
            showMessage(data.errors);
        }else{
            fetchLibraryData();
            showMessage(data.message);
            newRow.remove()
        }

    });
});


document.querySelector('.video-bulk-upload-button').addEventListener('click', function () {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="video-name-cell"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <input type="file" class="video-input" accept="video/*" multiple style="display: none;">
            <input type="file" class="gif-input" accept="gif/*" multiple style="display: none;">
            <div class="actions_col">
                <button class="bulk-upload-gif action-button" title="Upload gif"><img src="../icons/upload.gif" class="icon" alt="upload_icon">
                <button class="bulk-upload-video action-button" title="Upload mp4"><img src="../icons/upload.gif" class="icon" alt="upload_icon"></button>
                <button class="save-video action-button" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
            </div>
        </td>
    `;
    videosTableBody.insertBefore(newRow, videosTableBody.firstChild);

    const bulkUploadVideoButton = newRow.querySelector('.bulk-upload-video');
    const bulkUploadGifButton = newRow.querySelector('.bulk-upload-gif');
    const videoInput = newRow.querySelector('.video-input');
    const gifInput = newRow.querySelector('.gif-input');
    const saveButton = newRow.querySelector('.save-video');

    bulkUploadVideoButton.addEventListener('click', function () {
        videoInput.click();
    });
    bulkUploadGifButton.addEventListener('click', function () {
        gifInput.click();
    });

    let formData = new FormData();

    videoInput.addEventListener('change', function () {
        if (videoInput.files && videoInput.files.length > 0) {
            const videoNameCell = newRow.querySelector('.video-name-cell');

            Array.from(videoInput.files).forEach((file) => {
                formData.append('videos', file);
            });

            videoNameCell.textContent += `${videoInput.files.length} mp4 `;
        }
    });

    gifInput.addEventListener('change', function () {
        if (gifInput.files && gifInput.files.length > 0) {
            const gifNameCell = newRow.querySelector('.video-name-cell');

            Array.from(gifInput.files).forEach((file) => {
                formData.append('gifs', file);
            });

            gifNameCell.textContent += `${gifInput.files.length} gif`;
        }
    });

    saveButton.addEventListener('click', async function () {
        if (!formData.has('videos') && !formData.has('gifs')) {
            alert("Please select files before saving");
            return;
        }

        const token = localStorage.getItem("accessToken");

        const response = await fetch('http://localhost:3030/api/v1/superadmin/bulkUploadLibraryVideo', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.status == 401) {
            localStorage.removeItem("accessToken");
            window.open("../dashboard.html");
        }

        const data = await response.json();
        if (data.success) {
            fetchLibraryData();
            showMessage(data.message);
            newRow.remove()
        }
    });
});


fetchLibraryData()

//DELETE LIBRARY VIDEO START//

async function deleteLibraryVideo(elem) {

         
        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/deleteLibraryVideo', {
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
            if (data.success) {
                fetchLibraryData()
                showMessage(data.message)
            }
            
}


function showVideosCount(){
    const videosCountInfoDiv = document.querySelector(".videosCountInfoDiv");
    if (videosCountInfoDiv.classList.contains('hide')) {
        
        videosCountInfoDiv.classList.remove('hide')
    }else{
        videosCountInfoDiv.classList.add('hide')
    }
}


async function unpublishVideo(elem) {
    const row = elem.closest('tr')
    const video_id = row.dataset.id
    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:3030/api/v1/superadmin/unpublishVideo', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify({ id: video_id })
    })
    if(response.status == 401){
        localStorage.removeItem("accessToken")
        window.open("../dashboard.html");
    }
    const data = await response.json()
        if (data.success) {
            fetchLibraryData()
            showMessage(data.message)
        }
}

const searchInput  = document.getElementById('searchInput');
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getReferencesBySearch()
    }
  });

async function getReferencesBySearch() {
    try {
        const searchValue = searchInput.value
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:3030/api/v1/superadmin/getReferencesBySearch/${searchValue}`, {
            method: 'GET',
            headers: { 
                "Authorization": `Bearer ${token}`
             },
        });
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
        }
        const data = await response.json();
        const videoTableBody = document.querySelector('.videos-table tbody')
        videoTableBody.innerHTML = "";
        populateTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
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