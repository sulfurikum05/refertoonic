
    const videosTableBody = document.querySelector(".videos-table tbody");
    const textsTableBody = document.querySelector(".texts-table tbody");
    const teamTbleBody = document.querySelector(".team-table tbody");
    const paymentPackagesTableBody = document.querySelector(".payment-packages-table tbody");

    async function getSliderVideosData() {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/superadmin/getSliderVideosData", {
                method: 'GET',
                headers: { 
                    "Authorization": `Bearer ${token}`
                 }
            });
            if(response.status == 401){
                localStorage.removeItem("accessToken")
             
                window.open("../dashboard.html");
            }
            const data = await response.json();

            populateSliderVideosTable(data)
        } catch (error) {
            console.error("Failed to retrieve data", error);
        }
    }
    async function getDashboardTextsData() {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/superadmin/getDashboardTextsData", {
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
            populateDashboardTextsTable(data)
        } catch (error) {
            console.error("Failed to retrieve data", error);
        }
    }
    async function getTeamData() {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/superadmin/getTeamData", {
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
            populateTeamTable(data)
        } catch (error) {
            console.error("Failed to retrieve data", error);
        }
    }
    async function getPaymentPackagesData() {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:3030/api/v1/superadmin/getPaymentPackagesData", {
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
             
            populatePaymentPackagesTable(data)
        } catch (error) {
            console.error("Failed to retrieve data", error);
        }
    }



   
    function populateSliderVideosTable(data) {
        videosTableBody.innerHTML = ""; 
        data.forEach(item => {
            const row = document.createElement("tr");
            row.dataset.id = `${item.id}`
            row.innerHTML = `

                <td>
                    <video class="slider-video-superadmin">
                    <source src="${item.video}" type="video/mp4">
                    </video>
                </td>
                <td>
                    <div class="actions_col">
                        <button class="delete-video action-button" onClick="deleteSliderVideo(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                    </div>
                </td>
            `;
            videosTableBody.insertBefore(row, videosTableBody.firstChild);
            
        });
    }
    function populateDashboardTextsTable(data) {
        textsTableBody.innerHTML = ""; 
        data.forEach(item => {
            const row = document.createElement("tr");
            row.dataset.id  = `${item.id}`
            row.innerHTML = `
                <td>${item.header}</td>
                <td>${item.title}</td>
                <td>${item.text}</td>
                <td>
                    <div class="actions_col">
                        <button class="edit-text action-button" onClick="editTextFunction(this)" title="Edit"><img src="../icons/edit.gif" class="icon" alt="edit_icon"></button>
                        <button class="save-text action-button hide" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>

                    </div>
                </td>
            `;
            textsTableBody.insertBefore(row, textsTableBody.firstChild);
            
        });
    }
    function populateTeamTable(data) {
        teamTbleBody.innerHTML = ""; 
        data.forEach(item => {
            const row = document.createElement("tr");
            row.dataset.id  = `${item.id}`
            row.innerHTML = `
                <td><img src="${item.photo}" alt="" class="team-photos-superadmin"></td>
                <td>${item.role}</td>
                <td>${item.name}</td>
                <td>${item.fb_link}</td>
                <td>${item.in_link}</td>
                <td>${item.wa_link}</td>
                <td>${item.tg_link}</td>
                <td>
                    <div class="actions_col">
                        <button class="edit-team action-button" onClick="editTeamfunction(this)" title="Edit"><img src="../icons/edit.gif" class="icon" alt="edit_icon"></button>
                        <button class="save-team action-button hide" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
                    </div>
                </td>
            `;
            teamTbleBody.insertBefore(row, teamTbleBody.firstChild);
            
        });
    }
    function populatePaymentPackagesTable(data) {
        paymentPackagesTableBody.innerHTML = ""; 
        data.forEach(item => {
            const row = document.createElement("tr");
            row.dataset.id  = `${item.id}`
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.text}</td>
                <td>
                    <div class="actions_col">
                        <button class="edit-payment-package action-button" onClick="editPpFunction(this)" title="Edit"><img src="../icons/edit.gif" class="icon" alt="edit_icon"></button>
                        <button class="delete-payment-package action-button" onClick="deletePpFunction(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                        <button class="save-payment-package action-button hide" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>

                    </div>
                </td>
            `;
            paymentPackagesTableBody.insertBefore(row, paymentPackagesTableBody.firstChild);
            
        });
    }

    getSliderVideosData();
    getDashboardTextsData();
    getTeamData();
    getPaymentPackagesData();


    document.querySelector('.videos-create-button').addEventListener('click', function () {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="video-name-cell"></td>
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
            const file = videoInput.files[0];
    
            if (!file) {
                alert('Please select a video before saving');
                return;
            }
    
            const formData = new FormData();
            formData.append('video', file);

             const token = localStorage.getItem("accessToken");
                        const response = await fetch('http://localhost:3030/api/v1/superadmin/uploadSliderVideo', {
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

                                getSliderVideosData()
                                showMessage(data.message)


                    });
        
                });

async function deleteSliderVideo(elem) {

        const row = elem.closest("tr");
        const rowId = row.dataset.id

         const token = localStorage.getItem("accessToken");
         const response = await fetch('http://localhost:3030/api/v1/superadmin/deleteSliderVideo', {
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

                getSliderVideosData()
                showMessage(data.message)



}


function editTextFunction(elem) {
            const row = elem.closest("tr"); 
            const cells = Array.from(row.querySelectorAll("td"));
            const rowId = row.dataset.id
            cells.slice(0, -1).forEach(cell => {
                const cellText = cell.textContent.trim();
                const cellId = cell.dataset.id || null; 
                cell.innerHTML = `<input type="text" value="${cellText}" class="input" data-id="${cellId}">`;
            });
            const saveButton = row.querySelector(".save-text");
            elem.classList.add("hide");
            saveButton.classList.remove("hide");
            document.querySelectorAll(".edit-text").forEach(elem => {
               if(!elem.classList.contains('hide')) {
                
                elem.style.pointerEvents="none";
               } else {
                elem.style.pointerEvents="all"
               }
            })
            saveButton.addEventListener("click", async function () {
                const inputs = Array.from(row.querySelectorAll(".input"));
                const updatedData = inputs.map(input => {
                    return {text: input.value.trim()}
                    
                });

                 const token = localStorage.getItem("accessToken");
                 const response = await fetch('http://localhost:3030/api/v1/superadmin/updateText', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ updatedData: updatedData, id: rowId })
                })
                if(response.status == 401){
                    localStorage.removeItem("accessToken")
                 
                    window.open("../dashboard.html");
                }
                const data = await response.json()



                    elem.classList.remove("hide");
                    saveButton.classList.add("hide");
                    getDashboardTextsData();
                    showMessage(data.message)

            }, { once: true });
}


function editTeamfunction(elem) {
        const row = elem.closest('tr');
        const saveButton = row.querySelector(".save-team");
        elem.classList.add("hide");
        saveButton.classList.remove("hide");
        document.querySelectorAll(".edit-team").forEach(button => {
            if (!button.classList.contains('hide')) {
                button.style.pointerEvents = "none";
            } else {
                button.style.pointerEvents = "all";
            }
        });
        
        Array.from(row.cells).forEach((cell, index) => {
            if (index === row.cells.length - 1) return;
            if (index === 0) {
                const photoInput = document.createElement('input');
                photoInput.type = 'file';
                photoInput.style = "display: none;";
                photoInput.className = 'photo-input';
                cell.innerHTML = '';
                cell.appendChild(photoInput);
                
                const photoInputButton = document.createElement('button');
                photoInputButton.className = 'choosePhotoButton';
                photoInputButton.textContent = "Photo";
                cell.appendChild(photoInputButton);
        
                photoInputButton.addEventListener('click', function () {
                    photoInput.click();
                });
            } else {
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.className = 'text-input input';
                textInput.value = cell.textContent.trim();
                cell.innerHTML = '';
                cell.appendChild(textInput);
            }
        });

        saveButton.addEventListener('click', async function () {
            const formData = new FormData();
            const photoInput = row.querySelector(".photo-input");
                const file = photoInput.files[0] || null;
                if (file !== null) {
                    formData.append('photo', file);
                }
                formData.append('id', row.dataset.id);
            const inputs = Array.from(row.querySelectorAll(".text-input"));
            inputs.forEach((input, idx) => {
                formData.append(`field_${idx}`, input.value);
            });

             const token = localStorage.getItem("accessToken");
             const response = await fetch('http://localhost:3030/api/v1/superadmin/updateTeam', {
                method: 'POST',
                headers: { 
                    "Authorization": `Bearer ${token}`
                 },
                body: formData,
            })
            if(response.status == 401){
                localStorage.removeItem("accessToken")
             
                window.open("../dashboard.html");
            }
            const data = await response.json()
                        saveButton.classList.add("hide");
                        elem.classList.remove("hide");
                        document.querySelectorAll(".edit-team").forEach(button => {
                        button.style.pointerEvents = "all";
                })
                getTeamData();
                showMessage(data.message)


        }, { once: true });

}

document.querySelector('.payment-packages-create-button').addEventListener('click', function () {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" class="input"></td>
        <td><input type="text" class="input"></td>
        <td><input type="text" class="input"></td>
         <td>
                <div class="actions_col">
                    <button class="save-payment-package action-button" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
                </div>
            </td> 
    `;
    paymentPackagesTableBody.insertBefore(newRow, paymentPackagesTableBody.firstChild);
    
                newRow.querySelector('.save-payment-package').addEventListener('click', async function () {
                        const inputs = Array.from(newRow.querySelectorAll(".input"));
                        const newData = inputs.map(input => {
                            return {element: input.value} 
                            
                        });
       
                         const token = localStorage.getItem("accessToken");
                         const response = await fetch('http://localhost:3030/api/v1/superadmin/createPaymentPackage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        },

                        body: JSON.stringify({newData: newData})
                    })
                    if(response.status == 401){
                        localStorage.removeItem("accessToken")
                     
                        window.open("../dashboard.html");
                    }
                    const data = await response.json()
                            getPaymentPackagesData()
                            showMessage(data.message)

                });
    
            });

