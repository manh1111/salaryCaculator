const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// payrollModal
const closeBtn = $('.js-close-btn')
const modal = $('.payroll-modal')
const staSalary = $('.js-sta-salary')
const modalContainer = $('.payroll-container')
staSalary.addEventListener('click', () => {
    modal.classList.add('show-modal');
})
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show-modal');
})
modal.addEventListener('click', () => {
    modal.classList.remove('show-modal');
})
modalContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    }
)


// showContent
const items = $$('.js-item')
const contentItems = $$('.js-show-item')


items.forEach((item, index) => {
    item.addEventListener('click', () => {
        contentItems.forEach((item, index) => {
            if (item.classList.contains('show-content')) {
                item.classList.remove('show-content') 
            }
        })
        showItem = contentItems[index]

        $('.js-sider').classList.add('show-content')
        showItem.classList.add('show-content')
    })

});


//change page
function goToHome() {
    window.location = "/home.html";
}
function goToConfirm() {
    window.location = "/confirm.html";
}

function goToIndex() {
    window.location = "/index.html";
}

const changePassBtn = $('.change-passWord-btn')
const exitBtn = $('.exit-btn')

exitBtn.addEventListener('click', goToIndex)
changePassBtn.addEventListener('click', goToConfirm)
