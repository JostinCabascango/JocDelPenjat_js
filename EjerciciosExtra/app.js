// Función que invierte un numero
function numeroInverso(numero) {
    const numeroInvertido = numero.toString().split("").reverse().join("");
    return parseInt(numeroInverso);
}
// Función que pide un numero al usuario
function obtenerNumeroDelUsuario() {
    const numero = parseInt(prompt("Introduce un numero"));
    return numero;
}
// Función que comprueba si una cadena es palindromo
function isPalindrome(str) {
    const strInvertido = str.split("").reverse().join("")
    return str == strInvertido;

}
// Función que pide una cadena al usuario
function obtenerCadenaDelUsuario() {
    let cadena = prompt('Introduzca una palabra o frase');
    return cadena;
}
// Función que muestra un menú de opciones para elegir el ejercicio
function mostrarMenuDeOpciones() {
    console.log(`Elige la operación a realizar:
    1- Invertir un número.
    2- Verificar si una cadena es un palíndromo.
    3- Obtener todas las subcadenas de la cadena original.
    4- Salir del programa.`);
}

// Función que obtiene todas las subcadenas de una cadena
function obtenerSubcadenas(cadena) {
    let subcadenas = [];
    for (let i = 0; i < cadena.length; i++) {
        for (let j = i + 1; j <= cadena.length; j++) {
            subcadenas.push(cadena.slice(i, j));
        }
    }
    return subcadenas;
}

// Función principal
function main() {
    mostrarMenuDeOpciones();
    let eleccion;
    do {
        eleccion = parseInt(prompt("Elige una opción"));
        switch (eleccion) {
            case 1:
                const numero = obtenerNumeroDelUsuario();
                if (!isNaN(numero)) {
                    alert(`El numero invertido de ${numero} es ${invertirNumero(numero)}`);
                } else {
                    alert("No has introducido un número válido");
                }
                break;
            case 2:
                const cadena = obtenerCadenaDelUsuario();
                if (cadena) {
                    alert(`${cadena} ${esPalindromo(cadena) ? "es" : "no es"} un palíndromo`);
                } else {
                    alert("No has introducido una cadena válida");
                }
                break;
            case 3:
                const cadenaSub = obtenerCadenaDelUsuario();
                if (cadenaSub) {
                    alert(`Las subcadenas son ${obtenerSubcadenas(cadenaSub)}`);
                } else {
                    alert("No has introducido una cadena válida");
                }
                break;
            case 4:
                alert("Saliendo del programa");
                break;
            default:
                alert("Opción no válida");
        }
    } while (eleccion !== 4);
}

main();
