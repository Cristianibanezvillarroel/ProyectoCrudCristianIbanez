class Usuario {
    constructor(name, email, address){
        this.name = name;
        this.email = email;
        this.address = address;
    }
}

function showData(){
    let usersList;
    if(localStorage.getItem('usersList') === null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    }

    let html = '';
    usersList.forEach((user, index) => {    
        html += `<div id="tabla-usuarios" class="row g-3">
                    <div class="col-xs-12 col-md-6 col-lg-4">${user.name}</div>
                    <div class="col-xs-12 col-md-6 col-lg-4">${user.email}</div>
                    <div class="col-xs-12 col-md-6 col-lg-4">${user.address}<button onclick="deleteData(${index})">Eliminar</button><button onclick="editData(${index})">Editar</button></div>
                 </div>`
    });
    document.querySelector('#tabla-general').innerHTML = html;
}

document.onload = showData();

function addData(event){
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let address = document.querySelector('#address').value;
    let usersList;
    if (name === "" || email === "" || address === "") return;

    let usuario = new Usuario(name, email, address);

    if(localStorage.getItem('usersList') === null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    }
    usersList.push(usuario);
    localStorage.setItem('usersList', JSON.stringify(usersList));
    showData();
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#address').value = '';

}

function editData(index){
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'block';
    if(localStorage.getItem('usersList') === null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    }
    document.querySelector('#name').value = usersList[index].name;
    document.querySelector('#email').value = usersList[index].email;
    document.querySelector('#address').value = usersList[index].address;

    document.getElementById('edit-btn').onclick = function (){
        usersList[index].name = document.querySelector('#name').value;
        usersList[index].email = document.querySelector('#email').value;
        usersList[index].address = document.querySelector('#address').value;
        localStorage.setItem('usersList', JSON.stringify(usersList));
        showData();
        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('edit-btn').style.display = 'none';
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#address').value = '';
    }
}

function deleteData(index){
    if(localStorage.getItem('usersList') === null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'));
    }
    usersList.splice(index,1);
    localStorage.setItem('usersList', JSON.stringify(usersList));
    showData();
}
