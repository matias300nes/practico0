function add(){
    InputValue = document.getElementById("textinput")
    checkbox = `<input class="checkmark" type="checkbox" onClick="this.parentElement.classList.toggle('checked')">` //done logic
    deletebutton = `<button class="btn delete" onClick="this.closest('li').remove()"><i class="far fa-trash-alt"></i></button>` //delete logic
    sharebutton = `<button class="btn primary" onClick="share(this.closest('li'))"><i class="far fa-share-square"></i></button>` //delete logic
    copybutton = `<button class="btn primary" onClick="copy(this.closest('li'))"><i class="far fa-copy"></i></button>` //delete logic
    var Li = document.createElement("li")
    Li.setAttribute("class","list-item")
    Li.innerHTML = `<div class="check-and-text">${checkbox} <p class='text'>${InputValue.value}</p></div> <div>${copybutton + sharebutton + deletebutton}</div>`
    var mylist = document.getElementById("mylist")
    mylist.prepend(Li)
    InputValue.value = null
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