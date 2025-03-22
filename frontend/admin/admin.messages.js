const messagesTableBody = document.querySelector(".messages-table tbody");

async function fetchMessagesData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/admin/getMessagesData", {
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
        populateTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
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

async function deleteMessage(elem) {
    const row = elem.closest("tr");
    const rowId = row.dataset.id
    const response =  await fetch('http://localhost:3030/api/v1/admin/deleteMessage', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: rowId })
    })
    if(response.status == 401){
        localStorage.removeItem("accessToken")
        window.open("../dashboard.html");
      }
        const data = await response.json()
        if (data.success) {
            fetchMessagesData()
            showMessage(data.message)
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
