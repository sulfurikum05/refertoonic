

const tableBody = document.querySelector(".users-table tbody");
async function fetchUsers() {
    try {

         const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/superadmin/getUsers", {
            method: 'GET',
            headers: { 
                "Authorization": `Bearer ${token}`
             },
        });
        const users = await response.json();
        if(response.status == 401){
            localStorage.removeItem("accessToken")
         
            window.open("../dashboard.html");
          }
        populateTable(users);
    } catch (error) {
        console.error("Не удалось получить данные:", error);
    }
}

function populateTable(users) {
    tableBody.innerHTML = "";
    users.sort((a, b) => a.id - b.id);
    let freeCount = 0
    const usersCount = users.length
    let vipCount = 0
    let vipProCount = 0
    let adminCount = 0
    let blockedUsers = 0



    users.forEach(user => {
        if (user.role == "user") freeCount++;
        if (user.role == "admin") adminCount++;
        if (user.status == "block") blockedUsers++;
        if (user.role == "vip") {
            if (user.payment_package == "vipPro") {
                vipProCount++
            }
            vipCount ++
        }

        const date = new Date(user.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const row = document.createElement("tr");
        let color = ''
        if (user.status == "block") {
            color = "red"
        }
        if (user.admin_id == null) {
            user.admin_id = ''
        }
        row.dataset.id = user.id
        row.innerHTML = `
            <td  style="color: ${color}">${user.id}</td>
            <td  style="color: ${color}">${user.name}</td>
            <td  style="color: ${color}">${user.surname}</td>
            <td  style="color: ${color}">${user.email}</td>
            <td  data-id="3" name="role" style="color: ${color}">${user.role}</td>
            <td  data-id="4" name="payment_package" style="color: ${color}">${user.payment_package}</td>
            <td  style="color: ${color}">${user.admin_id}</td>
            <td  style="color: ${color}">${formattedDate}</td>
            <td><button class="userInfo action-button" title="User information" onClick="showUserInfo(this)"><img src="../icons/userInfo.gif" class="icon" alt="userInfo_icon"></button></td>
            <td><button class="userPayments action-button" title="User payments" onClick="showUserPayments(this)"><img src="../icons/userPayments.gif" class="icon" alt="userPayments_icon"></button></td>
            <td>
                <button class="edit action-button" onClick="editUserPackage(this)" title="Edit"><img src="../icons/edit.gif" class="icon" alt="edit_icon"></button>
                <button class="save action-button hide" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
        const mainContainer = document.querySelector(".main-container");
        const infoDiv = document.createElement("div");
        infoDiv.classList.add('infoDiv')
        infoDiv.innerHTML = "";
        infoDiv.innerHTML = `                    
                    
                    <div class="usersCountInfoDiv hide">
                        <span>Users: ${usersCount}</span>
                        <span>Free: ${freeCount}</span>
                        <span>Vip/vipPro: ${vipCount}/${vipProCount}</span>
                        <span>Admin: ${adminCount}</span>
                        <span>Blocked: ${blockedUsers}</span>
                    </div>
                    <span class="usersCountInfo" onClick="showUsersCount()"  title="Users statistic"><img src="../icons/info.png"></span>
                    `;
                    mainContainer.appendChild(infoDiv);
}

fetchUsers();


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


function showUsersCount(){

    const usersCountInfoDiv = document.querySelector(".usersCountInfoDiv");
    if (usersCountInfoDiv.classList.contains('hide')) {
        
        usersCountInfoDiv.classList.remove('hide')
    }else{
        usersCountInfoDiv.classList.add('hide')
    }
}


    

// Получаем заголовки таблицы
const headers = document.querySelectorAll("th");
const table = document.querySelector(".users-table");
let isAsc = true; // Направление сортировки, true для возрастания, false для убывания

headers.forEach((header, index) => {
    header.addEventListener("click", () => {
        sortTable(index);
        isAsc = !isAsc; // Меняем направление сортировки при каждом клике
    });
});

function sortTable(columnIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr')); // Получаем все строки из tbody

    const sortedRows = rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        let comparison = 0;

        // Проверяем, если столбец с числовыми значениями
        if (!isNaN(cellA) && !isNaN(cellB)) {
            comparison = parseFloat(cellA) - parseFloat(cellB);
        } else {
            // Для строк, используем localeCompare
            comparison = cellA.localeCompare(cellB);
        }

        return isAsc ? comparison : -comparison; // Возвращаем сравнение в зависимости от направления сортировки
    });

    // Вставляем отсортированные строки обратно в таблицу
    sortedRows.forEach(row => table.querySelector('tbody').appendChild(row));
}


async function showUserInfo(elem){

    const row = elem.closest('tr')
    const userId = row.dataset.id
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:3030/api/v1/superadmin/getUsersPersonalInfo/${userId}`, {
        method: 'GET',
        headers: { 
            "Authorization": `Bearer ${token}`
         },
    });
    const data = await response.json()

    const usersTable = document.querySelector('.users-table')

    if (usersTable.querySelector(".userPopup")) {
        const deletedPopup = document.querySelector(".userPopup")
        deletedPopup.remove()
    }
        const popup = document.createElement("div")
        popup.classList.add("upgradePopup")
        popup.classList.add("userPopup")
        popup.innerHTML = `
                    <img src="${data[0].picture}" alt="profilePicture">
                    <h1>${data[0].name} ${data[0].surname}</h1>
                    <span class="phone"><b>Phone:</b> ${data[0].phone}</span>
                    <span class="address"><b>Address:</b> ${data[0].address}</span>
                    <span class="email"><b>Email:</b> ${data[0].email}</span>
                    <span class="website"><b>Website:</b> <a href="${data[0].website}">${data[0].website}</a></span>
                    <span class="birthday"><b>Birthday:</b> ${data[0].birthday}</span>
                    <span class="gender"><b>Gender:</b> ${data[0].gender}</span>
                    <span class="about"><b>About:</b> ${data[0].about}</span>
                    <button class="create-button popupButton" onClick="closePopup()">Cancel</button>
        `;
        usersTable.appendChild(popup)
    



}

function closePopup() {
    document.body.classList.remove('overlay-active');
    const popup = document.querySelector('.upgradePopup')
    popup.remove()
}


async function showUserPayments(elem) {
    const usersTable = document.querySelector(".users-table");
    usersTable.remove()
    const row = elem.closest('tr')
    const userId = row.dataset.id
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:3030/api/v1/superadmin/getUserPayments/${userId}`, {
        method: 'GET',
        headers: { 
            "Authorization": `Bearer ${token}`
         },
    });
    const data = await response.json()

    const paymentsTableBody = document.querySelector('.payments-table tbody')
    const paymentsTable = document.querySelector('.payments-table')
    paymentsTable.classList.remove('hide')

    data.forEach((payment)=>{

        const createDate = new Date(payment.created_at);
        let expireDate
        let formattedexpireDate
        if (payment.expire_at !== null) {
            expireDate = new Date(payment.expire_at);
            formattedexpireDate = `${expireDate.getDate().toString().padStart(2, '0')}.${(expireDate.getMonth() + 1).toString().padStart(2, '0')}.${expireDate.getFullYear()} ${expireDate.getHours().toString().padStart(2, '0')}:${expireDate.getMinutes().toString().padStart(2, '0')}:${expireDate.getSeconds().toString().padStart(2, '0')}`;

        }
        
    
    
    const formattedcreateDate = `${createDate.getDate().toString().padStart(2, '0')}.${(createDate.getMonth() + 1).toString().padStart(2, '0')}.${createDate.getFullYear()} ${createDate.getHours().toString().padStart(2, '0')}:${createDate.getMinutes().toString().padStart(2, '0')}:${createDate.getSeconds().toString().padStart(2, '0')}`;

    const paymentRow = document.createElement("tr");
    paymentRow.dataset.id = payment.order_id
    paymentRow.innerHTML = `
        <td>${payment.id}</td>
        <td>${payment.user_id}</td>
        <td>${payment.payment_id}</td>
        <td>${payment.order_id}</td>
        <td>${payment.method}</td>
        <td>${payment.package}</td>
        <td>${payment.price}</td>
        <td>${payment.period}</td>
        <td data-id="1" name="status">${payment.status}</td>
        <td><a href="${payment.invoice_url}">invoice</a></td>
        <td data-id="2" name="expire_at">${formattedexpireDate || ""}</td>
        <td>${formattedcreateDate}</td>
        <td>
            <button class="edit action-button" onClick="editPaymentStatus(this)" title="Edit"><img src="../icons/edit.gif" class="icon" alt="edit_icon"></button>
            <button class="change action-button" onClick="openChangeStatusPopup(this)" title="Change status"><img src="../icons/change.gif" class="icon" alt="change_icon"></button>
            <button class="save action-button hide" title="Save"><img src="../icons/save.gif" class="icon" alt="save_icon"></button>
        </td>
        

    `;
    paymentsTableBody.appendChild(paymentRow);
})
}

                       
function editPaymentStatus(elem){

    const row = elem.closest('tr')
    const cells = row.querySelectorAll("td");
    const editButtons = document.querySelectorAll('.edit')
    editButtons.forEach((button)=>{
        button.classList.add('hide')
    })
    const saveButton = row.querySelector('.save')
    saveButton.classList.remove('hide')
    cells.forEach(cell => {
        let cellId = cell.dataset.id
        if (cellId == 1 || cellId == 2) {
            cell.innerHTML = `
            <input type="text" class="input" value="${cell.textContent}" data-id="${cellId}">
        `
        }
                
    })
    saveButton.addEventListener('click', async function (){
        const row = elem.closest('tr')
        const inputs = row.querySelectorAll("input");
        const body = {};
        inputs.forEach(input => {  
            body[input.dataset.id] = input.value;
            })      
            body.order_id = row.dataset.id
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:3030/api/v1/superadmin/updatePaymentSuperadmin`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
            });
            if(response.status == 401){
                localStorage.removeItem("accessToken")
                window.open("../dashboard.html");
            }
            const data = await response.json()
            showMessage(data.message)
            setTimeout(() => {
                window.location.reload()
            }, 2000);
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



function editUserPackage(elem) {
    const row = elem.closest('tr')
    const cells = row.querySelectorAll("td");
    const editButtons = document.querySelectorAll('.edit')
    editButtons.forEach((button)=>{
        button.classList.add('hide')
    })
    const saveButton = row.querySelector('.save')
    saveButton.classList.remove('hide')
    cells.forEach(cell => {
        let cellId = cell.dataset.id
        if (cellId == 3 || cellId == 4) {
            cell.innerHTML = `
            <input type="text" class="input" value="${cell.textContent}" data-id="${cellId}">
        `
        }
                
    })

    saveButton.addEventListener('click', async function (){
        const row = elem.closest('tr')
        const inputs = row.querySelectorAll("input");
        const body = {};
        inputs.forEach(input => {  
            body[input.dataset.id] = input.value;
            })      
            body.user_id = row.dataset.id
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:3030/api/v1/superadmin/editUserPackage`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
            });
            if(response.status == 401){
                localStorage.removeItem("accessToken")
                window.open("../dashboard.html");
            }
            const data = await response.json()
            const infoDiv = document.querySelector('.infoDiv')
            infoDiv.remove()
            fetchUsers()
            showMessage(data.message)

            })

}

function openChangeStatusPopup(elem) {
    const row = elem.closest('tr')
    const order_id = row.dataset.id
    const status1 = "waiting"
    const status2 = "confirming"
    const status3 = "confirmed"
    const status4 = "sending"
    const status5 = "partially_paid"
    const status6 = "failed"
    const status7 = "expired"
    const status8 = "finished"
    const paymentsTable = document.querySelector('.payments-table')
    const popup = document.createElement("div")
        popup.classList.add("upgradePopup")
        popup.classList.add("userPopup")
        popup.innerHTML = `

                    <p><b>Change status for this order</b></p>
                    <div>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status1}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status2}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status3}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status4}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status5}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status6}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status7}</span></button>
                        <button class="change-button popupButton"><span data-order_id="${order_id}" onClick="changeOrderStatus(this)">${status8}</span></button>

                    </div>
        `;
        paymentsTable.appendChild(popup)
}

async function changeOrderStatus(elem) {
    const order_id = elem.dataset.order_id
    const payment_status = elem.textContent
    const body = {
        order_id: order_id, 
        payment_status: payment_status
    }
    const token = localStorage.getItem("accessToken");
    await fetch(`http://localhost:3030/api/v1/superadmin/ipnPaymentStatus`, {
    method: 'POST',
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
    });
    // if(response.status == 401){
    //     localStorage.removeItem("accessToken")
    //     window.open("../dashboard.html");
    // }
    // const data = await response.json()
    // showMessage(data.message)
    setTimeout(() => {
        window.location.reload()
    }, 100);

}