const url = "http://localhost:3000/tasks"
let geo = null
let root = document.querySelector(":root");

//Muestra una tarea en la lista
function display_task(task){
    checkbox = `<input class="checkmark" type="checkbox" onClick="update_check(this.parentElement)" ${task.done ? 'checked':''}>` //done logic
    deletebutton = `<button class="btn delete" onClick="remove(this.closest('li'))"><i class="far fa-trash-alt"></i></button>` //delete logic
    sharebutton = `<button class="btn primary" onClick="share(this.closest('li'))"><i class="far fa-share-square"></i></button>` //share logic
    copybutton = `<button class="btn primary" onClick="copy(this.closest('li'))"><i class="far fa-copy"></i></button>` //copy logic
    Li = document.createElement("li")
    Li.setAttribute("id", task._id)
    Li.setAttribute("class","list-item")
    Li.innerHTML = `<div class="check-and-text ${task.done ? 'checked': ''}">${checkbox} <p class='text'>${task.taskName}</p></div> <div>${copybutton + sharebutton + deletebutton}</div>`
    mylist = document.getElementById("mylist")
    mylist.prepend(Li)
}

//Añade una tarea
function add(){
    InputValue = document.getElementById("textinput")

    task = {
        taskName: InputValue.value,
        done: false,
        geo: geo
    }

    config = {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    }

    fetch(url, config)
        .then(response => response.json())
        .then(data => {
            display_task(data)
            InputValue.value = null
        })
        .catch((err) => {
            console.log(err)
        })
}

//Elimina una tarea
function remove(Li){
    config = {
        method:'DELETE',
    }
    fetch(`${url}/${Li.id}`, config)
        .then(response => {
            response.json()
            Li.remove()
        })
        .catch((err) => {
            console.log(err)
        })
}

//Actualiza el estado de una tarea
function update_check(div){
    div.classList.toggle('checked')
    Li = div.closest('li')
    config = {
        method:'PATCH',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({done: div.classList.contains('checked')})
    }
    fetch(`${url}/${Li.id}`, config)
        .then(response => response.json())
        .catch((err) => {
            console.log(err)
        })
}

//Pantalla completa
function toggleFullscreen(button) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        button.innerHTML = '<i class="fas fa-compress fa-lg"></i>'
    } else if (document.exitFullscreen) {
        document.exitFullscreen()
        button.innerHTML = '<i class="fas fa-expand fa-lg"></i>'
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

//scheme-color
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    if(newColorScheme === 'dark'){
        root.setAttribute("class", "dark-scheme")
        root.style.setProperty('--primary', '#222222');
        root.style.setProperty('--secondary', '#4E4E4E');
        root.style.setProperty('--font', '#FFFFFF');
    }else{
        root.setAttribute("class", "light-scheme")
        root.style.setProperty('--primary', '#FFFFFF');
        root.style.setProperty('--secondary', '#4E4E4E');
        root.style.setProperty('--font', '#222222');
    }
});

//Carga los datos necesarios una vez iniciada la pagina
window.onload = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute("class", "dark-scheme")
        root.style.setProperty('--primary', '#222222');
        root.style.setProperty('--secondary', '#4E4E4E');
        root.style.setProperty('--font', '#FFFFFF');
    }else{
        root.setAttribute("class", "light-scheme")
        root.style.setProperty('--primary', '#FFFFFF');
        root.style.setProperty('--secondary', '#4E4E4E');
        root.style.setProperty('--font', '#222222');
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            geo = {lat: position.coords.latitude, lon: position.coords.longitude}
        })
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            tasks = data == null ? [] : data
            console.log(tasks)
            tasks.map((task) => {display_task(task)})
        })
        .catch((err) => {
            console.log(err)
        })
}

