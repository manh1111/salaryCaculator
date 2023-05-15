const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let infoTeacher = undefined;
const listSalary = $('.list__salary')
const listInput = ['teacherCode', 'name', 'dob', 'email', 'phoneNumber', 'address']
let dataListTeacher = []
let dataListSalary = [];
const RulesQualifications = {
    graduate: 'Tốt nghiệp đại học',
    master: 'Thạc sĩ',
    docter: 'Tiến sĩ',
    associateProfessor: 'Phó giáo sư',
    professor: 'Giáo sư',
}

// payrollModal
const closeBtn = $('.js-close-payroll-btn')
const modal = $('.payroll-modal')
const staSalary = $('.js-sta-salary')
const modalContainer = $('.payroll-container')
staSalary.addEventListener('click', () => {
    modal.classList.add('show-modal')
    staSalary.classList.add('active')
    items.forEach((item) => {
        item.classList.remove('active')
    })
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
    optionCreateClass()
})
closeCreate.addEventListener('click', () => {
    createClassModal.classList.remove('show-modal')
})

//createSubject
const createSubBtn = $(".create-subject-btn")
const createSubModal = $(".modal-create-subject")
const closeCreateSub = $(".js-close-create-subject")
createSubBtn.addEventListener('click', () => {
    createSubModal.classList.add('show-modal')

})
closeCreateSub.addEventListener('click', () => {
    createSubModal.classList.remove('show-modal')
})
//addTeacherModal
const showModalAdd = $(".add-teacher-btn")
const addTeacherModal = $(".modal-add-teacher")
const closeAdd = $(".close-add-teacher")
showModalAdd.addEventListener('click', () => {
    addTeacherModal.classList.add('show-modal')
})
closeAdd.addEventListener('click', () => {
    addTeacherModal.classList.remove('show-modal')
})

// showContent
const items = $$('.js-item')
const contentItems = $$('.js-show-item')
const i = $('.i-item')

items.forEach((item, index) => {
    item.addEventListener('click', () => {
        items.forEach((item) => {
            item.classList.remove('active') 
            staSalary.classList.remove('active')
        })
        contentItems.forEach((item) => {
                item.classList.remove('show-content')
        })
        item.classList.add('active')
        showItem = contentItems[index]
        if (index == 0 || index == 1) {
            $('.js-sider').classList.add('show-content')
        }
        else {
            $('.js-sider').classList.remove('show-content')
        }
        showItem.classList.add('show-content')
        $('.input-id').addEventListener('click', (event) => {
            event.stopPropagation();
        })                                              
        if (index == 0) {
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
        let input = $((`.show-info input[name="${item}"]`));
        if (input) {
            if (item === 'dob') {
                input.value = infoTeacher[`${item}`].slice(0, 10);
            }
            else {
                input.value = infoTeacher[`${item}`]
            }
        }
    })
    let select = $('select[name="degree"]')
    select.value = infoTeacher.degree
    const salaryTeacher = dataListSalary.find(item => item.teacherCode === infoTeacher.teacherCode)
    if (salaryTeacher) {
        while (listSalary.firstChild) {
            listSalary.removeChild(listSalary.firstChild)
        }
        let codeTeach = $('.code-teacher');
        let nameTeacher = $('.name-teacher')
        let teacherDegree = $('.teacherDegree')
        codeTeach.textContent = `Mã giáo viên: ${salaryTeacher.teacherCode}`
        nameTeacher.textContent = `Họ và tên: ${salaryTeacher.nameTeacher}`
        teacherDegree.textContent = `Bằng cấp: ${RulesQualifications[`${salaryTeacher.degree}`]}`
        if (salaryTeacher.classAndLession && salaryTeacher.classAndLession.length > 0) {
            for(let i = 0;i < salaryTeacher.classAndLession.length; i++) {
                const item = salaryTeacher.classAndLession[i];
                let tr = document.createElement("tr");
                const data = [i + 1, item.class, salaryTeacher?.listSubject[i], item?.lession, item.studentNumber, item?.salary]
                for (let j = 0; j < 6; j++) {
                    let td = document.createElement("td");
                    td.textContent = data[j];
                    tr.appendChild(td);
                }
                listSalary.appendChild(tr)
            }
            let trTotalSalary = document.createElement("tr")
            let tdTotalText = document.createElement("td")
            let tdTotalSalary = document.createElement("td")
            tdTotalText.colSpan = 5
            tdTotalText.textContent = "Tổng tiền lương"
            tdTotalSalary.textContent = salaryTeacher.salary
            trTotalSalary.appendChild(tdTotalText);
            trTotalSalary.appendChild(tdTotalSalary);
            listSalary.appendChild(trTotalSalary);
        }
        else {
            let tr = document.createElement("tr")
            let td = document.createElement("td")
            td.colSpan = 6
            td.innerText = "No Data"
            tr.appendChild(td)
            listSalary.appendChild(tr)
        }
    }
}

const listTeacher = $('#list-teacher')
const showSider = (data) => {
    while (listTeacher.firstChild) {
        listTeacher.removeChild(listTeacher.firstChild); // Xóa các phần tử li cho đến khi không còn phần tử con
    }
    for (let i = 0; i < data.length; i++) {
        let teacher = data[i];
        let li = document.createElement("li");
        li.textContent = teacher.teacherCode;

        // Thêm lớp "highlight" vào thẻ li
        li.classList.add("sider-item");
        li.onclick = () => {
            infoTeacher = teacher;
            showTeacher()
        }
        listTeacher.appendChild(li);
    }
}

let listIDTeacher = []
let listNameTeacher = []
const apiGetTeacher = 'https://103.69.193.30.nip.io/teachers/get'
function getTeacher() {
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
                dataListTeacher = [...response.data];
                for (let i = 0; i < response.data.length; i++) {
                    listIDTeacher[i] = response.data[i]._id
                    listNameTeacher[i] = response.data[i].name
                }
                showSider(dataListTeacher)
            }
        })
        .catch(e => {
            console.log(e)
        })
}

