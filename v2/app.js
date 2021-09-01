let tasks = []

function update_storage(){
    sessionStorage.setItem('list',JSON.stringify(tasks))
}

function add(){
    InputValue = document.getElementById("textinput")
    checkbox = `<input class="checkmark" type="checkbox" onClick="update_check(this.parentElement)">` //done logic
    deletebutton = `<button class="btn delete" onClick="remove(this.closest('li'))"><i class="far fa-trash-alt"></i></button>` //delete logic
    sharebutton = `<button class="btn primary" onClick="share(this.closest('li'))"><i class="far fa-share-square"></i></button>` //share logic
    copybutton = `<button class="btn primary" onClick="copy(this.closest('li'))"><i class="far fa-copy"></i></button>` //copy logic
    var Li = document.createElement("li")
    id = tasks.length === 0 ? 0 : tasks[tasks.length -1].id + 1
    tasks.push({
        id: id,
        taskName: InputValue.value,
        done: false,
        geo: null
    })
    Li.setAttribute("id", id)
    Li.setAttribute("class","list-item")
    Li.innerHTML = `<div class="check-and-text">${checkbox} <p class='text'>${InputValue.value}</p></div> <div>${copybutton + sharebutton + deletebutton}</div>`
    var mylist = document.getElementById("mylist")
    mylist.prepend(Li)
    InputValue.value = null
    update_storage()
}

function remove(Li){
    Li.remove()
    tasks.splice(tasks.findIndex(a => a.id == Li.id), 1)
    update_storage()
}

function update_check(div){
    div.classList.toggle('checked')
    Li = div.closest('li')
    index = tasks.findIndex(a => a.id == Li.id)
    tasks[index].done = tasks[index].done ? false : true
    update_storage()
}

function toggleFullscreen(button) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        button.innerHTML = '<i class="fas fa-compress fa-lg"></i>';
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        button.innerHTML = '<i class="fas fa-expand fa-lg"></i>';
    }
}

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

function copy(Li){
    const taskContent = Li.getElementsByClassName("text")[0].textContent
    navigator.clipboard.writeText(taskContent).then(() => window.alert("tarea copiada 📋"))
}