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

// Переключение форм
function toggleForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Обработчики переключения форм
document.getElementById('showLogin').addEventListener('click', e => {
    e.preventDefault();
    toggleForm('loginForm');
});

document.getElementById('showRegister').addEventListener('click', e => {
    e.preventDefault();
    toggleForm('registerForm');
});

document.getElementById('showResetPassword').addEventListener('click', e => {
    e.preventDefault();
    toggleForm('resetPasswordForm');
});

document.getElementById('showLoginFromReset').addEventListener('click', e => {
    e.preventDefault();
    toggleForm('loginForm');
});

document.querySelector(".btn_login").addEventListener('click', event => {
    document.body.style.overflow = "hidden"
    event.preventDefault();
    document.querySelector(".form-div").classList.remove("hide")
    document.querySelector(".form-container").classList.remove("hide")  
    document.querySelector(".form-div").classList.add("show")
    document.querySelector(".form-container").classList.add("show")  
})

document.querySelector(".close_btn_login_form").addEventListener('click', event => {
    document.body.style.overflow = "unset"
    event.preventDefault();
    document.querySelector(".form-div").classList.remove("show")
    document.querySelector(".form-container").classList.remove("show")  
    document.querySelector(".form-div").classList.add("hide")
    document.querySelector(".form-container").classList.add("hide")  
})


// Вход
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3030/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!data.status) {
            console.log(data.page, 1, data.status);
            showMessage(data.message)
        }else{
            if (data.page) {                
                localStorage.setItem("accessToken", data.accessToken)
                console.log(data.page, 2);
                
                window.location.href = data.page
            }else{
                console.log(data, 3);
                showMessage(data.errors)
            }
        }

    } catch (error) {
        showMessage('Login error!');
    }
});

// Регистрация
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const surname = document.getElementById('registerSurname').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showMessage("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/api/v1/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        });
        const data = await response.json();

            showMessage(data.message);
            toggleForm('loginForm');
        
    } catch (error) {
        showMessage("Server error!");
    }
});

// Сброс пароля
document.getElementById('sendResetCode').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;

    try {
        const response = await fetch('http://localhost:3030/api/v1/users/getResetCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        showMessage(data.message);
    } catch (error) {
        showMessage("Server error!");
    }
});

document.getElementById('resetPassword').addEventListener('click', async (event) => {
    event.preventDefault();
    const code = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('newPassword').value;

    try {
        const response = await fetch('http://localhost:3030/api/v1/users/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, newPassword })
        });
        const data = await response.json();
            showMessage(data.message);
            toggleForm('loginForm');

    } catch (error) {
        showMessage("Server error!");
    }
});