const apiPostTeacher = 'https://103.69.193.30.nip.io/teachers/create'
function createTeacher(data) {
    fetch(apiPostTeacher, {
        method: "POST",
        //     mode: "cors", // no-cors, *cors, same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "include", // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        //     redirect: "follow", // manual, *follow, error
        //     referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then((response) => {
            //show new teacher
            listInput.forEach((item) => {
                let input = $((`.show-info input[name="${item}"]`));
                if (input) {
                    if (item === 'dob') {
                        input.value = response.data[`${item}`].slice(0, 10);
                    }
                    else {
                        input.value = response.data[`${item}`]
                    }
                }
            })
            let select = $('.show-info select[name="degree"]')
            if (select) {
                select.value = response.data.degree
            }
            dataListTeacher.push(response.data);
            console.log(dataListTeacher);
            showSider(dataListTeacher);
        })
        .catch(e => {
            console.log(e)
        })
}

function handleAddTeacher() {
    const addTeacherBtn = $('.add-teacher')
    addTeacherBtn.onclick = () => {
        let info = []
        var data = {}
        for (let item of listInput) {
            if (item != 'teacherCode') {
                info[item] = $((`.modal-add-teacher input[name="${item}"]`)).value
                let degreeTeacher = $((`.modal-add-teacher select[name="degree"]`)).value
                data[`${item}`] = info[item]
                data.degree = degreeTeacher
            }
        }
        data['cmnd'] = Math.random().toString()
        createTeacher(data)
        addTeacherModal.classList.remove('show-modal')
    }
}

