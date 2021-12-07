const windowLocationSplittedArray = window.location.href.split('/');
const TeacherID = windowLocationSplittedArray[windowLocationSplittedArray.length - 1]
const tBody = document.getElementById('tBodyHorarios')
const dayDropDown = document.getElementById('dayDropdown')
const locationDropdown = document.getElementById('locationDropdown')

let inMemorySchedules = []

const getTeacherSchedules = async () => {
    const API = "/api/listall";
    const response = await fetch(API)
    const schedules = await response.json();
    const TeacherSchedules = schedules.filter(s => s.fk_maestro == TeacherID)
    inMemorySchedules = TeacherSchedules;
    return TeacherSchedules;
}

dayDropDown.addEventListener('click',async(e)=>{
    if(e.target.textContent == "Todo"){
        await renderTable(inMemorySchedules)
        return
    }
    const filteredByDaySchedules = await filterByDay(e.target.textContent)
    if(filteredByDaySchedules.length > 0){
        await renderTable(filteredByDaySchedules)
    }else{
        tBody.innerHTML =`<tr><h5 class="mt-3">Este maestro no cuenta con horarios el dia ${e.target.textContent}.</h5></tr>`
    }
    
})

locationDropdown.addEventListener('click', async(e)=>{
    if(e.target.textContent == "Todo"){
        await renderTable(inMemorySchedules)
        return
    }
    const filteredByLocationSchedules = await filterByLocation(e.target.textContent.split(' ')[1])
    if(filteredByLocationSchedules.length > 0){
        await renderTable(filteredByLocationSchedules)
    }else{
        tBody.innerHTML =`<tr><h5 class="mt-3">Este maestro no cuenta con horarios en el ${e.target.textContent}.</h5></tr>`
    }
})





const filterByDay = async (day) =>{
    const schedulesByDay = inMemorySchedules.filter(s=> s.dia == day)
    return schedulesByDay;
}
const filterByLocation = async (char)=> {
    const schedulesByLocation = inMemorySchedules.filter((s) => s.ubicacion.startsWith(char))
    return schedulesByLocation;
}

const renderTable = async(horarios)=>{
    tBody.innerHTML =""
    horarios.map(h =>{
        tBody.innerHTML += `
        <tr>
            <td>${h.dia}</td>
            <td>${h.rangohoras}</td>
            <td>${h.ubicacion}</td>
        </td>
        
        `
    })
}





window.onload = async ()=> {
 await renderTable(await getTeacherSchedules())
}