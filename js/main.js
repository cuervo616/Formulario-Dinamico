const claseDiv = "itemform";
const idForm = "form-dinamico";
var item = 0;
var numID_pregunta = 0;
var numID_respuesta = 0;
var preguntasID = [];
var respuestasID = [];
var itemID = [];

// Funciones principales
function generaID(tipo) {
    let id;
    if (tipo === "p") {
        numID_pregunta++;
        id = tipo + numID_pregunta;
        preguntasID.push(id);
    } else if (tipo === "s") {
        numID_respuesta++;
        id = tipo + numID_respuesta;
        respuestasID.push(id);
    } else if (tipo === "item") {
        item++;
        id = tipo + item;
        itemID.push(id);
    }
    return id;
}

function nuevaPregunta() {
    // Id de elementos nuevos
    var idPregunta = generaID("p");
    var idtipoRespuesta = generaID("s");
    var idItem = generaID("item");
    //------------------------------------
    // Nuevos elementos
    let formulario = document.getElementById(idForm);
    let pregunta = document.createElement("div");
    pregunta.innerHTML = `<input type="text" id="${idPregunta}" class="enunciado-pregunta" placeholder="Enunciado">
    <select id="${idtipoRespuesta}" name="tipo-respuesta" class="op-respuesta">
        <option value="0">Seleccione</option>
        <option value="1">Respuesta Abierta</option>
        <option value="2">Opciones</option>
        <option value="3">Casillas</option>
    </select><button type="button">Generar</button>`;
    //----------------------------------
    // Propiedades del div creado
    pregunta.id = idItem;
    pregunta.className = claseDiv;
    //---------------------------------
    formulario.append(pregunta); // Agregar el nuevo elemento al DOM

    // Escuchar el botón dentro de la pregunta creada
    pregunta.querySelector("button").addEventListener("click", tipoRespuesta);
}

function tipoRespuesta(event) {
    // Obtener el div contenedor del botón
    let divPregunta = event.target.parentElement;
    let valSelect = divPregunta.querySelector(".op-respuesta");
    //---------------------------------------------------------
    if (valSelect.value === "1") {
        const espacio = document.createElement("br");
        const desc = document.createElement("p");
        const txtRespuesta = document.createElement("input");
        txtRespuesta.type = "text";
        txtRespuesta.className = "ing-respuesta";
        desc.className = "enunciado";
        desc.value = "R. ";
        divPregunta.append(desc,espacio, txtRespuesta);
    } else if (valSelect.value === "2" || valSelect.value === "3") {
        const numOp = prompt("Ingrese el número de opciones: ");
        for (let j = 0; j < numOp; j++) {
            const espacio = document.createElement("br");
            const checkbox = document.createElement("input");
            const desc = document.createElement("input");
            desc.type = "text";
            desc.className = "enunciado"
            checkbox.type = valSelect.value === "2" ? "radio" : "checkbox";
            checkbox.className = "ing-respuesta";
            divPregunta.append(espacio, checkbox, desc);
        }
    }
    // Eliminar el elemento select si existe
    if (valSelect) {
        const btnGenerar = divPregunta.querySelector("button");
        divPregunta.removeChild(valSelect);
        divPregunta.removeChild(btnGenerar);
    }
}

function genearFormulario(){
    let titulo = document.createElement("h1");
    titulo.innerText = "FORMULARIO GENERADO";
    let enunciados = document.getElementsByClassName("enunciado-pregunta");
    let enun_opciones = document.getElementsByClassName("enunciado");
    //elementos para llenar las respuestas
    let elemto_respuesta = document.getElementsByClassName("ing-respuesta");
    //---------------------------
    let gen_formulario = document.getElementById("container-genform");
    gen_formulario.appendChild(titulo);
    for (let j = 0; j < enunciados.length; j++) {
        let enunciado = document.createElement("h3");
        enunciado.innerText = enunciados[j].value.trim(); // Usar .value para obtener el texto del input
        gen_formulario.appendChild(enunciado);

        // Recorrer las respuestas asociadas a este enunciado
        for (let z = 0; z < elemto_respuesta.length; z++) {
            // Comprobar si la respuesta pertenece al mismo enunciado
            if (elemto_respuesta[z].parentNode === enunciados[j].parentNode) {
                let enun_op = document.createElement("p");
                enun_op.innerText = enun_opciones[z].value.trim();
                gen_formulario.appendChild(enun_op);
                gen_formulario.appendChild(elemto_respuesta[z].cloneNode(true));
            }
        }
    }
}


// Listener para crear nueva pregunta
let btnCrear = document.getElementById("btn-crear");
btnCrear.addEventListener("click", nuevaPregunta);
let btnGenerarFrom = document.getElementById("btn-generar-form");
btnGenerarFrom.addEventListener("click",genearFormulario)


