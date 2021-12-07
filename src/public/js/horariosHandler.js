
const salones = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8","A Lab. Ciencias Basicas","A Lab. Dibujo","A Sala Mtro 1", "A Sala Mtro 2", "A Lab. Computo", "B1", "B2", "B3", "B4", "B5","B Lab. Redes","B Lab. Resistencia de Materiales","B Taller Pesado 1","B Lab. Ingenieria Termica","B Lab. Motores Eléctricos","B Sala Mtro 1", "B Sala Mtro 2", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11","C Lab. de Computo","C Lab. de POO","C Lab. de Programacion","C Auditorio",  "C Sala Mtro 1", "C Sala Mtro 2"];
const windowLocationSplittedArray = window.location.href.split('/');
const fkTeacher = windowLocationSplittedArray[windowLocationSplittedArray.length - 1]
const tableBody = document.getElementById('tBodyTeacherSchedule')


const getTeacherSchedules = async (teacherId) => {
    const API = "/api/listall";
    const response = await fetch(API)
    const schedules = await response.json();
    const TeacherSchedules = schedules.filter(s => s.fk_maestro == teacherId)
    return TeacherSchedules;
}

const renderAllHoursSchedule = async () => {
    let hours = 15;
    for (let i = 0; i < hours; i++) {
        tableBody.innerHTML += `
        <tr id="trhour${i}">
            <td>          
                <input readonly id="inputhour${i}" type="text" value="${i + 7}:00 - ${i + 8}:00"  class="form-control form-control-sm  w-100" />          
            </td>
        </tr>
    `}
}
const addOptionsToAllDataList = () => {
    const datalists = document.querySelectorAll('datalist')
    datalists.forEach(dt => {
        salones.map(s => {
            const dtOption = document.createElement('option')
            dtOption.value = s
            dtOption.textContent = s
            dt.appendChild(dtOption)
        })
    })
}

const renderMondaySchedule = async () => {
    let day = "Lunes"
    const schedule = await getTeacherSchedules(fkTeacher);
    const monday = schedule.filter(s => s.dia === "Lunes")
    if (monday.length > 0) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const inputValue = tableBody.rows[i].children[0].children[0].value;
            const td = document.createElement('td')

            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>
        `
            for (let j = 0; j < monday.length; j++) {     
                
                if (monday[j].rangohoras == inputValue) {  
                    const saveBtn = document.getElementById(`savebtn${day}${i}`)
                    saveBtn.classList.add('d-none')
                    const zoneInput = document.getElementById(`inputzone${day}${i}`)
                    zoneInput.value = monday[j].ubicacion
                    tableBody.rows[i].children[1].classList.add('bg-success')
                    tableBody.rows[i].children[1].removeAttribute('onclick')
                    tableBody.rows[i].children[1].setAttribute('onclick', `removeSchedule(${monday[j].id},'${day}',${i})`)
                }
            }
        }
    } else {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const td = document.createElement('td')
            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>`
        }
    }
}

const renderTuesdaySchedule = async () => {
    let day = "Martes"
    const schedule = await getTeacherSchedules(fkTeacher);
    const tuesday = schedule.filter(s => s.dia === "Martes")
    if (tuesday.length > 0) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const inputValue = tableBody.rows[i].children[0].children[0].value;
            const td = document.createElement('td')

            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>
        `
            for (let j = 0; j < tuesday.length; j++) {
                if (tuesday[j].rangohoras == inputValue) {
                    const saveBtn = document.getElementById(`savebtn${day}${i}`)
                    saveBtn.classList.add('d-none')
                    const zoneInput = document.getElementById(`inputzone${day}${i}`)
                    zoneInput.value = tuesday[j].ubicacion
                    tableBody.rows[i].children[2].classList.add('bg-success')
                    tableBody.rows[i].children[2].removeAttribute('onclick')
                    tableBody.rows[i].children[2].setAttribute('onclick', `removeSchedule(${tuesday[j].id},'${day}',${i})`)
                }
            }
        }
    } else {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const td = document.createElement('td')
            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>`
        }
    }
}

