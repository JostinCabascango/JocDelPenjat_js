// Variables globals per a comptar les victòries, les derrotes i el total de partides
let VICTORIA = 0;
let DERROTA = 0;
let TOTAL_PARTIDES = 0;

// Funció per iniciar el joc
function iniciarJoc(){
    TOTAL_PARTIDES=TOTAL_PARTIDES+1;
    // Demanar la paraula secreta i convertir-la a minúscules
    let paraulaSecreta = prompt("Introdueix una paraula").toLowerCase();
    // Obtenir la longitud de la paraula secreta
    let longitudParaula = paraulaSecreta.length;
    // Crear la paraula actual amb guions baixos
    let paraulaActual = "_ ".repeat(longitudParaula);
    console.log(paraulaActual);
    // Establir els intents màxims i els fallats
    let intentsMaxims = 7;
    let intentsFallats = 0;
    // Crear un array per guardar les lletres fallades
    let lletresFallades = [];
    // Crear una variable booleana per controlar el bucle del joc
    let acabat = false;
    // Mentre no s'acabi el joc i no s'hagin esgotat els intents
    while (!acabat){
        // Demanar una lletra i convertir-la a minúscula
        let lletra = prompt("Introdueix una lletra").toLowerCase();
        // Si la lletra és correcta (una lletra i no un número o un símbol)
        if (validarLletra(lletra)){
            // Si la paraula secreta conté la lletra
            if (paraulaSecreta.includes(lletra)){
                console.log('Existeix la lletra' + lletra);
                // Substituir els guions baixos per la lletra correcta
                paraulaActual = substituirLletra(paraulaActual, paraulaSecreta, lletra);
                // Mostrar la paraula actual
                console.log(paraulaActual);
                // Si la paraula actual és igual a la paraula secreta, acabar el joc amb victòria
                if (paraulaActual === paraulaSecreta){
                    console.log("Has guanyat! La paraula era: " + paraulaSecreta);
                    VICTORIA++;
                    acabat = true;
                    menu();
                }
            }
            else {
                // Si la paraula secreta no conté la lletra, incrementar els intents fallats i afegir la lletra a l'array de lletres fallades
                console.log('No existeix la lletra ' + lletra);
                intentsFallats++;
                lletresFallades.push(lletra);
                console.log("Lletres fallades " + intentsFallats + "/" + intentsMaxims + ": " + lletresFallades.join(", "));
                // Si s'han esgotat els intents, acabar el joc amb derrota
                if (intentsFallats === intentsMaxims){
                    console.log("Has mort penjat. La paraula era: " + paraulaSecreta);
                    DERROTA++;
                    acabat = true;
                    menu();
                }
            }
        }
    }
}

// Funció de fletxa per validar que la lletra sigui correcta (una lletra i no un número o un símbol)
let validarLletra = lletra => lletra.length === 1 && lletra.match(/[a-z]/i);

// Funció per mostrar les estadístiques del joc
function estadistiques(){
    console.log(`Victòries: ${VICTORIA}`);
    console.log(`Derrotes: ${DERROTA}`);
    console.log(`Total de partides: ${TOTAL_PARTIDES}`);
    console.log(`Percentatge d'èxit: ${(VICTORIA/TOTAL_PARTIDES)*100}%`);
    console.log(`Percentatge d'error: ${(DERROTA/TOTAL_PARTIDES)*100}%`);
}

// Funció per mostrar el menú principal del joc
function menu(){
    // Demanar una opció al usuari
    let opcio = parseInt(mostrarOpcionsMenu());
    // Executar una acció segons la opció escollida
        switch (opcio) {
            case 1:
                // Iniciar una nova partida
                iniciarJoc();
                break;
            case 2:
                // Mostrar les estadístiques
                estadistiques();
                menu();
                break;
            case 3:
                // Sortir del joc
                break;
            default:
                // Mostrar un missatge d'error i tornar al menú
                console.log("Opció incorrecta");
                menu();
        }
}

// Funció anònima per mostrar les opcions del menú
function mostrarOpcionsMenu()
{
    return prompt(`1. Iniciar partida\n2. Estadístiques\n3. Sortir`);
}
// Funció per substituir els guions baixos per les lletres correctes
function substituirLletra(paraulaActual, paraulaSecreta, lletra){
    // Crear una variable per guardar el resultat
    let resultat = "";
    // Recórrer la paraula secreta i la paraula actual al mateix temps
    for (let i = 0; i < paraulaSecreta.length; i++){
        // Si la lletra de la paraula secreta és igual a la lletra introduïda, afegir-la al resultat
        if (paraulaSecreta[i] === lletra){
            resultat += lletra;
        }
        else {
            // Si no, afegir la lletra de la paraula actual al resultat
            resultat += paraulaActual[i];
        }
    }
    // Retornar el resultat
    return resultat;
}