const apiDeleteClass = 'https://103.69.193.30.nip.io/classes/delete'
function handleDeleteClass(id) {
    fetch(apiDeleteClass + "?id=" + id, {
        method: "Delete",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => {
            getClass()
        })
        .catch(e => {
            console.log(e)
        })
}

let listIDClass = []
let listNameClass = []
const listClass = $('#list-class')
const apiGetClass = 'https://103.69.193.30.nip.io/classes/get'
function getClass() {
    fetch(apiGetClass)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                while (listClass.firstChild) {
                    listClass.removeChild(listClass.firstChild)
                }
                for (let i = 0; i < response.data.length; i++) {
                    let tr = document.createElement("tr");
                    let classObject = response.data[i];
                    let data = [i + 1, classObject.name, classObject?.Subject?.name || "Đã xóa", classObject.Teacher.name,
                    classObject.studentNumber]
                    for (let j = 0; j < 6; j++) {
                        let td = document.createElement("td");
                        td.textContent = data[j]
                        if (j === 5) {
                            let iElement = document.createElement('i')
                            iElement.classList.add('fa-solid', 'fa-xmark')
                            iElement.onclick = () => { handleDeleteClass(listIDClass[i]) }
                            td.appendChild(iElement)
                            let i2Element = document.createElement('i')
                            i2Element.classList.add('fa-solid', 'fa-pen')
                            i2Element.onclick = ()=>{ handleUpdateClass(listIDClass[i])}
                            td.appendChild(i2Element)
                            td.classList.add('col-action')
                        }
                        tr.appendChild(td)
                    }
                    listClass.appendChild(tr)
                }
            }
            for (let i = 0; i < response.data.length; i++) {
                listIDClass[i] = response.data[i]._id
                listNameClass[i] = response.data[i].name
            }
        })
        .catch(e => {
            console.log(e)
        })
}

function handleAddClass() {
    const addClassBtn = $('.create-class')
    addClassBtn.onclick = () => {
        var data = {}
        var key = ['name', 'name-subject', 'name-class', 'studentNumber']
        var list = ['Teacher', 'name', 'Subject', 'studentNumber']
        for (let i = 0; i < 4; i++) {
            if (key[i] === 'name' || key[i] === 'name-subject') {
                let classTeacher = $('.modal-create-class select[name="name"]').value
                data.Teacher = classTeacher
                let subjectName = $('.modal-create-class select[name="name-subject"]').value
                data.Subject = subjectName
            }
            data['name'] = $(`.modal-create-class input[name="name-Class"]`).value
            data['studentNumber'] = $(`.modal-create-class input[name="studentNumber"]`).value
        }
        createClass(data)
        createClassModal.classList.remove('show-modal')
    }
}

function handleUpdateClass(id) {
    $('.modal-update-class').classList.add('show-modal');
    $('.js-close-update-class').onclick = () => {
        $('.modal-update-class').classList.remove('show-modal');   
    }
}

function optionCreateClass() {
    for (let i = 0; i < listIDTeacher.length; i++) {
        let option = document.createElement("option")
        option.classList.add('nameOption')
        option.innerText = listNameTeacher[i]
        option.value = listIDTeacher[i]
        $('.modal-create-class .block-input:nth-child(1) select').appendChild(option)
    }
    for (let i = 0; i < listIDSubject.length; i++) {
        let option = document.createElement("option")
        option.classList.add('nameSubject-option')
        option.innerText = listNameSubject[i]
        option.value = listIDSubject[i]
        $('.modal-create-class .block-input:nth-child(2) select').appendChild(option)
    }
}

const apiPostClass = 'https://103.69.193.30.nip.io/classes/create'
function createClass(data) {
    fetch(apiPostClass, {
        method: "POST",
        //     mode: "cors", // no-cors, *cors, same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "include", // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        //     redirect: "follow", // manual, *follow, error
        //     referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then(() => {
            getClass()
        })
        .catch(e => {
            console.log(e)
        })
}

const apiDeleteSubject = 'https://103.69.193.30.nip.io/subject/delete'
function handleDeleteSubject(id) {
    fetch(apiDeleteSubject + "?id=" + id, {
        method: "Delete",
        //     mode: "cors", // no-cors, *cors, same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "include", // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        //     redirect: "follow", // manual, *follow, error
        //     referrerPolicy: "no-referrer",
    })
        .then(() => {
            getSubject()
        })
        .catch(e => {
            console.log(e)
        })
}

