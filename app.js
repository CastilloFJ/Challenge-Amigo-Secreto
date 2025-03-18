// Función para asignar texto a elementos HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    }
}

asignarTextoElemento("h1", "Amigo Secreto");
asignarTextoElemento("h2", "Ingresa el nombre de tus amigos/as");

// Array para almacenar los nombres
let amigos = [];

// Función para agregar un nombre al array y mostrarlo en la lista
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim(); // Eliminar espacios en blanco al inicio y al final

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido."); //Aviso de nombre no válido
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista."); //Aviso de nombre repetido
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = ""; // Limpiar la caja input
    input.focus(); // Mantener el cursor en el input
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiar la lista antes de actualizar

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo;

        // Botón para eliminar un nombre de la lista
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.classList.add("delete-button");
        botonEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });

    // Activar o desactivar el botón de sorteo
    document.querySelector(".button-draw").disabled = amigos.length < 3;
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1); // Eliminar del array
    actualizarLista(); // Actualizar la lista en pantalla
}

// Función para mezclar el array (shuffle)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para sortear un solo amigo y mostrarlo por 15 segundos
function sortearAmigo() {
    if (amigos.length < 3) {
        alert("Se necesitan al menos 3 participantes para sortear.");
        return;
    }

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados anteriores

    // Mezclamos la lista y elegimos un nombre al azar
    let copiaAmigos = mezclarArray([...amigos]);
    let amigoSecreto = copiaAmigos[Math.floor(Math.random() * copiaAmigos.length)];

    // Mostrar mensaje con el nombre del amigo secreto
    let mensaje = document.createElement("p");
    mensaje.textContent = `🎉 El amigo secreto es: ${amigoSecreto} 🎉`;
    mensaje.classList.add("resultado-mensaje");
    resultado.appendChild(mensaje);

    // Desactivar el botón para evitar múltiples sorteos
    document.querySelector(".button-draw").disabled = true;

    // Reiniciar todo después de 10 segundos
    setTimeout(() => {
        resultado.innerHTML = ""; // Borrar mensaje
        amigos = []; // Reiniciar la lista de amigos
        actualizarLista(); // Limpiar la lista en pantalla
        document.querySelector(".button-draw").disabled = true; // Deshabilitar botón de sorteo
    }, 15000);
}

// Permitir agregar amigos con la tecla "Enter"
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});