let numero_partidas=0;
let lose=0;
let win=0;
function menu(){
    let opcio = prompt("1. Iniciar un joc\n2. Estadístiques\n3. Sortir");
    switch (opcio){
        case "1":
            iniciarJoc();
            break;
        case "2":
            estadistiques();
            break;
        case "3":
            break;
        default:
            console.log("Opció incorrecta");
            menu();
    }
}
function iniciarJoc(){
    let paraula = prompt("Introdueix una paraula");
    let paraulaEncertada = false;
    let lletresFallades = 0;
    let lletresEncertades = 0;
    let lletres = [];
    let lletresEncertadesArray = [];
    let lletresFalladesArray = [];
    for (let i = 0; i < paraula.length; i++) {
        lletres[i] = paraula.charAt(i);
        lletresEncertadesArray[i] = "_";
    }
    while (!paraulaEncertada && lletresFallades < 7){
        let lletra = prompt("Introdueix una lletra");
        if (lletra.length === 1 && lletra.match(/[a-z]/i)){
            let encert = false;
            for (let i = 0; i < lletres.length; i++) {
                if (lletra === lletres[i]){
                    encert = true;
                    lletresEncertadesArray[i] = lletra;
                    lletresEncertades++;
                }
            }
            if (!encert){
                lletresFalladesArray[lletresFallades] = lletra;
                lletresFallades++;
            }
            console.log(lletresEncertadesArray);
            console.log("Lletres fallades " + lletresFallades + "/6: " + lletresFalladesArray);
            if (lletresEncertades === lletres.length){
                paraulaEncertada = true;
                console.log("Enhorabona, has encertat la paraula");
                win++;
            }

        }else{
            console.log("Lletra incorrecta");
        }
    }
    if (lletresFallades===7){
        console.log(`L'usuari mor penjat`);
        lose++;
    }
    numero_partidas++;
    menu();


}
function estadistiques(){
    console.log(`Total de partidas: ${numero_partidas}`);
    console.log(`Partides guanyades (50%): ${win}`);
    console.log(`Partides perdudes (50%): ${lose}`);

}
// Crear un botó per cada lletra de l'abecedari i que al clicar-lo es mostri per consola la lletra

function crearAbecedario(){
    let letrasDiv = document.getElementById("letrasDiv")
    for (let i = 65; i <= 90; i++) {
        let letra = String.fromCharCode(i);
        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-outline-dark ms-2";
        button.innerHTML = letra;
        button.addEventListener("click", function () {
            console.log(letra);
        })
        letrasDiv.appendChild(button);
    }

}
// Crear las lineas de la palabra a adivinar en el html con javascript
function crearLineas(){
    let palabra = document.getElementById("tableroDiv");
    let paraula = prompt("Introdueix una paraula");
    for (let i = 0; i < paraula.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = "_";
        span.className = "ms-2";
        span.style.fontSize = "50px";

        palabra.appendChild(span);
    }
}
crearAbecedario();
crearLineas();