function editPpFunction(elem) {
            const row = elem.closest("tr"); 
            const cells = Array.from(row.querySelectorAll("td"));
            const rowId = row.dataset.id
            cells.slice(0, -1).forEach(cell => {
                const cellText = cell.textContent.trim();
                cell.innerHTML = `<input type="text" value="${cellText}" class="input">`; 
            });
            const saveButton = row.querySelector(".save-payment-package");
            const deleteButton = row.querySelector(".delete-payment-package");
            elem.classList.add("hide");
            deleteButton.classList.add("hide"); 
            saveButton.classList.remove("hide"); 
            document.querySelectorAll(".edit-payment-package").forEach(elem => {
               if(!elem.classList.contains('hide')) {
                
                elem.style.pointerEvents="none";
               } else {
                elem.style.pointerEvents="all"
               }
            })
            saveButton.addEventListener("click", async function () {
                const inputs = Array.from(row.querySelectorAll(".input"));
                const updatedData = inputs.map(input => {
                    return {text: input.value.trim()}
                });

                 const token = localStorage.getItem("accessToken");
                 const response = await fetch('http://localhost:3030/api/v1/superadmin/updatePaymentPackage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ updatedData: updatedData, id: rowId })
                })
                if(response.status == 401){
                    localStorage.removeItem("accessToken")
                 
                    window.open("../dashboard.html");
                }
                const data = await response.json()
                    elem.classList.remove("hide");
                    saveButton.classList.add("hide");
                    deleteButton.classList.add("hide");
                    getPaymentPackagesData();
                    showMessage(data.message)
            }, { once: true });
}

async function deletePpFunction(elem) {
        const row = elem.closest("tr");
        const rowId = row.dataset.id

         const token = localStorage.getItem("accessToken");
         const response = await fetch('http://localhost:3030/api/v1/superadmin/deletePaymentPackage', {
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

                getPaymentPackagesData()
                showMessage(data.message)


}
//DELETE PP END//


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

