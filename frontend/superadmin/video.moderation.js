const videosTableBody = document.querySelector(".videos-table tbody");

async function fetchModerationVideos() {
    try {

        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/superadmin/getModerationVideos", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
        populateTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
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
                <video class="library-video" onclick="openVideoInPlayer(this)" data-video="${item.video_url}">
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
                <button class="publish-video action-button hide" onClick="publishVideo(this)" title="Publish"><img src="../icons/publish.gif" class="icon" alt="publish_icon"></button>
                <button class="reject-video action-button" onClick="rejectVideo(this)" title="Reject"><img src="../icons/reject.gif" class="icon ${item.status == "Rejected" ? "hide" : ""}" alt="reject_icon"></button>
                <button class="edit-video action-button" onClick="editVideo(this)" title="Edit"><img src="../icons/edit.gif" class="icon" alt="edit_icon"></button>
                <button class="download-video action-button" onClick="downloadVideo(this)" title="Download"><img src="../icons/download.gif" class="icon" alt="download_icon"></button>
                <button class="delete-video action-button" onClick="deleteVideo(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                </div>
            </td>
        `;
        videosTableBody.insertBefore(row, videosTableBody.firstChild);
        
    });
}            



fetchModerationVideos()



async function deleteVideo(elem) {

        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/deleteModerationVideo', {
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


async function publishVideo(elem) {

         
        const row = elem.closest("tr");
        const rowId = row.dataset.id

        const formData = new FormData();
        const gifInput = row.querySelector(".gif-input");
            const file = gifInput.files[0]

            if (file !== null) {
                formData.append('gif', file);
            }else{
                showMessage('Choose a gif file')
                return
            }
            formData.append('id', rowId);
            const inputs = Array.from(row.querySelectorAll(".text-input"));
            inputs.forEach((input, idx) => {
                if (idx == 0) {
                    formData.append('title', input.value);
                }else{
                    formData.append('keywords', input.value);
                }
        });

        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/publishModerationVideo', {
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
            fetchModerationVideos()
            showMessage(data.message)
            



}


async function rejectVideo(elem) {

         
        const row = elem.closest("tr");
        const rowId = row.dataset.id
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/rejectModerationVideo', {
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


async function editVideo(elem){
    const row = elem.closest("tr");
    const rejectButton = row.querySelector('.reject-video')
    const editButton = row.querySelector('.edit-video')
    const deleteButton = row.querySelector('.delete-video')
    const publishButton = row.querySelector('.publish-video')
    const downloadButton = row.querySelector('.download-video')

    rejectButton.className = "hide"
    editButton.className = "hide"
    deleteButton.className = "hide"
    downloadButton.className = "hide"
    publishButton.classList.remove('hide')
    const cells = Array.from(row.querySelectorAll("td"));
            cells.slice(0, -4).forEach((cell, index) => {
                if (index === 0) {
                    const gifInput = document.createElement('input');
                    gifInput.type = 'file';
                    gifInput.style = "display: none;";
                    gifInput.className = 'gif-input';
                    cell.innerHTML = '';
                    cell.appendChild(gifInput);
                    
                    const gifInputButton = document.createElement('button');
                    gifInputButton.className = 'chooseGifButton';
                    gifInputButton.classList.add('choosePhotoButton')
                    gifInputButton.textContent = "Gif";
                    cell.appendChild(gifInputButton);
                    gifInputButton.addEventListener('click', function () {
                        gifInput.click();
                    });        
                }else{
                    const textInput = document.createElement('input');
                    textInput.type = 'text';
                    textInput.className = 'text-input input';
                    textInput.value = cell.textContent.trim();
                    cell.innerHTML = '';
                    cell.appendChild(textInput);
                }

            });

}

async function downloadVideo(elem) {
    const row = elem.closest('tr')
    const video = row.querySelector('td video')
    const videoUrl = video.dataset.video
    const match = videoUrl.match(/[^\\/]+$/);
    const token = localStorage.getItem("accessToken");
    const videoResponse = await fetch(`http://localhost:3030/api/v1/superadmin/downloadVideo/${match[0]}`, {
        method: 'GET',
        headers: { 
            "Authorization": `Bearer ${token}`
         },
    })
            const blob = await videoResponse.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${videoResponse}.mp4`;
            document.body.appendChild(link);
            link.click();
            link.remove();

}


function openVideoInPlayer(elem) {

        
    const videoplayerContainer = document.createElement('div');
    videoplayerContainer.classList.add('moderationVideoShowContainer')
    videoplayerContainer.classList.add('userPopup')
    videoplayerContainer.innerHTML = `
        <div class="v-player">
            <div id="pan-container">
                <video id="video" class="videoplayercontainer">
                    <source src="${elem.dataset.video}" type="video/mp4">
                </video>
                <div id="timeline" class="timeline"></div>
            </div> 
            <div class="btn-group" role="group">
                <div class="time">0</div>
                <button class="frameright controls-button">⏮</button>
                <button class="play controls-button">▶</button>
                <button class="stop controls-button hide">⏸</button>
                <button class="frameleft controls-button">⏭</button>
                <button class="speed1x">1x</button>
                <button class="fullScreen">FullScreen</button>
                <button class="loop">Loop</button>
                <input type="text" class="speed-input" placeholder="Input speed 0.1-5">
                <button class="close controls-button" onclick="closeModeVideoPlayer()">Close</button>
            </div>           
        </div> 
    `;
    document.body.appendChild(videoplayerContainer)

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    setupVideoControls();
}

function setupVideoControls() {
    const video = document.getElementById("video");
    const timeDisplay = document.querySelector(".time");
    const timeline = document.getElementById("timeline");
    
    let isLooping = false;

    document.querySelector(".play").addEventListener("click", () => {
        video.play();
        document.querySelector(".play").classList.add("hide");
        document.querySelector(".stop").classList.remove("hide");
    });

    document.querySelector(".stop").addEventListener("click", () => {
        video.pause();
        document.querySelector(".stop").classList.add("hide");
        document.querySelector(".play").classList.remove("hide");
    });

    document.querySelector(".frameright").addEventListener("click", () => {
        video.currentTime -= 1 / 30;
    });

    document.querySelector(".frameleft").addEventListener("click", () => {
        video.currentTime += 1 / 30;
    });

    document.querySelector(".loop").addEventListener("click", function () {
        isLooping = !isLooping;
        video.loop = isLooping;
        this.textContent = isLooping ? "Unloop" : "Loop";
    });

    document.querySelector(".speed1x").addEventListener("click", () => {
        video.playbackRate = 1;
        document.querySelector(".speed-input").value = "1";
    });

    document.querySelector(".speed-input").addEventListener("input", (event) => {
        let speed = parseFloat(event.target.value);
        if (speed >= 0.1 && speed <= 5) {
            video.playbackRate = speed;
        }
    });

    document.querySelector(".fullScreen").addEventListener("click", function () {
        const player = document.querySelector(".v-player");
        if (!document.fullscreenElement) {
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.mozRequestFullScreen) {
                player.mozRequestFullScreen();
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen();
            } else if (player.msRequestFullscreen) {
                player.msRequestFullscreen();
            }
            this.textContent = "Cancel FullScreen";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.textContent = "FullScreen";
        }
    });

    video.addEventListener("timeupdate", () => {
        if (timeline) {
            const progress = (video.currentTime / video.duration) * 100;
            timeline.style.width = `${progress}%`;
        }
        if (timeDisplay) {
            let frame = Math.floor(video.currentTime * 30);
            timeDisplay.textContent = `${frame}`;
        }
    });
    
    timeline.parentElement.addEventListener("click", (event) => {
        const rect = timeline.parentElement.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percent = offsetX / rect.width;
        video.currentTime = percent * video.duration;
    });
    
    let isDragging = false;
    let startX = 0;
    let startTime = 0;

    timeline.parentElement.addEventListener("mousedown", (event) => {
        isDragging = true;
        startX = event.clientX;
        startTime = video.currentTime; 
    });
            
    document.addEventListener("mousemove", (event) => {
        if (isDragging) {

            const rect = timeline.parentElement.getBoundingClientRect();
            const offsetX = event.clientX - startX;
            const percent = Math.min(Math.max((offsetX / rect.width) + (startTime / video.duration), 0), 1);
            timeline.style.width = `${percent * 100}%`;
        }
    });
            
    document.addEventListener("mouseup", () => {
        if (isDragging) {

            const rect = timeline.parentElement.getBoundingClientRect();
            const offsetX = event.clientX - startX;
            const percent = Math.min(Math.max((offsetX / rect.width) + (startTime / video.duration), 0), 1);
            video.currentTime = percent * video.duration;
            isDragging = false;
        }
    });
    
    let lastMoveTime = 0;
    const debounceDelay = 20;
    
    document.addEventListener("mousemove", (event) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastMoveTime >= debounceDelay) {
            if (isDragging) seek(event);
            lastMoveTime = currentTime;
        }
    });
    
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
    
    function seek(event) {
        const rect = timeline.parentElement.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;

        const percent = Math.min(Math.max(offsetX / rect.width, 0), 1);
        video.currentTime = percent * video.duration;
    }

    document.addEventListener("keydown", (event) => {

        if (event.code === "Space") {
            event.preventDefault(); 
    

            if (video.paused) {
                video.play();
                document.querySelector(".play").classList.add("hide");
                document.querySelector(".stop").classList.remove("hide");
            } else {
                video.pause();
                document.querySelector(".stop").classList.add("hide");
                document.querySelector(".play").classList.remove("hide");
            }
        }
    

        if (event.code === "ArrowLeft") {
            video.currentTime -= 1 / 30; 
        }

        if (event.code === "ArrowRight") {
            video.currentTime += 1 / 30; 
        }
    });
}


function closeModeVideoPlayer(){
    const moderationVideoShowContainer = document.querySelector('.moderationVideoShowContainer')
    moderationVideoShowContainer.remove()
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