const renderWednesdaySchedule = async () => {
    let day = "Miercoles"
    const schedule = await getTeacherSchedules(fkTeacher);
    const wednesday = schedule.filter(s => s.dia === "Miercoles")
    if (wednesday.length > 0) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const inputValue = tableBody.rows[i].children[0].children[0].value;
            const td = document.createElement('td')

            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>
        `
            for (let j = 0; j < wednesday.length; j++) {
                if (wednesday[j].rangohoras == inputValue) {
                    const saveBtn = document.getElementById(`savebtn${day}${i}`)
                    saveBtn.classList.add('d-none')
                    const zoneInput = document.getElementById(`inputzone${day}${i}`)
                    zoneInput.value = wednesday[j].ubicacion
                    tableBody.rows[i].children[3].classList.add('bg-success')
                    tableBody.rows[i].children[3].removeAttribute('onclick')
                    tableBody.rows[i].children[3].setAttribute('onclick', `removeSchedule(${wednesday[j].id},'${day}',${i})`)
                }
            }
        }
    } else {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const td = document.createElement('td')
            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>`
        }
    }
}

const renderThursdaySchedule = async () => {
    let day = "Jueves"
    const schedule = await getTeacherSchedules(fkTeacher);
    const thursday = schedule.filter(s => s.dia === "Jueves")
    if (thursday.length > 0) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const inputValue = tableBody.rows[i].children[0].children[0].value;
            const td = document.createElement('td')

            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>
        `
            for (let j = 0; j < thursday.length; j++) {
                if (thursday[j].rangohoras == inputValue) {
                    const saveBtn = document.getElementById(`savebtn${day}${i}`)
                    saveBtn.classList.add('d-none')
                    const zoneInput = document.getElementById(`inputzone${day}${i}`)
                    zoneInput.value = thursday[j].ubicacion
                    tableBody.rows[i].children[4].classList.add('bg-success')
                    tableBody.rows[i].children[4].removeAttribute('onclick')
                    tableBody.rows[i].children[4].setAttribute('onclick', `removeSchedule(${thursday[j].id},'${day}',${i})`)
                }
            }
        }
    } else {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const td = document.createElement('td')
            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>`
        }
    }
}

const renderFridaySchedule = async () => {
    let day = "Viernes"
    const schedule = await getTeacherSchedules(fkTeacher);
    const friday = schedule.filter(s => s.dia === "Viernes")
    if (friday.length > 0) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const inputValue = tableBody.rows[i].children[0].children[0].value;
            const td = document.createElement('td')

            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>
        `
            for (let j = 0; j < friday.length; j++) {
                if (friday[j].rangohoras == inputValue) {
                    const saveBtn = document.getElementById(`savebtn${day}${i}`)
                    saveBtn.classList.add('d-none')
                    const zoneInput = document.getElementById(`inputzone${day}${i}`)
                    zoneInput.value = friday[j].ubicacion
                    tableBody.rows[i].children[5].classList.add('bg-success')
                    tableBody.rows[i].children[5].removeAttribute('onclick')
                    tableBody.rows[i].children[5].setAttribute('onclick', `removeSchedule(${friday[j].id},'${day}',${i})`)
                }
            }
        }
    } else {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const td = document.createElement('td')
            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>`
        }
    }
}