let listIDSubject = []
let listNameSubject = []
const listSubject = $('#list-subject')
const apiGetSubject = 'https://103.69.193.30.nip.io/subject/get'
function getSubject() {
    fetch(apiGetSubject)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                while (listSubject.firstChild) {
                    listSubject.removeChild(listSubject.firstChild)
                }
                for (let i = 0; i < response.data.length; i++) {
                    let tr = document.createElement("tr");
                    let subjectObject = response.data[i];
                    const data = [i + 1, subjectObject.name, subjectObject.subjectCode, subjectObject.subjectCoefficients,
                    subjectObject.lession]
                    for (let j = 0; j < 6; j++) {
                        let td = document.createElement("td");
                        td.textContent = data[j]
                        if (j == 5) {
                            let iElement = document.createElement('i')
                            iElement.classList.add('fa-solid')
                            iElement.classList.add('fa-xmark')
                            iElement.onclick = () => { handleDeleteSubject(listIDSubject[i]) }
                            td.appendChild(iElement)
                            let i2Element = document.createElement('i')
                            i2Element.classList.add('fa-solid')
                            i2Element.classList.add('fa-pen')
                            i2Element.onclick = ()=>{ handleUpdateSubject(listIDClass[i])}
                            td.appendChild(i2Element)
                            td.classList.add('col-action')
                        }
                        tr.appendChild(td)
                    }
                    listSubject.appendChild(tr)
                }
            }
            for (let i = 0; i < response.data.length; i++) {
                listIDSubject[i] = response.data[i]._id
                listNameSubject[i] = response.data[i].name
            }
        })
        .catch(e => {
            console.log(e)
        })
}

function handleUpdateSubject(id) {
    $('.modal-update-subject').classList.add('show-modal');
    $('.js-close-update-subject').onclick = () => {
        $('.modal-update-subject').classList.remove('show-modal');
    }
}

function handleAddSubject() {
    const addSubjectBtn = $('.create-subject')
    addSubjectBtn.onclick = () => {
        let info = []
        var data = {}
        var key = ['name-subject', 'subjectCode', 'sub-coefficients', 'lession']
        var list = ['name', 'subjectCode', 'subjectCoefficients', 'lession']
        for (let i = 0; i < 4; i++) {
            if (key[i] == 'sub-coefficients') {
                data[`${list[i]}`] =  $((`.modal-create-subject select[name="sub-coefficients"]`)).value 
            }
            else {
                info[list[i]] = $((`.modal-create-subject input[name="${key[i]}"]`)).value
                data[`${list[i]}`] = info[list[i]]
            }
        }
        createSubject(data)
        createSubModal.classList.remove('show-modal')
    }
}

const apiPostSubject = 'https://103.69.193.30.nip.io/subject/create'
function createSubject(data) {
    fetch(apiPostSubject, {
        method: "POST",
        //     mode: "cors", // no-cors, *cors, same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "include", // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        //     redirect: "follow", // manual, *follow, error
        //     referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    })
        .then(function (response) {
            response.json();
        })
        .then(() => {
            getSubject()
        })
        .catch(e => {
            console.log(e)
        })
}


const apiGetSalary = 'https://103.69.193.30.nip.io/salary/get'
function getSalary() {
    fetch(apiGetSalary)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                dataListSalary = [...response.data]
            }
        })
        .catch(e => {
            console.log(e)
        })
}

const apiGetStandarSalary = 'https://103.69.193.30.nip.io/salary/getStandardSalary'
function getStandarSalary() {
    fetch(apiGetStandarSalary)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                $((`.modal-body input[name="input-payroll"]`)).value = response.data.standardSalary;
                $((`.modal-body input[name="create-payroll"]`)).value = response.data.createdAt.slice(0, 10);;
                $((`.modal-body input[name="update-payroll"]`)).value = response.data.updatedAt.slice(0, 10);;
            }
        })
        .catch(e => {
            console.log(e)
        })
}


function run() {
    getTeacher();
    handleAddTeacher()
    getClass()
    getSubject()
    handleAddClass()
    handleAddSubject()
    getSalary()
    getStandarSalary()
}

run();
