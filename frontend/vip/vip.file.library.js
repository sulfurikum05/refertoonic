const videosTableBody = document.querySelector(".videos-table tbody");
const wishlistTableBody = document.querySelector(".wishlist-table tbody");

async function fetchLibraryData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/vip/getFileLibraryData", {
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
        populateReferenceTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

async function fetchWishlistData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/vip/getWishlistData", {
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
        populateWishTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

function populateWishTable(data) {
    wishlistTableBody.innerHTML = "";
    data.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.id = item.id
        row.innerHTML = `
            <td>
                <img src="${item.gif_url}" class="library-video" data-video="${item.video_url}" onclick="openVideoInPlayer(this)">
            </td>
            <td>${item.title}</td>
            <td>${item.keywords}</td>
            <td><button class="delete-wishlist-video action-button" onClick="deleteWishlistVideo(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button></td>


        `;
        wishlistTableBody.insertBefore(row, wishlistTableBody.firstChild);
    });

}

function populateReferenceTable(data) {
    videosTableBody.innerHTML = "";
    data.forEach(item => {
        const date = new Date(item.upload_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

        if (item.status == 0 || item.status == -2) {
            item.status = "Pending moderation"
        }
        if (item.status == 1) {
            item.status = "Published"
        }
        if (item.status == -1) {
            item.status = "Rejected"
        }
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <video class="library-video">
                    <source src="${item.video_url}" type="video/mp4">
                </video>
            </td>
            <td>${item.title}</td>
            <td>${item.keywords}</td>
            <td>${formattedDate}</td>
            <td class="status"><b>${item.status}</b></td>
        `;
        videosTableBody.insertBefore(row, videosTableBody.firstChild);
        const status = document.querySelector('.status')
    if (status.textContent == "Pending moderation") {
        status.classList.add('orange')
    }
    if (status.textContent == "Published") {
        status.classList.add('green')
    }
    if (status.textContent == "Rejected") {
        status.classList.add('red')
    }
    });

    
}            


document.querySelector('.video-upload-button').addEventListener('click', function () {
    const actionTh = document.getElementById('action-th')
    actionTh.classList.remove('hide')
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="video-name-cell"></td>
            <td><input type="text" class="title-input input" placeholder="Enter the name of the cartoon."></td>
            <td>The video title consists of keywords separated by spaces.</td>
            <td></td>
            <td></td>
        <td>
            <input type="file" class="video-input" accept="video/*" style="display: none;">
            <div class="actions_col">
                <button class="upload-video action-button" title="Upload"><img src="../icons/upload.gif" class="icon" alt="upload_icon"></button>
                <button class="save-video action-button" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
            </div>
        </td>
    `;
    videosTableBody.insertBefore(newRow, videosTableBody.firstChild);
    
    const uploadButton = newRow.querySelector('.upload-video');
    const videoInput = newRow.querySelector('.video-input');

    uploadButton.addEventListener('click', function () {
        videoInput.click(); 
    });

    videoInput.addEventListener(
        'change',
        function () {
            if (videoInput.files && videoInput.files.length > 0) {
                const fileName = videoInput.files[0].name; 

                const videoNameCell = newRow.querySelector('.video-name-cell');
                videoNameCell.textContent = fileName;
            }
        },
        { once: true }
    );


    const saveButton = newRow.querySelector('.save-video');
    saveButton.addEventListener('click', async function () {
        try {
            const file = videoInput.files[0];
        const title = newRow.querySelector('.title-input');

        if (!file) {
            alert('Please select a video before saving');
            return;
        }
        const fileNameWithoutExtension = file.name.replace(".mp4", "");
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title.value);
        formData.append('keywords', fileNameWithoutExtension);
        
        const token = localStorage.getItem("accessToken");
        
        const response = await fetch('http://localhost:3030/api/v1/vip/uploadLibraryVideo', {
            method: 'POST',
            headers: { 
                "Authorization": `Bearer ${token}`
             },
            body: formData
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
                const data = await response.json()
                fetchLibraryData()
                const actionTh = document.getElementById('action-th')
                actionTh.classList.add('hide')
                showMessage(data.message)

        } catch (error) {
            console.error("Failed to remove video from the favorites list", error);
        }
        


    })
})

fetchLibraryData()
fetchWishlistData()



async function deleteWishlistVideo(elem) {
    const row = elem.closest('tr')
    const id = row.dataset.id

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/vip/removeVideoFromWishlist", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                 },
                 body: JSON.stringify({ id: id  })
            });
            if(response.status == 401){
                localStorage.removeItem("accessToken")
             
                window.open("../dashboard.html");
              }
            const data = await response.json()
            fetchWishlistData()
            showMessage(data.message)
    
        } catch (error) {
            console.error("Failed to remove video from the favorites list", error);
        }
    
}


const videosHeader = document.querySelector('.videos-header')
const videosTable = document.querySelector('.videos-table')
const wishlistHeader = document.querySelector('.wishlist-videos-header')
const wishlistTable = document.querySelector('.wishlist-table')

function showReferencesTable() {
    if (wishlistHeader.classList.contains('hide') && wishlistTable.classList.contains('hide')) {
        return
    }else{
        videosHeader.classList.remove('hide')
        videosTable.classList.remove('hide')
        wishlistHeader.classList.add('hide')
        wishlistTable.classList.add('hide')
    }
}
function showWishlistTable() {
    if (videosHeader.classList.contains('hide') && videosTable.classList.contains('hide')) {
        return
    }else{
        videosHeader.classList.add('hide')
        videosTable.classList.add('hide')
        wishlistHeader.classList.remove('hide')
        wishlistTable.classList.remove('hide')
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



