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


function toggleForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}


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

document.getElementById('showEmailconfirmation').addEventListener('click', e => {
    e.preventDefault();
    toggleForm('emailConfirmationForm');
});

document.getElementById('showLoginFromReset').addEventListener('click', e => {
    e.preventDefault();
    toggleForm('loginForm');
});
document.getElementById('showLoginFromConfirm').addEventListener('click', e => {
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


const loginButton = document.querySelector('.loginButton')
loginButton.addEventListener('click', async (event) => {
    event.preventDefault();
    loginButton.disabled = true;
    const loader = document.createElement('span');
    loader.className = 'loader';
    loginButton.textContent = ""
    loginButton.appendChild(loader);
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3030/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
            if (data.page) {                
                localStorage.setItem("accessToken", data.accessToken)
                window.location.href = data.page
            }else{
                if (!data.success) {
                    showMessage(data.errors)
                }else{
                    showMessage(data.message)
                }
            }
            loginButton.disabled = false;
            loader.remove();
            loginButton.textContent = "Login"
        

    } catch (error) {
        showMessage('Login error!');
    }
});
const registerFormButton = document.querySelector('.registerFormButton')
registerFormButton.addEventListener('click', async (event) => {
    event.preventDefault();
    registerFormButton.disabled = true;
    const loader = document.createElement('span');
    loader.className = 'loader';
    registerFormButton.textContent = ""
    registerFormButton.appendChild(loader);
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
        if (!data.success) {   
            showMessage(data.errors)
        }else{
            showMessage(data.message);
            toggleForm('emailConfirmationForm');
        }
        registerFormButton.disabled = false;
        loader.remove();
        registerFormButton.textContent = "Register"
    } catch (error) {
        showMessage("Server error!");
    }
});

const getResetPAsswordCodeButton = document.getElementById('sendResetCode')
getResetPAsswordCodeButton.addEventListener('click', async (event) => {
    event.preventDefault();
    getResetPAsswordCodeButton.disabled = true;
    const loader = document.createElement('span');
    loader.className = 'loader';
    getResetPAsswordCodeButton.textContent = ""
    getResetPAsswordCodeButton.appendChild(loader);
    const email = document.getElementById('resetEmail').value;

    try {
        const response = await fetch('http://localhost:3030/api/v1/users/getResetCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email})
        });
        const data = await response.json();
        if (!data.success) {
            showMessage(data.errors);
        } else {
            showMessage(data.message);
        }
        getResetPAsswordCodeButton.disabled = false;
        loader.remove();
        getResetPAsswordCodeButton.textContent = "Get code"
    } catch (error) {
        showMessage("Server error!");
    }
});
const resetPasswordButton = document.getElementById('resetPassword')
resetPasswordButton.addEventListener('click', async (event) => {
    event.preventDefault();
    resetPasswordButton.disabled = true;
    const loader = document.createElement('span');
    loader.className = 'loader';
    resetPasswordButton.textContent = ""
    resetPasswordButton.appendChild(loader);
    const code = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('newPassword').value;

    try {
        const response = await fetch('http://localhost:3030/api/v1/users/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, newPassword })
        });
        const data = await response.json();
        if (!data.success) {
            showMessage(data.errors);
        } else {
            showMessage(data.message);
            toggleForm('loginForm');
        }
        resetPasswordButton.disabled = false;
        loader.remove();
        resetPasswordButton.textContent = "Reset password"
    } catch (error) {
        showMessage("Server error!");
    }
});




const getCodeButton = document.getElementById('sendCode')
const confirmButton = document.getElementById('confirm')

getCodeButton.addEventListener('click', async function () {

})

confirmButton.addEventListener('click', async function () {
    confirmButton.disabled = true;
    const loader = document.createElement('span');
    loader.className = 'loader';
    confirmButton.textContent = ""
    confirmButton.appendChild(loader);
    const input = document.getElementById('code')
    const code = input.value
    try {
        const response = await fetch('http://localhost:3030/api/v1/users/confirmEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        });
        const data = await response.json();
        if (!data.success) {
            showMessage(data.errors);
        }else{
            showMessage(data.message);
            toggleForm('loginForm');
        }
        confirmButton.disabled = false;
        loader.remove();
        confirmButton.textContent = "Confirm"
    } catch (error) {
        
    }
})


getCodeButton.addEventListener('click', function () {
  const emailInput = document.querySelector('.email')
  const sendButton = document.getElementById('send')
  emailInput.classList.remove('hide')
  sendButton.classList.remove('hide')
  getCodeButton.classList.add('hide')

})

const sendButton = document.getElementById('send')


sendButton.addEventListener('click', async function () {    
    sendButton.disabled = true;
    const loader = document.createElement('span');
    loader.className = 'loader';
    sendButton.textContent = ""
    sendButton.appendChild(loader);
    const emailInput = document.getElementById('email')
    const email = emailInput.value
    try {
        const response = await fetch('http://localhost:3030/api/v1/users/getConfirmationCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        const data = await response.json();
        if (!data.success) {
            showMessage(data.errors);
        }else{
            showMessage(data.message);
        }
        sendButton.disabled = false;
        loader.remove();
        sendButton.textContent = "Send"
        
    } catch (error) {

    }

  })




