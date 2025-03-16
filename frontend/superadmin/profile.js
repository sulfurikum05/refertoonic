const profileFirstDiv = document.querySelector('.profileFirstDiv')
const profileSecondDiv = document.querySelector('.profileSecondDiv')

async function fetchProfileData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/superadmin/getUserPersonalInfo", {
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
        
        populateUserPersonalInfo(data)
    } catch (error) {
        console.error("Не удалось получить данные:", error);
    }
}
fetchProfileData()

function populateUserPersonalInfo(data) {
        const userRole = data[0].role
        profileFirstDiv.innerHTML = ""; 
        const picture = document.createElement("div");
        picture.classList.add('picture')
        picture.innerHTML = `
        <h1>${userRole}</h1>
           <img src="${data[0].picture}" alt="profilePicture">
        `;
        profileFirstDiv.appendChild(picture);

        const personalInfo = document.createElement("div");
        personalInfo.classList.add('personalInfo')
        personalInfo.innerHTML = `
                    <h1>${data[0].name} ${data[0].surname}</h1>
                    <span class="phone"><b>Phone:</b> ${data[0].phone}</span>
                    <span class="address"><b>Address:</b> ${data[0].address}</span>
                    <span class="email"><b>Email:</b> ${data[0].email}</span>
                    <span class="website"><b>Website:</b> <a href="${data[0].website}">${data[0].website}</a></span>
                    <span class="birthday"><b>Birthday:</b> ${data[0].birthday}</span>
                    <span class="gender"><b>Gender:</b> ${data[0].gender}</span>
                    <button class="changePasswordButton" onClick="changePassword()">Change password</button>
                    <button class="changeInfoButton" onClick="changeInfo()">Change information</button>
     `;
        profileFirstDiv.appendChild(personalInfo);
        

        profileSecondDiv.innerHTML = "";
        const aboutText = document.createElement("div");
        aboutText.classList.add('aboutText')

        aboutText.innerHTML = `
        <h3>Tell us about yourself</h3>
        <span class="about-text">${data[0].about}</span>
        `;

        profileSecondDiv.appendChild(aboutText);
        

}



function changeInfo() {

        profileFirstDiv.innerHTML = ""; 
        profileSecondDiv.innerHTML = `
        <h3>Tell us about yourself</h3>
        <input name="about" type="text" class="input profileInput" placeholder="Tell us about yourself"> 
        
        `; 
    
    
        const pictureDiv = document.createElement('div')
        const personalInfoDiv = document.createElement('div')
        pictureDiv.classList.add('picture')
        personalInfoDiv.classList.add('personalInfo')
    
        
        pictureDiv.innerHTML = `
            <div class="custom-file-input">
                <label for="file-upload" class="custom-label">Select an avatar</label>
                <input id="file-upload" type="file" class="input profileInputFile">
                <span id="file-name" class="file-name">File not selected</span>
            </div>
        `;
        profileFirstDiv.appendChild(pictureDiv)

        const fileInput = document.getElementById("file-upload");
        const fileNameDisplay = document.getElementById("file-name");

        fileInput.addEventListener("change", () => {
        const fileName = fileInput.files[0]?.name || "File not selected";
        fileNameDisplay.textContent = fileName;
});


        personalInfoDiv.innerHTML = `
            <input name="name" type="text" class="input profileInput" placeholder="Enter your name"> 
            <input name="surname" type="text" class="input profileInput" placeholder="Enter your surname">
            <input name="phone" type="text" class="input profileInput" placeholder="Enter your phone">
            <input name="address" type="text" class="input profileInput" placeholder="Enter your address">    
            <input name="website" type="text" class="input profileInput" placeholder="Enter your website">
            <input name="birthday" type="date" class="input profileInput">
            <span>
                <select name="gender"class="input profileInput">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </span>
            <button class="saveInfoButton">Save</button>
    
        `;
        profileFirstDiv.appendChild(personalInfoDiv)

        document.querySelector('.saveInfoButton').addEventListener('click', async () => {
            const inputs = document.querySelectorAll('.profileInput');
            const fileInput = document.querySelector('#file-upload');
            const formData = new FormData();
        
            // Собираем значения всех текстовых, селектов и даты
            inputs.forEach(input => {
                const value = input.value.trim();
                if (value) {
                    // Для select используем name или placeholder для ключа
                    const key = input.name;
                    formData.append(key, value);
                }
            });
        
            // Добавляем файл, если он выбран
            if (fileInput.files.length > 0) {
                formData.append('photo', fileInput.files[0]);
            }

            

            try {

                 const token = localStorage.getItem("accessToken");
                const response = await fetch('http://localhost:3030/api/v1/users/saveProfileData', {
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
                const data = await response.json();
                    fetchProfileData()
                    showMessage(data.message)
                

            } catch (error) {
                console.error('Error sending data:', error);
            }
        });
        

}


function changePassword() {
    const changePasswordButton = document.querySelector('.changePasswordButton')
    const changeInfoButton = document.querySelector('.changeInfoButton')
    changeInfoButton.classList.add('hide')
    changePasswordButton.classList.add('hide')
    const personalInfoDiv = document.querySelector('.personalInfo')
    personalInfoDiv.innerHTML += `
    <input name="oldPassword" id="oldPassword" type="password" class="input profileInput" placeholder="Old password">
    <input name="newPassword" id="newPassword" type="password" class="input profileInput" placeholder="New password">
    <input name="newPasswordConfirm" id="newPasswordConfirm" type="password" class="input profileInput" placeholder="Confirm new password">
    <button class="setNewPasswordButton" onClick="setNewPassword()">Save</button>
    `;
    
}

 async function setNewPassword() {
    const oldPassword = document.getElementById('oldPassword')
    const newPassword = document.getElementById('newPassword')
    const newPasswordConfirm = document.getElementById('newPasswordConfirm')
    const body = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        newPasswordConfirm: newPasswordConfirm.value,
    }
    


    try {

         const token = localStorage.getItem("accessToken");
         const response = await fetch('http://localhost:3030/api/v1/users/changePassword', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })                
        if(response.status == 401){
localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
        }
        const data = await response.json();
        
            fetchProfileData()
            showMessage(data.message)

    } catch (error) {
        console.error('Error sending data:', error);
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