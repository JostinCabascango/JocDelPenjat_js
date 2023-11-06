// Variables globales para el juego del ahorcado
let palabra = "";
let intentos = 0;
const maxIntentos = 7;
let letrasUsadas = [];
let totalPartidasJugadas = 0;
let palabraSecreta = "";
let victorias = 0;
let derrotas = 0;
const imagenes = [
    "img/penjat/penjat_0.png",
    "img/penjat/penjat_1.png",
    "img/penjat/penjat_2.png",
    "img/penjat/penjat_3.png",
    "img/penjat/penjat_4.png",
    "img/penjat/penjat_5.png",
    "img/penjat/penjat_6.png",
]
let imagenActual = imagenes[0];
// Obtener elementos del DOM 
const juegoAhorcado = document.getElementById("jocPenjat");
const abecedario = document.getElementById("abecedari");
const imagenAhorcado = document.getElementById("imatgePenjat");
const letrasUtilizidas = document.getElementById("lletresUtilitzades");
const contenidoAlerta = document.getElementById("alertContainer");

// Funcion para iniciar una nueva partida
function nuevaPartida() {
    // Incrementamos el numero de partidas
    totalPartidasJugadas++;
    // Pedimos una palabra al usuario
    palabra = prompt("Introduce la palabra secreta").toLowerCase();
    mostrarAbecedario();
}
// Funcion para gestionar el click de una letra
function clickLetra(letra) {
    // Si la letra ya ha sido usada, no hacemos nada
    if (letrasUsadas.includes(letra)) {
        return;
    }
    // Añadimos la letra a la lista de letras usadas
    letrasUsadas.push(letra);
    // Si la letra no esta en la palabra, incrementamos el numero de intentos
    if (!palabra.includes(letra)) {
        intentos++;
    }
}
// Funcion para actualizar la interfaz del juego
function actualizarInterfaz() {
    

}
// Funcion para mostrar el abecedario con botones de la A-Z
function mostrarAbecedario() {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < letras.length; i++) {
        const letra = letras[i];
        const boton = document.createElement("button");
        // Dar estilos al boton 
        boton.classList.add("btn", "btn-outline-dark", "m-2");
        boton.textContent = letra;
        boton.addEventListener("click", function () {
            clickLetra(letra);
        });
        abecedario.appendChild(boton);
    }
}
// Funcion para mostrar la imagen del ahorcado
function mostrarImagenAhorcado() {
    imagenAhorcado.src = imagenes[intentos];

}
// Funcion para reinciar el juego
function reiniciarJuego() {
    // Reiniciamos las variables globales
    palabra = "";
    intentos = 0;
    letrasUsadas = [];
    palabraSecreta = "";
    imagenActual = imagenes[0];
    imagenAhorcado.src = imagenes[imagenActual];
    // Reiniciamos la interfaz
    actualizarInterfaz();

}
