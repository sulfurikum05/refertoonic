

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
            console.error("Failed to retrieve data", error);
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
                <td  style="color: ${color}">${user.role}</td>
                <td  style="color: ${color}">${user.payment_package}</td>
                <td  style="color: ${color}">${user.admin_id}</td>
                <td  style="color: ${color}">${formattedDate}</td>
                <td><button class="userInfo action-button" title="User information" onClick="showUserInfo(this)"><img src="../icons/userInfo.gif" class="icon" alt="userInfo_icon"></button></td>
            `;
            tableBody.appendChild(row);
        });
        const mainContainer = document.querySelector(".main-container");
        const infoDiv = document.createElement("div");
        infoDiv.classList.add('infoDiv')
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


        


    const headers = document.querySelectorAll("th");
    const table = document.querySelector(".users-table");
    let isAsc = true;

    headers.forEach((header, index) => {
        header.addEventListener("click", () => {
            sortTable(index);
            isAsc = !isAsc;
        });
    });

    function sortTable(columnIndex) {
        const rows = Array.from(table.querySelectorAll('tbody tr'));

        const sortedRows = rows.sort((rowA, rowB) => {
            const cellA = rowA.cells[columnIndex].textContent.trim();
            const cellB = rowB.cells[columnIndex].textContent.trim();

            let comparison = 0;

            if (!isNaN(cellA) && !isNaN(cellB)) {
                comparison = parseFloat(cellA) - parseFloat(cellB);
            } else {
                comparison = cellA.localeCompare(cellB);
            }

            return isAsc ? comparison : -comparison;
        });

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