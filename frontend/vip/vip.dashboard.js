

let page = 0;
const limit = 16;
let isLoading = false;

async function fetchVideos() {
    if (isLoading) return;
    isLoading = true;

    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:3030/api/v1/vip/getVideos?page=${page}&limit=${limit}`, {
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
            populateViseosContainer(data);
            page++;
        }
    } catch (error) {
        console.error('Error uploading video', error);
    } finally {
        isLoading = false;
    }
}



function populateViseosContainer(data){
    const videoContainer = document.querySelector('.video-container')
    const videosDiv = document.createElement("div")
    videosDiv.classList.add("videos-div")
    data.forEach(item => {
        videosDiv.innerHTML += `
                
                <div class="videoDiv">
                    <h3><b>${item.title}</b></h3>
                    <img src="${item.gif_url}" class="video" data-id="${item.id}" data-video="${item.video_url}" data-favorite="${item.wish}" onclick="openVideoInPlayer(this)">
                    <span>${item.keywords}</span>
                </div>
                
            `;
            videoContainer.appendChild(videosDiv);
    
    });
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
        fetchVideos();
    }
});

fetchVideos()




  const searchInput  = document.querySelector('.serachText');
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getVideosBySearch()
    }
  });
async function getVideosBySearch() {
    
    try {
        const searchValue = searchInput.value.trim();
        
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:3030/api/v1/users/getVideosBySearch?searchValue=${encodeURIComponent(searchValue)}`, {
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
        const videoContainer = document.querySelector('.video-container')
        videoContainer.innerHTML = "";
        populateVideosDiv(data)

        
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

    function populateVideosDiv(data) {
        const videoContainer = document.querySelector('.video-container')
        videoContainer.innerHTML=`<div class="videoplayer-container"></div>`;
        const videosDiv = document.createElement("div")
        videosDiv.classList.add("videos-div")
        data.forEach(item => {

            videosDiv.innerHTML += `
                    
                    <div class="videoDiv">
                    <h3><b>${item.title}</b></h3>
                    <img src="${item.gif_url}" class="video" data-id="${item.id}" data-video="${item.video_url}" data-favorite="${item.wish}" onclick="openVideoInPlayer(this)">
                    <span>${item.keywords}</span>
                    </div>
                    
                `;
                videoContainer.appendChild(videosDiv);
        
        });

    }

    function openVideoInPlayer(data) {
        
        const videoplayerContainer = document.querySelector('.videoplayer-container');
        
        let favoriteData
        if (data.dataset.favorite !== "undefined") {
            favoriteData = JSON.parse(data.dataset.favorite)
        }
        
        videoplayerContainer.innerHTML = `
            <div class="v-player">
                <div id="pan-container">
                    <video id="video" data-id="${data.dataset.id}" class="videoplayercontainer">
                        <source src="${data.dataset.video}" type="video/mp4">
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
                    <img src="../icons/add.png" onClick="addToWishlist(this)" alt="" class="heartIcons addToWishlist ${favoriteData ? 'hide' : ''}" title="Add to Wishlist" data-id="${data.dataset.id}">
                    <img src="../icons/remove.png" onClick="removeFromWishlist(this)" alt="" class="heartIcons removeFromWishlist  ${!favoriteData ? 'hide' : ''}" title="Remove from Wishlist" data-id="${data.dataset.id}">
                </div>           
            </div> 
        `;

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

  
    async function addToWishlist(elem) {
        
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/vip/addVideoToWishlist", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                 },
                 body: JSON.stringify({ id: elem.dataset.id })
            });
            if(response.status == 401){
                localStorage.removeItem("accessToken")
             
                window.open("../dashboard.html");
              }
            const data = await response.json()
            elem.classList.add('hide')
            const removeButton = document.querySelector('.removeFromWishlist')
            removeButton.classList.remove('hide')
            showMessage(data.message)

    
        } catch (error) {
            console.error("Failed to add video to the favorites list", error);
        }
    }
    async function removeFromWishlist(elem) {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/vip/removeVideoFromWishlist", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                 },
                 body: JSON.stringify({ id: elem.dataset.id  })
            });
            if(response.status == 401){
                localStorage.removeItem("accessToken")
             
                window.open("../dashboard.html");
              }
            const data = await response.json()
            elem.classList.add('hide')
            const addButton = document.querySelector('.addToWishlist')
            addButton.classList.remove('hide')
            showMessage(data.message)
    
        } catch (error) {
            console.error("Failed to remove video from the favorites list", error);
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
