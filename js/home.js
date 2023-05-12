const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let infoTeacher = undefined;
const listInput = ['teacherCode', 'name', 'dob', 'email', 'phoneNumber', 'address']

// payrollModal
const closeBtn = $('.js-close-payroll-btn')
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


//createClassModal
const createBtn = $(".create-btn")
const createClassModal = $(".modal-create-class")
const closeCreate = $(".js-close-create-class")
createBtn.addEventListener('click', () => {
    createClassModal.classList.add('show-modal')
})
closeCreate.addEventListener('click', () => {
    createClassModal.classList.remove('show-modal')
})


//addTeachModal
const addBtn = $(".add-teach-btn")
const addTeachModal = $(".modal-add-teach")
const closeAdd = $(".close-add-teach")
addBtn.addEventListener('click', () => {
    addTeachModal.classList.add('show-modal')
})
closeAdd.addEventListener('click', () => {
    addTeachModal.classList.remove('show-modal')
})

// showContent
const items = $$('.js-item')
const contentItems = $$('.js-show-item')
const i = $('.i-item')


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
        $('.input-id').addEventListener('click', (event) => {
            event.stopPropagation();
        })
        if (index == 0){
            i.classList.remove('hide')
        }
        else {
            i.classList.add('hide')
        }
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

const showTeacher = () => {
    listInput.forEach((item) => {
        var input = document.querySelector(`input[name="${item}"]`);
        if (input) {
            if (item === 'dob') {
                input.value = infoTeacher[`${item}`].slice(0, 10);
            }
            else{
                input.value = infoTeacher[`${item}`]
            }
        }
    })
    let select = $('select[name="degree"]')
    select.value =  infoTeacher.degree
}

function getTeacher() {
    const apiGetTeacher = 'https://103.69.193.30.nip.io/teachers/get'
    //api lấy thông tin giáo viên 
    fetch(apiGetTeacher)
        .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        // Read the response as json.
        return response.json();
        })
        .then((response) => {
            if (response.success) {
                const listTeacher = $('#list-teacher')
                for (let i = 0; i < response.data.length; i++){
                    let teacher = response.data[i];
                    let li = document.createElement("li");
                    li.textContent = teacher.teacherCode;

                    // Thêm lớp "highlight" vào thẻ li
                    li.classList.add("sider-item");
                    li.onclick = () => {
                        infoTeacher = teacher
                        showTeacher()
                    }  
                    listTeacher.appendChild(li);
                }
            }
        })
        .catch(e => {
        console.log(e)
        })
}



function run() {
    getTeacher(showTeacher);
}

run();
