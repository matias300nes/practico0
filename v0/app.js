function add(){
    InputValue = document.getElementById("textinput")
    checkbox = `<input class="checkmark" type="checkbox" onClick="this.parentElement.classList.toggle('checked')">` //done logic
    deletebutton = `<button class="btn" onClick="this.parentElement.remove()"><i class="far fa-trash-alt"></i></button>` //delete logic
    var Li = document.createElement("li")
    Li.setAttribute("class","list-item")
    Li.innerHTML = `<div class="check-and-text">${checkbox + InputValue.value}</div>` + deletebutton
    var mylist = document.getElementById("mylist")
    mylist.appendChild(Li)
    InputValue.value = null
}