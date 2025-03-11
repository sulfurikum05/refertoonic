
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

async function fetchVideos() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/users/getVideos", {
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
            const shuffledData = shuffleArray(data);
            populateViseosContainer(shuffledData)

    } catch (error) {
        console.error("Не удалось получить данные:", error);
    }
}

fetchVideos()

function populateViseosContainer(shuffledData){
    const videoContainer = document.querySelector('.video-container')
    const videosDiv = document.createElement("div")
    videosDiv.classList.add("videos-div")
    shuffledData.forEach(item => {
        videosDiv.innerHTML += `
                
                <div class="videoDiv">
                    <h3><b>${item.title}</b></h3>
                    <img src="${item.gif_url}" class="video" data-video="${item.video_url}" onclick="openVideoInPlayer(this)">
                    <span>${item.keywords}</span>
                </div>
                
            `;
            videoContainer.appendChild(videosDiv);
    
    });
}


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
        console.error("Не удалось получить данные:", error);
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
                    <img src="${item.gif_url}" class="video" data-video="${item.video_url}" onclick="openVideoInPlayer(this)">
                    <span>${item.keywords}</span>
                    </div>
                    
                `;
                videoContainer.appendChild(videosDiv);
        
        });
       

    }

    function openVideoInPlayer(data) {
        const videoplayerContainer = document.querySelector('.videoplayer-container');
        videoplayerContainer.innerHTML = `
            <div class="v-player">
                <div id="pan-container">
                    <video id="video" class="videoplayercontainer">
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
                </div>           
            </div> 
        `;
        window.scrollTo({
            top: 0, // Устанавливаем прокрутку на верх страницы
            behavior: "smooth" // Добавляем плавную прокрутку
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
        
        timeline.parentElement.addEventListener("mousedown", (event) => {
            isDragging = true;
            seek(event);
        });
        
        document.addEventListener("mousemove", (event) => {
            if (isDragging) seek(event);
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
            // Для пробела
            if (event.code === "Enter") {
                event.preventDefault(); // Предотвращаем стандартное поведение (прокрутку)
        
        
                // Пауза/Воспроизведение видео
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
        
            // Стрелка влево
            if (event.code === "ArrowLeft") {
                video.currentTime -= 1 / 30; // Перемещение на 1 кадр назад
            }
        
            // Стрелка вправо
            if (event.code === "ArrowRight") {
                video.currentTime += 1 / 30; // Перемещение на 1 кадр вперед
            }
        });
    }

