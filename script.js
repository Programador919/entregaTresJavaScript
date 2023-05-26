//Validar las entradas del formulario antes de enviar datos
function validateForm() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    if (name == "") {
        document.getElementById("formIndicator").classList.remove("hidden")
        document.getElementById("formIndicator").classList.add("show");
        document.getElementById("name").style.border ="5px solid rgb(255, 0, 0)";
        return false;
    } else {
        document.getElementById("formIndicator").classList.add("hidden");
        document.getElementById("name").style.border ="0px solid rgb(255, 0, 0)";
    }

    if (age == "") {
        document.getElementById("formIndicator").classList.remove("hidden");
        document.getElementById("formIndicator").classList.add("show");
        document.getElementById("age").style.border ="5px solid rgb(255, 0, 0)";
        return false;
    }
    else if (age < 18) {
        document.getElementById("formIndicator").classList.remove("hidden");
        document.getElementById("formIndicator").classList.add("show");
        document.getElementById("age").style.border ="5px solid rgb(255, 0, 0)";
        return false;
    } else {
        document.getElementById("formIndicator").classList.add("hidden");
        document.getElementById("age").style.border ="0px solid rgb(255, 0, 0)";
    }

    if (address == "") {
        document.getElementById("formIndicator").classList.remove("hidden");
        document.getElementById("formIndicator").classList.add("show");
        document.getElementById("address").style.border ="5px solid rgb(255, 0, 0)";
        return false;
    } else {
        document.getElementById("formIndicator").classList.add("hidden");
        document.getElementById("address").style.border ="0px solid rgb(255, 0, 0)";
    }

    if (email == "") {
        document.getElementById("formIndicator").classList.remove("hidden");
        document.getElementById("formIndicator").classList.add("show");
        document.getElementById("email").style.border ="5px solid rgb(255, 0, 0)";
        return false;
    } else if (!email.includes("@")) {
        document.getElementById("formIndicator").classList.remove("hidden");
        document.getElementById("formIndicator").classList.add("show");
        document.getElementById("email").style.border ="5px solid rgb(255, 0, 0)";
        return false;
    } else {
        document.getElementById("formIndicator").classList.add("hidden");
        document.getElementById("email").style.border ="0px solid rgb(255, 0, 0)";
    }

    return true;
}

//funcion para mostrar datos

function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Modificar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

//carga todos los datos cuando se carga el documento o la pagina 
document.onload = showData();

//funcion para agregar datos

function AddData() {
    // si el formulario es validado 
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;

        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

//funcion para eliminar datos del almacenamiento local

function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
            
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//funcion para actualizar datos, editar en el almacenamiento local

function updateData(index) {
    //El boton enviar se ocultara y el boton actualizar se mostrara para actualizar los datos en el almacenamiento local
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            //El boton de actualizacion se ocultara y el boton de enviar se mostrara 
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}