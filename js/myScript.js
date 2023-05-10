
//  index
const closeBtn = document.querySelector('.js-close-btn');
const message = document.querySelector('.js-error-message');
if (closeBtn) {   
    closeBtn.addEventListener('click',(event) =>{
        message.classList.remove('show-message')
    })
}
function goToHome() {
    window.location = "/thanglong-website/home.html";
}
function goToConfirm() {
    window.location = "/thanglong-website/confirm.html";
}

function goToIndex() {
    window.location = "/thanglong-website/index.html";
}
const navBtns = document.querySelectorAll('.nav-btn')
const login = document.querySelector('.login-href-btn')
const submit = document.querySelector('.js-submit')
for (const navBtn of navBtns) {
    if (navBtn)
        navBtn.addEventListener('click', goToIndex)
}
if (submit)
    submit.addEventListener('click', goToIndex)
if(login)   
    login.addEventListener('click', goToHome)




// confirm
const submitBtn = document.querySelector('.js-submit-btn')
const emailConfirm = document.querySelector('.js-email-confirm')
const passConfirm = document.querySelector('.js-passWord-confirm')

if (submitBtn) {
    submitBtn.addEventListener('click', (event) => {
        emailConfirm.classList.add('hide-confirm');
        passConfirm.classList.remove('hide-confirm');
    })
}



