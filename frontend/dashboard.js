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




const paymentPackagesDiv = document.querySelector(".payment-packages")
const dashboardMainText = document.querySelector(".main-text")
const pricingHeader = document.querySelector(".pricing-header")
const demoSection = document.querySelector(".demo-section")
const teamSection = document.querySelector(".team-section")
const demoContent = document.createElement("div")
demoContent.classList.add("demo-content")
const videoContainer = document.querySelector(".video-container1")


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }
  



async function fetchDashboard() {
    try {
        const response = await fetch("http://localhost:3030/api/v1/users/getDashboard", {
            method: 'GET',
        });
        const data = await response.json();
        const {texts,packages, team, video} = data
        populateDashboard(texts, packages, team, video)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

fetchDashboard()

function populateDashboard(texts, packages, team, video){

    texts.forEach(elem => {
        if (elem.id == 1) {
            dashboardMainText.innerHTML += `
            <h2>REFERTOONIC</h2>
            <p><b><h3>${elem.text}</h3></b></p>
        `;
        }
        if (elem.id == 2) {
            pricingHeader.innerHTML = `
            <h1>${elem.header}</h1>
            <div class="billing-toggle">
                <button class="toggle-btn monthly hide" onclick="monthlyToggleButtonFunction()">Monthly: Save 0%</span></button>
                <button class="toggle-btn yearly" onclick="yearlyToggleButtonFunction()">Yearly: Save 20%</span></button>
            </div>
            `;
        }
        if (elem.id == 3) {

            demoSection.innerHTML = `
                <div>
                    <h2>${elem.header}</h2>
                </div>
            `;

            demoContent.innerHTML += `
                <div>
                    <h3>${elem.title}</h3>
                    <p>${elem.text}</p>
                </div>
            `;
        }
        if (elem.id == 4) {
            demoContent.innerHTML += `
            <div>
                <h3>${elem.title}</h3>
                <p>${elem.text}</p>
            </div>
        `;
        }
        if (elem.id == 5) {
            demoContent.innerHTML += `
            <div>
                <h3>${elem.title}</h3>
                <p>${elem.text}</p>
            </div>
            
        `;
        }
        
        demoSection.appendChild(demoContent)
        
    })
    
    packages.sort((a, b) => a.id - b.id);
    packages.forEach(item => {
        const package = document.createElement("div")
        package.classList.add("payment-package")
        const text = item.text;
        const parts = text.split(',');
        
            const [One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen] = parts;
    
            package.innerHTML = `
                    <h2>${item.title}</h2>
                    <p class="price">${item.price}$ / month</p>
                    <div class="plan featured">
                        <ul>
                            <li>${One}</li>
                            <li>${Two}</li>
                            <li>${Three}</li>
                            <li>${Four}</li>
                            <li>${Five}</li>
                            <li>${Six}</li>
                            <li>${Seven}</li>
                            <li>${Eight}</li>
                            <li>${Nine}</li>
                            <li>${Ten}</li>
                            <li>${Eleven}</li>
                            <li>${Twelve}</li>
                            <li>${Thirteen}</li>
                            <li>${Fourteen}</li>
                            <li>${Fifteen}</li>
                            <li>${Sixteen}</li>
                        </ul>
                        
                    </div>
            `;
            paymentPackagesDiv.appendChild(package);
    
    });

    team.forEach(elem => {
        teamSection.innerHTML += `
        <div class="team_container">
                    <img class="team-photo" src="${elem.photo}" alt="">
                    <div class="team-entry">
                        <p>${elem.role}</p>
                        <h2>${elem.name}</h2>
                        <div class="team-social">
                            <ul>
                                <li><a href="${elem.fb_link}" target="blanc"><img src="icons/fb.png" alt=""></a></li>
                                <li><a href="${elem.in_link}" target="blanc"><img src="icons/in.png" alt=""></a></li>
                                <li><a href="${elem.wa_link}" target="blanc"><img src="icons/wa.png" alt=""></a></li>
                                <li><a href="${elem.tg_link}" target="blanc"><img src="icons/tg.png" alt=""></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
        `;
        
    })

    video.forEach(elem => {
        videoContainer.innerHTML += `
            <video class="slider-video" autoplay muted loop>
                <source src="${elem.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    })
}

   




function monthlyToggleButtonFunction(){
    const monthlyButton = document.querySelector(".monthly")
    const yearlyButton = document.querySelector(".yearly")
    const paymentPackagesPrices = document.querySelectorAll(".price")
    paymentPackagesPrices.forEach(elem => {
    const price = elem.textContent.split("$")[0].trim();
    const notFixedPrice = Number(price) / 12 * 1.25
    const fixedPrice = notFixedPrice.toFixed(0)
    elem.textContent = `${fixedPrice}$ / month`
    });
    monthlyButton.classList.remove('show')
    monthlyButton.classList.add('hide')
    yearlyButton.classList.remove('hide')
    yearlyButton.classList.add('show')


}

function yearlyToggleButtonFunction(){
    const monthlyButton = document.querySelector(".monthly")
    const yearlyButton = document.querySelector(".yearly")
    const paymentPackagesPrices = document.querySelectorAll(".price")
    paymentPackagesPrices.forEach(elem => {
    const price = elem.textContent.split("$")[0].trim();
    const notFixedPrice = Number(price) * 12 * 0.8
    const fixedPrice = notFixedPrice.toFixed(0)
    elem.textContent = `${fixedPrice}$ / year` 
    });
    yearlyButton.classList.remove('show')
    yearlyButton.classList.add('hide')
    monthlyButton.classList.remove('hide')
    monthlyButton.classList.add('show')
}

    async function sendUnauthMessage(elem) {
        try {
            elem.disabled = true;
            const loader = document.createElement('span');
            loader.className = 'loader';
            elem.textContent = ""
            elem.appendChild(loader);

            const email = document.getElementById("email").value
            const name = document.getElementById("name").value
            const text = document.getElementById("message").value
            

            const response = await fetch("http://localhost:3030/api/v1/users/sendUnauthMessage", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, name, text})
            })
                const data = await response.json()
                if (!data.success) {
                    showMessage(data.errors)
                } else {
                    showMessage(data.message)
                }
                elem.disabled = false;
                loader.remove();
                elem.textContent = "Send"
                email.value = ""
                name.value = ""
                text.value = ""
        } catch (error) {
            console.error("Failed to retrieve data", error);
        }
    }




