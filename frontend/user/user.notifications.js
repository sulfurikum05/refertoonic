const notificationsTableBody = document.querySelector('.notifications-table tbody')

async function fetchNotificatoinsData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/users/getNotificationsData", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.status == 401) {
            localStorage.removeItem("accessToken")
            window.location.href = "../dashboard.html";
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
            <td>${item.title}</td>
            <td>${item.text}</td>
            <td>${item.sender}</td>
            <td>${formattedDate}</td>
            <td>${item.status}</td>
        `;
        notificationsTableBody.insertBefore(row, notificationsTableBody.firstChild);

    });
}