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
const cajonLetrasUtilizidas = document.getElementById("cajonLetrasUtilizidas");

// Funcion para iniciar una nueva partida
function nuevaPartida() {
    // Incrementamos el numero de partidas
    totalPartidasJugadas++;
    // Pedimos una palabra al usuario
    reiniciarJuego();
    palabra = prompt("Introduce la palabra secreta").toLowerCase();
    mostrarAbecedario();
    mostrarPalabraSecreta();

}
// Funcion para gestionar el click de una letra
function clickLetra(letra) {
    // Si la letra ya ha sido usada, no hacemos nada
    if (letrasUsadas.includes(letra)) {
        const alerta = crearAlerta("alert-warning", `Ya has utilizado la letra ${letra}`);
        contenidoAlerta.appendChild(alerta);
        // Elimina la alerta después de 2 segundos
        setTimeout(() => {
            contenidoAlerta.removeChild(alerta);
        }, 1000);
        return;
    }
    // Añadimos la letra a la lista de letras usadas
    letrasUsadas.push(letra);
    // Si la letra no esta en la palabra, incrementamos el numero de intentos
    if (!palabra.includes(letra)) {
        intentos++;
    }
    actualizarInterfaz();

}
// Funcion para actualizar la interfaz del juego
function actualizarInterfaz() {
    mostrarLetrasUtilizadas();
    mostrarImagenAhorcado();
    actualizarPalabraSecreta();
    comprobarResultado();


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
    imagenActual = 0;
    imagenAhorcado.src = imagenes[imagenActual];
    abecedario.innerHTML = "";
    juegoAhorcado.innerHTML = ""
    cajonLetrasUtilizidas.innerHTML = ""
}
// Funcion para mostrar las letras utilizadas
function mostrarLetrasUtilizadas() {
    const cajonLetrasUtilizidas = document.getElementById("cajonLetrasUtilizidas");
    cajonLetrasUtilizidas.innerHTML = "";
    for (let index = 0; index < letrasUsadas.length; index++) {
        const letra = letrasUsadas[index];
        let boton = document.createElement("button");
        boton.textContent = letra;
        // Dar estilos al boton 
        if (palabra.includes(letra)) {
            boton.classList.add("btn", "btn-success", "m-2");
        }
        else {
            boton.classList.add("btn", "btn-danger", "m-2");
        }
        cajonLetrasUtilizidas.appendChild(boton);
    }

}
// Funcion que muestra las estadisticas del juego
function mostrarEstadisticas() {
    victorias = localStorage.getItem('victorias');
    derrotas = localStorage.getItem('derrotas');
    const porcentajeVictorias = calcularPorcentage(victorias, totalPartidasJugadas);
    const porcentajeDerrotas = calcularPorcentage(derrotas, totalPartidasJugadas);
    const ventanaNueva = window.open("", "VentanaNueva", "width=400,height=300");
    ventanaNueva.document.write("<h1>Estadísticas de Partidas</h1>");
    ventanaNueva.document.write(`<p>Total de partidas: ${totalPartidasJugadas}</p>`);
    ventanaNueva.document.write(`<p>Partidas ganadas (${porcentajeVictorias}%): ${victorias}</p>`);
    ventanaNueva.document.write(`<p>Partidas perdidas (${porcentajeDerrotas}%): ${derrotas}</p>`);
}
// Funcion para calcular el porcentage de victorias o de derrotas

function calcularPorcentage(valor, totalPartidasJugadas) {
    return (valor / totalPartidasJugadas) * 100;

}
// Funcion para mostrar los guiones bajos que representa u
function mostrarPalabraSecreta() {
    for (let index = 0; index < palabra.length; index++) {
        const element = "_";
        const span = document.createElement("span");
        span.classList.add("badge", "rounded-pill", "bg-light", "text-dark");
        span.style.fontSize = "2rem";
        span.style.margin = "1rem";
        span.textContent = element;
        juegoAhorcado.appendChild(span);
    }
}
// Función para mostrar la palabra secreta con guiones bajos y letras adivinadas
function actualizarPalabraSecreta() {
    palabraSecreta = "";
    juegoAhorcado.innerHTML = ""; // Limpiamos el juegoAhorcado
    for (let index = 0; index < palabra.length; index++) {
        const letra = palabra[index];
        const span = document.createElement("span");
        span.classList.add("badge", "rounded-pill", "bg-light", "text-dark");
        span.style.fontSize = "2rem";
        span.style.margin = "1rem";

        if (letrasUsadas.includes(letra)) {
            span.textContent = letra;
            palabraSecreta += letra;
        } else {
            span.textContent = "_";
        }

        juegoAhorcado.appendChild(span);
    }
}

// Funcion para crear una alerta de boostrap 5
function crearAlerta(clase, mensaje) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert", clase);
    alerta.textContent = mensaje;
    return alerta;

}
// Funcion para comprobar si el usuario ha ganado o ha perdido
function comprobarResultado() {
    if (palabra == palabraSecreta) {
        victorias++;
        const alerta = crearAlerta("alert-success", `Has ganado`);
        contenidoAlerta.appendChild(alerta);
        // Elimina la alerta después de 2 segundos
        setTimeout(() => {
            contenidoAlerta.removeChild(alerta);
        }, 2000);
        reiniciarJuego();
    }
    if (intentos === maxIntentos) {
        derrotas++;
        const alerta = crearAlerta("alert-danger", `Has perdido la palabra era ${palabra}`)
        contenidoAlerta.appendChild(alerta);
        // Elimina la alerta después de 2 segundos
        setTimeout(() => {
            contenidoAlerta.removeChild(alerta);
        }, 2000);
        reiniciarJuego();
    }
    localStorage.setItem('victorias', victorias);
    localStorage.setItem('derrotas', derrotas);
}
// Funcion para eliminar las estadisticas del usuario
function eliminarEstadisticas() {
    localStorage.removeItem('victorias');
    localStorage.removeItem('derrotas');
    localStorage.clear();
    const alerta = crearAlerta("alert-success", "Se ha borrado toda la informacion");
    contenidoAlerta.appendChild(alerta);
    setTimeout(() => {
        contenidoAlerta.removeChild(alerta);
    }, 2000);

}