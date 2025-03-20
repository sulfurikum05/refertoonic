async function fetchMessagesData(){
    
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/users/getSentMessages", {
            method: 'GET',
            headers: {"Authorization": `Bearer ${token}`},
        })
        if(response.status == 401){
localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }

        const data = await response.json();

        
        if (data.length !== 0) {
            const sentMessagesBody = document.querySelector('.sent-messages-table tbody')
            sentMessagesBody.innerHTML = "";

            data.forEach(element => {
                const date = new Date(element.created_at);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        
            const row = document.createElement('tr')
            row.innerHTML += `
            <td>${element.subject}</td>
            <td>${element.text}</td>
            <td>${formattedDate}</td>
            `;

            sentMessagesBody.insertBefore(row, sentMessagesBody.firstChild)
            
        });
        
        }
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
    
}

fetchMessagesData()

async function sendHelpMessage(){
    const subject = document.getElementById('subjectInput')
    const message = document.getElementById('messageInput')

    const bodyData = {
        subject: subject.value,
        message: message.value
    }
    
    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:3030/api/v1/users/sendHelpMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
    })
    if(response.status == 401){
        localStorage.removeItem("accessToken")
     
        window.open("../dashboard.html");
      }
      const data = await response.json()
        if (data.success == false) {   
            showMessage(data.errors)
        }else{
            subject.value = ""
            message.value = ""
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