const renderSaturdaySchedule = async () => {
    let day = "Sabado"
    const schedule = await getTeacherSchedules(fkTeacher);
    const saturday = schedule.filter(s => s.dia === "Sabado")
    if (saturday.length > 0) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const inputValue = tableBody.rows[i].children[0].children[0].value;
            const td = document.createElement('td')

            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>
        `
            for (let j = 0; j < saturday.length; j++) {
                if (saturday[j].rangohoras == inputValue) {
                    const saveBtn = document.getElementById(`savebtn${day}${i}`)
                    saveBtn.classList.add('d-none')
                    const zoneInput = document.getElementById(`inputzone${day}${i}`)
                    zoneInput.value = saturday[j].ubicacion
                    tableBody.rows[i].children[6].classList.add('bg-success')
                    tableBody.rows[i].children[6].removeAttribute('onclick')
                    tableBody.rows[i].children[6].setAttribute('onclick', `removeSchedule(${saturday[j].id},'${day}',${i})`)
                }
            }
        }
    } else {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const td = document.createElement('td')
            td.classList.add('hourtd')
            td.setAttribute("id", `td${day}${i}`)
            tableBody.rows[i].appendChild(td)
            td.innerHTML = `
            <div class="input-group mb-3">
                    <input id="inputzone${day}${i}" list="inputlist${day}${i}" type="text" class="form-control form-control-sm" placeholder="Ubicacion">
                    <datalist id="inputlist${day}${i}"></datalist>
                <div class="input-group-append">
                    <button id="savebtn${day}${i}" class="btn btn-info btn-sm" onclick="addSchedule(${fkTeacher},'${day}',${i})" required><i class="fas fa-check-square"></i></button>
                </div>
            </div>`
        }
    }
}

const removeSchedule = async (id, dia, nofila) => {

    const url = `/api/delete/${id}`
    const response = await fetch(url, {
        method: 'DELETE'
    })
    const results = await response.json()

    const td = document.getElementById(`td${dia}${nofila}`)
    const saveBtn = document.getElementById(`savebtn${dia}${nofila}`)
    td.classList.remove('bg-success')
    saveBtn.classList.remove('d-none')
    td.removeAttribute('onclick')
    saveBtn.removeAttribute('onclick')
    saveBtn.setAttribute('onclick', `addSchedule(${fkTeacher},'${dia}',${nofila})`)

}

const addSchedule = async (fk_maestro, dia, nofila) => {
    const inputHour = document.getElementById(`inputhour${nofila}`)
    const inputLocation = document.getElementById(`inputzone${dia}${nofila}`)
    const td = document.getElementById(`td${dia}${nofila}`)
    const saveBtn = document.getElementById(`savebtn${dia}${nofila}`)
    let regexForHours = /(0?[0-9]|1[0-9]|2[0-3]):\d\d - (0?[0-9]|1[0-9]|2[0-3]):\d\d/;
    if (inputLocation.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Ubicación vacia.',
            text: 'Asegurate de ingresar una ubicacion antes de guardar.',
        })
        return
    }
    if (!salones.includes(inputLocation.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Ubicación no valida.',
            text: 'La ubicación debe ser alguna de las contenidas en la lista.',
        })
        return
    }

    if (regexForHours.test(inputHour.value)) {
        const url = `/api/save/${fk_maestro}`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dia: dia,
                rangohoras: inputHour.value,
                ubicacion: inputLocation.value
            })
        })
        const results = await response.json();
        td.classList.add('bg-success')
        td.removeAttribute('onclick')
        const schedules = await getTeacherSchedules(fkTeacher)
        let lastSchedule = schedules[schedules.length - 1]
        td.setAttribute('onclick', `removeSchedule(${lastSchedule.id},'${dia}',${nofila})`)
        saveBtn.classList.add('d-none')

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hora no valida.',
            text: 'Asegurese de ingresar un formato de hora como se muestra en la primer columna.',
        })
    }

}


const renderAll = async () => {
    await renderMondaySchedule()
    await renderTuesdaySchedule()
    await renderWednesdaySchedule()
    await renderThursdaySchedule()
    await renderFridaySchedule()
    await renderSaturdaySchedule()
    addOptionsToAllDataList()
}

window.onload = async () => {
    renderAllHoursSchedule()
    await renderAll()
    document.querySelector("#sidebar").classList.toggle("active");
    document.querySelector("#content").classList.toggle("active")
}
