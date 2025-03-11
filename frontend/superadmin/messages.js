const messagesTableBody = document.querySelector(".messages-table tbody");

async function fetchMessagesData() {
    try {

         const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/superadmin/getMessagesData", {
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
        console.error("Не удалось получить данные:", error);
    }
}

function populateTable(data) {
    messagesTableBody.innerHTML = ""; 
    data.forEach(item => {
        const date = new Date(item.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

        const row = document.createElement("tr");
        row.dataset.id = `${item.id}`
        row.innerHTML = `
            <td>${item.user_id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.subject}</td>
            <td>${item.text}</td>
            <td>${item.admin_id}</td>
            <td>${formattedDate}</td>
            <td>
                <div class="actions_col">
                    <button class="delete-message action-button" onClick="deleteMessage(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
                </div>
            </td>
        `;
        messagesTableBody.insertBefore(row, messagesTableBody.firstChild);
        
    });
}

fetchMessagesData()


async function createMessage() {
    const createButton = document.querySelector('.message-create-button')
    createButton.classList.add('hide')
    const row = document.createElement("tr");
      row.innerHTML = `
            <td></td>
            <td></td>
            <td name="email"><input type="email" class="inputEmail input"></td>
            <td name="subject"><input type="text"  class="inputSubject input"></td>
            <td name="message"><input type="text" class="inputMessage input"></td>
            <td></td>
            <td></td>
            <td>
                <div class="actions_col">
                <button class="cancel action-button" title="Cancel" onClick="cancelMessageRow(this)"><img src="../icons/cancel.gif" class="icon" alt="cancel_icon"></button>
                <button class="send-message action-button" title="Send" onclick="sendMessage(this)"><img src="../icons/send.gif" class="icon" alt="send_icon"></button>

                </div>
            </td>`
            messagesTableBody.insertBefore(row, messagesTableBody.firstChild);  
}

async function deleteMessage(elem) {

        const row = elem.closest("tr");
        const rowId = row.dataset.id

         const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/deleteMessage', {
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
            fetchMessagesData()
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


       
 
function cancelMessageRow(elem) {
    const row = elem.closest("tr")
    row.remove();
    const createButton = document.querySelector('.message-create-button')
    createButton.classList.remove('hide')
}



async function sendMessage(elem) {
    const body = {};
    const row = elem.closest('tr');
    const cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
        const name = cell.getAttribute('name');
        const input = cell.querySelector('.input');
        let value = input ? input.value.trim() : cell.textContent.trim(); 
        body[name] = value;
    });
        delete body.null
    
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/superadmin/sendMessage', {
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
            const data = await response.json()
            const createButton = document.querySelector('.message-create-button')
            createButton.classList.remove('hide')
            fetchMessagesData()
            showMessage(data.message)

}