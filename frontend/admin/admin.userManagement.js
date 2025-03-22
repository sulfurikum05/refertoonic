

const tableBody = document.querySelector(".users-table tbody");
async function fetchUsers() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/admin/getUsers", {
            method: 'GET',
            headers: { 
                "Authorization": `Bearer ${token}`
             },
        });
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
        const users = await response.json();
        populateTable(users);
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

function populateTable(users) {
    tableBody.innerHTML = "";

    users.forEach(user => {
        const date = new Date(user.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const row = document.createElement("tr");
        let buttonClass1 = ''
        let buttonClass2 = ''
        let color = ''
        if (user.status == "block") {
            buttonClass1 = "hide"
            color = "red"
        }
        if (user.status == "unblock") {
            buttonClass2 = "hide"
        }
        row.innerHTML = `
            <td style="color: ${color}">${user.name}</td>
            <td style="color: ${color}">${user.surname}</td>
            <td style="color: ${color}">${user.email}</td>
            <td style="color: ${color}">${formattedDate}</td>
            <td>
                <button class="block-user action-button ${buttonClass1}" onClick="blockUser(this)" title="Block"><img src="../icons/block.gif" class="icon" alt="block_icon"></button>
                <button class="unblock-user action-button ${buttonClass2}" onClick="unblockUser(this)" title="Unblock"><img src="../icons/unblock.gif" class="icon" alt="unblock_icon"></button>
                <button class="delete-user action-button" onClick="deleteUser(this)" title="Delete"><img src="../icons/delete.gif" class="icon" alt="delete_icon"></button>
            </td>
        `;
        tableBody.insertBefore(row, tableBody.firstChild);
    });
}

async function getAvailableUsersCount(){
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/admin/getAvailableUsersCount', {
            method: 'GET',
            headers: { 
                "Authorization": `Bearer ${token}`
             },
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
        const data = await response.json()
        const availableUsersSpan = document.querySelector('.available-users')
        availableUsersSpan.textContent = `Remaning: ${data} users`
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

fetchUsers();
getAvailableUsersCount()

document.getElementById("searchInput").addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const table = document.querySelector(".users-table tbody");
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
        if (rowText.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


    const userCreateButton = document.querySelector('.users-create-button')
    userCreateButton.addEventListener('click', function () {
        const tableBody = document.querySelector(".users-table tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td></td>
            <td></td>
            <td><input type="text" name="email" class="userEmail input" placeholder="Enter user email"></td>
            <td></td>
            <td>
            <button class="save-user action-button" title="Save" onClick="saveUser(this)"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
            <button class="cancel action-button" title="Cancel" onClick="cancelUserRow(this)"><img src="../icons/cancel.gif" class="icon" alt="cancel_icon"></button>
            </td>

        `;
        tableBody.insertBefore(row, tableBody.firstChild);

    })

async function saveUser() {
const input = document.querySelector('.userEmail')
const key = input.name; 
const value = input.value.trim(); 
const data = {
    [key]: value
}

        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch('http://localhost:3030/api/v1/admin/createVipProUser', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify(data)
            })
            if(response.status == 401){
                localStorage.removeItem("accessToken")
                window.open("../dashboard.html");
              }
                const resData = await response.json()
                if (!resData.success) {
                    showMessage(resData.errors)
                }else{
                    fetchUsers()
                    getAvailableUsersCount()
                    showMessage(resData.message)
                }

                
        } catch (error) {
            console.error('Server error:');
        }

}


async function deleteUser(elem) {

    const row = elem.closest('tr')
    const cells = row.querySelectorAll("td");
    let email = '';
    cells.forEach(cell => {
        if (cell.textContent.includes("@")) {
            email = cell.textContent.trim();
        }
    });

    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:3030/api/v1/admin/deleteUser', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({email: email})
        })
        if(response.status == 401){
            localStorage.removeItem("accessToken")
            window.open("../dashboard.html");
          }
            const data = await response.json()
            if (data.success) { 
                fetchUsers();
                getAvailableUsersCount()
                showMessage(data.message)
            }

    
    } catch (error) {
        console.error('Error deleting user:', error);
    }

}



async function blockUser(elem) {

const row = elem.closest("tr")
const cells = row.querySelectorAll("td");
let email = '';
cells.forEach(cell => {
    if (cell.textContent.includes("@")) {
        email = cell.textContent.trim();
    }
});

try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:3030/api/v1/admin/blockUser', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify({email: email})
    })
    if(response.status == 401){
        localStorage.removeItem("accessToken")
        window.open("../dashboard.html");
      }
        const data = await response.json()
        if (data.success) { 
            showMessage(data.message)
            elem.classList.add("hide")
            cells.forEach(cell => {
                cell.style.color = "red"
            });
            const unblockUserButton = row.querySelector('.unblock-user')
            unblockUserButton.classList.remove('hide')
        }

        

} catch (error) {
    console.error('Error sending data:', error);
}
}





async function unblockUser(elem) {
const row = elem.closest("tr")
const cells = row.querySelectorAll("td");
let email = '';
cells.forEach(cell => {
    if (cell.textContent.includes("@")) {
        email = cell.textContent.trim();
    }
});

try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:3030/api/v1/admin/unblockUser', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify({email: email})
    })
    if(response.status == 401){
localStorage.removeItem("accessToken")
        window.open("../dashboard.html");
      }
        const data = await response.json()
        if (data.success) { 
            showMessage(data.message)
            elem.classList.add("hide")
            cells.forEach(cell => {
            cell.style.color = ""
        });
        const blockUserButton = row.querySelector('.block-user')
        blockUserButton.classList.remove('hide')
        }
        
        

} catch (error) {
    console.error('Error sending data:', error);
}
}
function cancelUserRow(elem) {
const row = elem.closest("tr")
row.remove();
}


function upgradeMaxUserCount() {
const usersTable = document.querySelector('.users-table')
const popup = document.createElement("div")
popup.classList.add("upgradePopup")
popup.innerHTML = `
    <span>Enter user count</span>
    <input type="text" class="input userCount" placeholder="Min. 5 user" value="5">
    <div class="priceInfo">
    <span>Price for 1 user: 1 $</span>
    <span class="lastPrice">Last price:</span>
    </div>
    <div class="popupButtonsDiv">
        <button class="create-button popupButton" onClick="upgradeUserCount()">Upgrade</button>
        <button class="create-button popupButton" onClick="closePopup()">Cancel</button>
    </div>

`;
usersTable.appendChild(popup)

}



async function upgradeUserCount(){
try {
    const userCount = document.querySelector('.userCount').value
    const token = localStorage.getItem("accessToken");
    const response = await fetch('http://localhost:3030/api/v1/admin/upgradeUserCount', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify({userCount: userCount})  
    })
    if(response.status == 401){
        localStorage.removeItem("accessToken")
        window.open("../dashboard.html");
      }
      const data = await response.json()
        if (!data.success) {
            showMessage(data.errors)
        }else{
            window.open(data, '_blank');
            window.location.reload()
        }
}catch (error) {
        console.error('Error:', error);
    }
}

function closePopup() {
document.body.classList.remove('overlay-active');
const popup = document.querySelector('.upgradePopup')
popup.classList.add('hide')
}

function priceChange() {

const priceInput = document.querySelector('.userCount')
const lastPriceSpan = document.querySelector('.lastPrice')
lastPriceSpan.textContent = `Last price: ${priceInput.value} $`
priceInput.addEventListener('keyup', function () {

    lastPriceSpan.textContent = `Last price: ${priceInput.value} $`

})
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