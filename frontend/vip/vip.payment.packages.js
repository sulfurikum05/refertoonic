async function fetchpaymentPackagesData(){
    
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/users/getPaymentPackages", {
            method: 'GET',
            headers: {"Authorization": `Bearer ${token}`},
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
        const ppData = await response.json();
        const ppSecondDiv = document.querySelector('.ppSecondDiv')
        ppData.sort((a, b) => a.id - b.id);
        ppData.forEach(item => {
            let upgradeButton = ''
            if (item.title == "Vip") {
                upgradeButton = "upgradeToVip"
            }
            if (item.title == "Enterprise") {
                upgradeButton = "upgradeToEnterprise"
            }
            const package = document.createElement("div")
            package.classList.add("payment-package")
            const status = item.status;
            delete item.status;
            const text = item.text;
            const parts = text.split(',');
            const [One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen] = parts;
            package.innerHTML = `
                <h2 class="${item.color}" >${item.title}</h2>
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
                    <button class="${status} ${upgradeButton} currentUpgradeButton" data-package="${item.title}" onClick="upgradeOrExtend(this)">${status}</button>
            `;

                ppSecondDiv.appendChild(package);
        })

    } catch (error) {
        console.error("Не удалось получить данные:", error);
    }
    
}

fetchpaymentPackagesData()

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

async function upgradeOrExtend(elem) {
    if (elem.classList.contains("Upgrade")) {
        elem.disabled = true;
        const loader = document.createElement('span');
        loader.className = 'loader';
        elem.appendChild(loader);
        setTimeout(() => {
            elem.disabled = false;
            loader.remove();
        }, 3000);
        let period = ""
    const toggleButtons = document.querySelectorAll('.toggle-btn')
    toggleButtons.forEach((toggleButton)=>{
        if (!toggleButton.classList.contains('hide') && toggleButton.classList.contains('monthly')) {
            period = "yearly"
            
        }if (!toggleButton.classList.contains('hide') && toggleButton.classList.contains('yearly')) {
            period = "monthly"
        }
    })
    const package = elem.dataset.package.toLowerCase()
    const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/vip/upgrade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({packageForUpgrade: package, period: period})
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
        const paymentUrl = await response.json()
        window.open(paymentUrl, '_blank');
    }
    if (elem.classList.contains("Extend")) {
        elem.disabled = true;
        const loader = document.createElement('span');
        loader.className = 'loader';
        elem.appendChild(loader);
        setTimeout(() => {
            elem.disabled = false;
            loader.remove();
        }, 3000);

        let period = ""
    const toggleButtons = document.querySelectorAll('.toggle-btn')
    toggleButtons.forEach((toggleButton)=>{
        if (!toggleButton.classList.contains('hide') && toggleButton.classList.contains('monthly')) {
            period = "yearly"
            
        }if (!toggleButton.classList.contains('hide') && toggleButton.classList.contains('yearly')) {
            period = "monthly"
        }
    })
    const package = elem.dataset.package.toLowerCase()
    const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/vip/extend", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({packageForUpgrade: package, period: period})
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
        const paymentUrl = await response.json()
        window.open(paymentUrl, '_blank');
    }
}

    
    


    
    