const recieveNotificationsTableBody = document.querySelector('.notifications-table tbody')
const sentNotificationsTableBody = document.querySelector('.sent-notifications-table tbody')
async function fetchNotificatoinsData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/admin/getNotificationsData", {
            method: 'GET',
            headers: {"Authorization": `Bearer ${token}`},
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




function populateNotificatoinsTable(data) {
    

    recieveNotificationsTableBody.innerHTML = ""; 
    data.forEach(item => {
        const date = new Date(item.send_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

        const row = document.createElement("tr");
        row.dataset.id = `${item.id}`
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.text}</td>
            <td>${formattedDate}</td>
            <td>${item.sender}</td>
            <td>${item.status}</td>

        `;
        recieveNotificationsTableBody.insertBefore(row, recieveNotificationsTableBody.firstChild);
        
    });
}



document.querySelector('.notifications-create-button').addEventListener('click', function () {
    document.querySelector('.actionSend').classList.remove('hide')
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `

        <td><input type="text" class="input" placeholder="Title"></td>
        <td><textarea type="text" class="input" placeholder="Message"></textarea></td>
        <td></td>
         <td>
                <div class="actions_col">
                    <button class="send-notification action-button" title="Send"><img src="../icons/send.gif" class="icon" alt="send_icon"></button>
                </div>
            </td> 
    `;
    sentNotificationsTableBody.insertBefore(newRow, sentNotificationsTableBody.firstChild);
    newRow.querySelector('.send-notification').addEventListener('click', async function () {
        const inputs = Array.from(newRow.querySelectorAll(".input"));
    
        const title = inputs.find(input => input.placeholder === "Title")?.value || "";
        const message = inputs.find(input => input.placeholder === "Message")?.value || "";
    
        const newData = {
            
            title,
            message,
            status: "publish",
        };
    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:3030/api/v1/admin/sendNotification', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newData)
        })
        if(response.status == 401){
localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
          const data = await response.json()
          showMessage(data.message)
          fetcSenthNotificatoinsData()
    });
    
            });


            async function fetcSenthNotificatoinsData() {
                try {
                    const token = localStorage.getItem("accessToken");
                    const response = await fetch("http://localhost:3030/api/v1/admin/getSentNotificationsData", {
                        method: 'GET',
                        headers: {"Authorization": `Bearer ${token}`},
                    });
                    if(response.status == 401){
                        localStorage.removeItem("accessToken")
                        window.open("../dashboard.html");
                      }
                    const data = await response.json();
                    
                    populateSentNotificatoinsTable(data)
                } catch (error) {
                    console.error("Failed to retrieve data", error);
                }
            }

            function populateSentNotificatoinsTable(data) {
    

                sentNotificationsTableBody.innerHTML = ""; 
                data.forEach(item => {
                    const date = new Date(item.send_at);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
            
                    const row = document.createElement("tr");
                    row.dataset.id = `${item.id}`
                    row.innerHTML = `
                        <td>${item.title}</td>
                        <td>${item.text}</td>
                        <td>${formattedDate}</td>
            
                    `;
                    sentNotificationsTableBody.insertBefore(row, sentNotificationsTableBody.firstChild);
                    
                });
            }
            

    fetchNotificatoinsData()
    fetcSenthNotificatoinsData()




    const recieveNotificationsHeader = document.querySelector('.notifications-header')
    const recieveNotificationsTable = document.querySelector('.notifications-table')
    const sentNotificationsHeader = document.querySelector('.sent-notifications-header')
    const sentNotificationsTable = document.querySelector('.sent-notifications-table')
    
    function showRecieveNotificationsTable() {
        if (sentNotificationsHeader.classList.contains('hide') && sentNotificationsTable.classList.contains('hide')) {
            return
        }else{
            recieveNotificationsHeader.classList.remove('hide')
            recieveNotificationsTable.classList.remove('hide')
            sentNotificationsHeader.classList.add('hide')
            sentNotificationsTable.classList.add('hide')
        }
    }
    function showSentNotificationsTable() {
        if (recieveNotificationsHeader.classList.contains('hide') && recieveNotificationsTable.classList.contains('hide')) {
            return
        }else{
            recieveNotificationsHeader.classList.add('hide')
            recieveNotificationsTable.classList.add('hide')
            sentNotificationsHeader.classList.remove('hide')
            sentNotificationsTable.classList.remove('hide')
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