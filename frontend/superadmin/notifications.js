const notificationsTableBody = document.querySelector('.notifications-table tbody')
async function fetchNotificatoinsData() {
    try {

         const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/superadmin/getNotificationsData", {
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
        
        populateNotificatoinsTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

fetchNotificatoinsData()


function populateNotificatoinsTable(data) {
    

    notificationsTableBody.innerHTML = ""; 
    data.forEach(item => {
        const date = new Date(item.send_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

        const row = document.createElement("tr");
        row.dataset.id = `${item.id}`
        row.innerHTML = `
            <td>
                <div class="recieversDiv">User: ${item.reciever_user}</div>
                <div class="recieversDiv">Vip: ${item.reciever_vip}</div>
                <div class="recieversDiv">Admin: ${item.reciever_admin}</div>
            </td>
            <td>${item.title}</td>
            <td>${item.text}</td>
            <td>${formattedDate}</td>
            <td>
                <div class="actions_col">
                    <button class="delete-notification action-button" onClick="deleteNotification(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                </div>
            </td>
        `;
        notificationsTableBody.insertBefore(row, notificationsTableBody.firstChild);
        
    });
}



document.querySelector('.notifications-create-button').addEventListener('click', function () {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <div class="checkboxDiv"><input type="checkbox" class="recieversCheckbox">Users</div>
            <div class="checkboxDiv"><input type="checkbox" class="recieversCheckbox">Vips</div>
            <div class="checkboxDiv"><input type="checkbox" class="recieversCheckbox">Admins</div>
        </td>
        <td><input type="text" class="input" placeholder="Title"></td>
        <td><textarea type="text" class="input" placeholder="Message"></textarea></td>
        <td></td>
         <td>
                <div class="actions_col">
                    <button class="send-notification action-button" title="Send"><img src="../icons/send.gif" class="icon" alt="send_icon"></button>
                </div>
            </td> 
    `;
    notificationsTableBody.insertBefore(newRow, notificationsTableBody.firstChild);
    newRow.querySelector('.send-notification').addEventListener('click', async function () {
        const checkboxes = Array.from(newRow.querySelectorAll(".recieversCheckbox"));
        const inputs = Array.from(newRow.querySelectorAll(".input"));
    
        const receivers = checkboxes.map(checkbox => ({
            type: checkbox.parentElement.textContent.trim(),
            selected: checkbox.checked
        }));
    
        const title = inputs.find(input => input.placeholder === "Title")?.value || "";
        const message = inputs.find(input => input.placeholder === "Message")?.value || "";
    
        const newData = {
            receivers,
            title,
            message,
            status: "publish"
        };

     const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/sendNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        })
        if(response.status == 401){
localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
        }
        const data = await response.json()
        fetchNotificatoinsData()
        showMessage(data.message)

            });
    
        });

        async function deleteNotification(elem) {
            
            const row = elem.closest('tr')
            const id = row.dataset.id
            const token = localStorage.getItem("accessToken");
            const response = await fetch('http://localhost:3030/api/v1/superadmin/deleteNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({id: id})
            })
            if(response.status == 401){
                localStorage.removeItem("accessToken")
             
                window.open("../dashboard.html");
            }
            const data = await response.json()
            fetchNotificatoinsData()
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
            