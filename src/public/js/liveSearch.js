const cardsRow = document.getElementById('cardsRow')

const notesTitle = cardsRow.querySelectorAll('.card-title')     
const allNotes = cardsRow.querySelectorAll('.card')
const allCols = cardsRow.querySelectorAll('.card-col')
const txtSearch = document.getElementById('tableSearch')
txtSearch.addEventListener('keyup',()=>{
  for(let i = 0; i < allNotes.length; i++){
    if(txtSearch.value=="" || txtSearch.value == null){
      allNotes[i].classList.remove('d-none')
      allCols[i].classList.remove('d-none')
    }
    if(!notesTitle[i].textContent.toLowerCase().includes(txtSearch.value.toLowerCase())){
      allNotes[i].classList.add('d-none')
      allCols[i].classList.add('d-none')   
    }
  }
})