let tasks = []
let geo = null

//actualiza las tareas almacenadas con valores actuales
function update_storage(){
    sessionStorage.setItem('list',JSON.stringify(tasks))
}

//Muestra una tarea en la lista
function display_task(task){
    checkbox = `<input class="checkmark" type="checkbox" onClick="update_check(this.parentElement)" ${task.done ? 'checked':''}>` //done logic
    deletebutton = `<button class="btn delete" onClick="remove(this.closest('li'))"><i class="far fa-trash-alt"></i></button>` //delete logic
    sharebutton = `<button class="btn primary" onClick="share(this.closest('li'))"><i class="far fa-share-square"></i></button>` //share logic
    copybutton = `<button class="btn primary" onClick="copy(this.closest('li'))"><i class="far fa-copy"></i></button>` //copy logic
    Li = document.createElement("li")
    Li.setAttribute("id", task.id)
    Li.setAttribute("class","list-item")
    Li.innerHTML = `<div class="check-and-text ${task.done ? 'checked': ''}">${checkbox} <p class='text'>${task.taskName}</p></div> <div>${copybutton + sharebutton + deletebutton}</div>`
    mylist = document.getElementById("mylist")
    mylist.prepend(Li)
}

//Añade una tarea
function add(){
    InputValue = document.getElementById("textinput")
    id = tasks.length === 0 ? 0 : tasks[tasks.length -1].id + 1
    tasks.push(task = {
        id: id,
        taskName: InputValue.value,
        done: false,
        geo: geo
    })
    display_task(task)
    InputValue.value = null
    update_storage()
}

//Elimina una tarea
function remove(Li){
    Li.remove()
    tasks.splice(tasks.findIndex(a => a.id == Li.id), 1)
    update_storage()
}

//Actualiza el estado de una tarea
function update_check(div){
    div.classList.toggle('checked')
    Li = div.closest('li')
    index = tasks.findIndex(a => a.id == Li.id)
    tasks[index].done = tasks[index].done ? false : true
    update_storage()
}

//Pantalla completa
function toggleFullscreen(button) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        button.innerHTML = '<i class="fas fa-compress fa-lg"></i>';
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        button.innerHTML = '<i class="fas fa-expand fa-lg"></i>';
    }
}

//Compartir tarea
function share(Li){
    const taskContent = Li.getElementsByClassName("text")[0].textContent
    navigator.share({
        title: "Tarea compartida desde mi app:",
        text: taskContent,
        url: document.URL
    }).then(
        () => console.log("tarea compartida...")
    ).catch(
        () => window.alert("ups, algo salio mal ❗")
    )
}

//Copiar al Clipboard
function copy(Li){
    const taskContent = Li.getElementsByClassName("text")[0].textContent
    navigator.clipboard.writeText(taskContent).then(() => window.alert("tarea copiada 📋"))
}

//Carga los datos necesarios una vez iniciada la pagina
window.onload = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            geo = {lat: position.coords.latitude, lon: position.coords.longitude}
        });
    }
    response = JSON.parse(sessionStorage.getItem('list'))
    tasks = response == null ? [] : response
    tasks.map((task) => {display_task(task)})
}
