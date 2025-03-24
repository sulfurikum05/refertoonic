const paymentHistoryTableBody = document.querySelector('.payment-history-table tbody')

async function fetcPaymentHistoryData() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3030/api/v1/users/getPaymentHistoryData", {
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
        populatePaymentHistoryTable(data)
    } catch (error) {
        console.error("Failed to retrieve data", error);
    }
}

fetcPaymentHistoryData()


function populatePaymentHistoryTable(data) {

    paymentHistoryTableBody.innerHTML = "";
    data.forEach(item => {
        let expire = ''
        let expireDate = ''
        if (item.expire_at !== null) {
            expire = new Date(item.expire_at);
            expireDate = `${expire.getDate().toString().padStart(2, '0')}.${(expire.getMonth() + 1).toString().padStart(2, '0')}.${expire.getFullYear()} ${expire.getHours().toString().padStart(2, '0')}:${expire.getMinutes().toString().padStart(2, '0')}:${expire.getSeconds().toString().padStart(2, '0')}`;
        }
        const create = new Date(item.created_at);
        const createDate = `${create.getDate().toString().padStart(2, '0')}.${(create.getMonth() + 1).toString().padStart(2, '0')}.${create.getFullYear()} ${create.getHours().toString().padStart(2, '0')}:${create.getMinutes().toString().padStart(2, '0')}:${create.getSeconds().toString().padStart(2, '0')}`;

        const row = document.createElement("tr");
        row.dataset.id = `${item.id}`
        row.innerHTML = `
            <td>${item.payment_id}</td>
            <td>${item.order_id}</td>
            <td>${item.order_description}</td>
            <td>${item.method}</td>
            <td>${item.package}</td>
            <td>${item.price}</td>
            <td>${item.period}</td>
            <td>${createDate}</td>
            <td>${expireDate}</td>
            <td> <a href="${item.invoice_url}">Pay</a></td>
            <td>${item.status}</td>
        `;
        paymentHistoryTableBody.insertBefore(row, paymentHistoryTableBody.firstChild);

    });
}


