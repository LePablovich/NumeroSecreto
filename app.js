//Declaramos variables:
let numeroSecreto = 0; /*Variable en la que se guardará el número secreto.*/
let intentos = 0; /*Aumentará en +1 con cada intento que haga el usuario.*/
let NumerosSorteadosArray = []; /*Aquí se almacenarán los números alatoreos de cada ronda.*/
let numeroMaximo = 10; /*El valor más alto que se puede generar o ingresar.*/
let intentosMin = 100; // Inicializamos intentosMin con un valor alto

/*Para poder asignarle un texto a elementos de manera dinámica como a h1 y p.*/
function asignarTexoElemento(elemento, texto){ /*"elemento" y "texto" pasarían a ser dos variables que pueden guardar cualquier cosa, 
                                                pero en nuestro caso lo usaremos para poder guardar un elemento de html (como h1 y p) y un texto.
                                                EJEMPLO DE USO: asignarTexoElemento('h1', 'Juego del Número Secreto!');*/
    //Definición de variable:
    let elementoHTML = document.querySelector(elemento); /*Selecciono la variable "elemento" para asignarle un texto.*/
    
    elementoHTML.innerHTML = texto; /*Se asigna el contenido HTML especificado por la variable "texto" al elemento seleccionado por "elementoHTML".*/
    return;
}

function textoInicial (){ /*Función que pondrá el texto inicial de la página:*/
    asignarTexoElemento('h1', 'Bienvenido al juego del número secreto!');
    asignarTexoElemento('p', `Ingresa un número del 1 al ${numeroMaximo}`);
    return;
}

function generarNumeroSecreto(){ /*Función que va a generar un número secreto alatoreo entre 1 y 10.*/
    let numeroAlatoreo = Math.floor(Math.random()*numeroMaximo)+1; /*Math.floor es para hacer un número entero, el .random es para que sea al azar, multiplicandolo por "numeroMaximo" que es 10 para que sea entre el 10 y el 10 y +1 para que lo haga del 1 al 10.*/
    numeroSecreto = numeroAlatoreo; /*Igualamos "numeroSecreto" con el "numeroAlatoreo" generado.*/
    NumerosSorteados(NumerosSorteadosArray, numeroAlatoreo); /*Función que agregará el número a la lista de números sorteados y así no se repitan números.*/
    return numeroAlatoreo; /*Devolvemos el valor de numeroAlatoreo para que otra función pueda hacer uso de ella.*/
}

function NumerosSorteados(NumerosSorteadosArray, numeroAlatoreo){ /*Función que almacenará los números ya sorteadso en un array y así no se repitan.
                                                                    Nota: Estoy llamando a las variables "NumerosSorteadosArray" y "numeroAleatoreo" como parámetros
                                                                    ya que no son variables globales.*/
    if(NumerosSorteadosArray.length == numeroMaximo){ /*Si el tamaño del array es 10:*/
        asignarTexoElemento('h1', '¡FELICIDADES HAS GANADO!');
        asignarTexoElemento('p', 'Ya se han sorteado todos los números disponibles.');
        //Deshabilito los dos botones para que no se pueda jugar o tirar de nuevo:
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    }else{ /*De lo contrario:*/
        if(NumerosSorteadosArray.includes(numeroAlatoreo)){ /*Si "numeroAlatoreo" ya existe en el array:*/
            generarNumeroSecreto(); /*Generamos otro número aleatoreo.*/
        }else{
            NumerosSorteadosArray.push(numeroAlatoreo); /*Se agrega al array el valor entre paréntesis.*/
            // También actualizamos el número secreto aquí:
            numeroSecreto = numeroAlatoreo;
            return numeroAlatoreo;   /*Devolvemos el valor de numeroAlatoreo para que otra función pueda hacer uso de ella.*/      
        }
    }
}

function limpiarCaja(){ /*Función que va a dejar en blanco la caja donde el usuario pone su número, de esa manera es más comodo el sistema.*/
    document.querySelector('#valorUsuario').value = ''; /* Seleccionamos la caja gracias a la clase "valorUsuario" que le |1imos en "index.html".*/
}

function verificarIntento(){ /*Función que va a verificar si el número que ingresó el usuario es el número secreto.*/
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value); /*Accedemos al valor (.value) ingresado en el elemento con el id "valorUsuario".*/

    if(numeroUsuario === numeroSecreto) { /*Si el usuario acierta:*/
    asignarTexoElemento('p', `Buen trabajo! Acertaste en solo ${intentos} ${(intentos === 1) ? 'intento!' : 'intentos!'}`); /*Si "intentos" = 1, entonces (?) se imprime 'intento!', de lo contrario (:) se imprime 'intentos!'.*/
    document.getElementById('reiniciar').removeAttribute('disabled'); /*Tomamos el elemento con el id "reiniciar" que es el botón para reiniciar el juego y le quitamos el atributo 'disabled' para que pueda funcionar.*/
    score('.score', 'intentosScore'); /*Llamamos a la función de score para guardar el número de intentos una vez que ya se logró acertar.
                                        Nota: al poner un punto como '.score' busca el elemento con la clase "score".*/
    } else{ /*Si el usuario falla:*/
        if(numeroUsuario > numeroSecreto){
            asignarTexoElemento('p', 'El número secreto es menor.');
        } else {
            asignarTexoElemento('p', 'El número secreto es mayor.');
        }
        intentos++ /*Los intentos aumentan cada vez que el usuario FALLA.*/       
        limpiarCaja(); /*Función para limpiar la caja donde se pone el número.*/
    }
    return;
}

function nuevoJuego(){ /*Función que reinicia el sistema (sería como darle al F5).*/
    textoInicial(); /*Volvemos a poner el texto inicial de bienvenida.*/
    generarNumeroSecreto(); /*Volvemos a generar un número secreto aleatorio.*/
    limpiarCaja(); /*Limpiamos la caja del número del usuario.*/
    intentos = 1; /*Comienza el primer intento.*/
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); /*Tomamos un elemento con el id "reiniciar" para añadirle el atributo y lo confirmamos con 'true'.
                                                                            Nota: Se puede hacer también usando 'document.getElementById' y así ya no necesitamos poner '#reiniciar' si no solo
                                                                            'reiniciar'. Ya que usando 'document.querySelector' es para seleccionar una etiqueta, como un párrafo (p), título (h1), etc.*/                                                                       
}

function score(elementoScore, claseScore) { /*Función que va a guardar la cantidad de intentos mínimos para acertar.*/
    if (intentos < intentosMin) { /*Si la cantidad de "intentos" es menor a "intentosMin":*/
        intentosMin = intentos;
        let elementoHTMLScore = document.querySelector(`${elementoScore} .${claseScore}`); /*Va a seleccionar un elemetno y una clase, esto último se consigue con el ".${claseScore}" poniendo ese punto adelante.*/
        elementoHTMLScore.innerHTML = `Intentos mínimos: ${intentosMin}`; /*Texto que se pondrá.*/   
    }
    return intentosMin; /*Retornamos "intentosMin" para que sea visible en el HTML.*/
}

nuevoJuego ();