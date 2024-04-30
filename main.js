
let ultimoDatoAnterior = null; 
var cortinasAbiertas = false;

// Llamar a recibirDatos una vez al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    recibirPrimerosDatos();
});


async function recibirPrimerosDatos() {
    try {
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://66305f52c92f351c03d9aaa6.mockapi.io/identificacionOrden';
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        datosRecibidos = data;

        // Ejecutar la acción según el valor de focoRecamara
        if (data.focoRecamara === "0") {
            document.getElementById('focoRecamara').src = 'imágenes/lampararecamaraoff.png';
        } else if (data.focoRecamara === "1") {
            document.getElementById('focoRecamara').src = 'imágenes/focorecamaraon.png';
        }
        if (data.focoSala === "0") {
            document.getElementById('focoSala').src = 'imágenes/focoSalaOff.png';
        } else if (data.focoSala === "1") {
            document.getElementById('focoSala').src = 'imágenes/focosalaon.png';
        }

        if (data.focoJardin === "0") {
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/focojardinoff.png';
            }
        } else if (data.focoJardin === "1") {
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/lamparajardinOn.jpeg';
            }
        }

        if (data.ventilador === "0") {
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imágenes/ventiladortecho.png';
        } else if (data.ventilador === "1") {
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imágenes/ventiladorencendido.gif';
        }

        if (data.cortinas === "0") {
            cortinasAbiertas = false;
            var elementos = document.getElementsByClassName('cortinas');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/cortinascerradas.png';
            }
        } else if (data.cortinas === "1") {
            cortinasAbiertas = true;
            var elementos = document.getElementsByClassName('cortinas');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/cortinasabiertas.gif';
            }

        }

        if (data.alarma === "0") {
            document.getElementById('alarma').src = 'imágenes/alarmaencendida.jpg';
        } else if (data.alarma === "1") {
            document.getElementById('alarma').src = 'imágenes/alarma-apagada.png';
        }

        if (data.camaras === "0") {
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/camaraseguridadoff.png';
            }
        } else if (data.camaras === "1") {
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/camaraprendida.gif';
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


setInterval(recibirDatos, 2000);

async function recibirDatos() {
    try {
        // Opciones de la solicitud
        const opciones = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const url = 'https://662f2a4143b6a7dce30e8d09.mockapi.io/ordenes_por_voz_remotas';
        // Recibir los datos de la URL proporcionada
        const response = await fetch(url, opciones);

        if (!response.ok) {
            throw new Error('Error en la solicitud GET a la URL');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        // Arreglo
        datosRecibidos = data;
        // Último dígito del arreglo
        const ultimoDato = datosRecibidos.pop();
        console.log('Último dato:', ultimoDato);

        // Verifica si el último dato ha cambiado
        if (!esIgual(ultimoDato, ultimoDatoAnterior)) {
            // Sustitución en los párrafos
      
           
            manejarAccion(ultimoDato.orden);
            ultimoDatoAnterior = ultimoDato;
        }

        
        

    } catch (error) {
        console.error('Error:', error);
    }
}

function esIgual(objA, objB) {
    return JSON.stringify(objA) === JSON.stringify(objB);
}

function manejarAccion(ultimoDato) {
    //switch (ultimoDato.instruccion.toLowerCase()) {
    switch (ultimoDato) {
        case 'enciende la luz de la recámara':
            document.getElementById('focoRecamara').src = 'imágenes/focorecamaraon.png';
            break;
        case 'apaga la luz de la recámara':
            document.getElementById('focoRecamara').src = 'imágenes/lampararecamaraoff.png';
            break;
        case 'enciende la luz de la sala':
            document.getElementById('focoSala').src = 'imágenes/focosalaon.png';
            break;
        case 'apaga la luz de la sala':
            document.getElementById('focoSala').src = 'imágenes/focoSalaOff.png';
            break;
        case 'enciende las luces del jardín':
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/lamparajardinOn.jpeg';
            }
            break;
        case 'apaga las luces del jardín':
            var elementos = document.getElementsByClassName('focoJardin');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/focojardinoff.png';
            }
            break;
        case 'enciende el ventilador':
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imágenes/ventiladorencendido.gif';

            break;
        case 'apaga el ventilador':
            var imagen = document.getElementById('ventilador');
            imagen.src = 'imágenes/ventiladortecho.png';
            break;
        case 'abre las cortinas':
            if (!cortinasAbiertas){
                cambiarImagenCortinas();
                cortinasAbiertas = true;
            }
            break;
        case 'cierra las cortinas':
            if (cortinasAbiertas){
                cortinasAbiertas = false;
                cierraImagenCortinas();
            }
            break;
        case 'enciende las cámaras de seguridad':
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/camaraprendida.gif';
            }
            break;
        case 'apaga las cámaras de seguridad':
            var elementos = document.getElementsByClassName('camaras');
            for (var i = 0; i < elementos.length; i++) {
                elementos[i].src = 'imágenes/camara-apagada.png';
            }
            break;
        case 'enciende la alarma':
            document.getElementById('alarmaEncendida').play();     
            document.getElementById('alarma').src = 'imágenes/alarmaencendida.jpg';
            break;
        case 'apaga la alarma':
            document.getElementById('alarma').src = 'imágenes/alarma-apagada.png';
            document.getElementById('sonidoApagado').play(); 
            break;
        default:
            // Instrucción no reconocida
            console.log('Instrucción no reconocida');
    }
}

//var cortinasAbiertas = false;

function cambiarImagenCortinas() {
    // Obtener todas las imágenes de cortinas
    var elementos = document.getElementsByClassName('cortinas');

    // Iterar sobre cada imagen de cortinas
    for (var i = 0; i < elementos.length; i++) {
        // Utilizamos una función de cierre para mantener el contexto de la variable cortina
        (function (cortina) {
            // Verificar si la imagen actual ya ha mostrado el gif de abrirCortinas.gif
            if (!cortinasAbiertas) {
                // Mostrar abrirCortinas.gif si aún no se ha mostrado
                cortina.src = 'imágenes/cortinasabiertas.gif';

                // Cambiar a la imagen cortinasAbiertas.png después de 1 segundo
                setTimeout(function () {
                    cortina.src = 'imágenes/cortinasabiertas.jpg';
                }, 1016); // 1000 milisegundos = 1 segundo
            }
        })(elementos[i]); // Pasamos la imagen actual como argumento a la función de cierre
    }
}



var cortinasCerradas = false;

function cierraImagenCortinas() {
    // Obtener todas las imágenes de cortinas
    var elementos = document.getElementsByClassName('cortinas');

    // Iterar sobre cada imagen de cortinas
    for (var i = 0; i < elementos.length; i++) {
        // Utilizamos una función de cierre para mantener el contexto de la variable cortina
        (function (cortina) {
            // Verificar si la imagen actual ya ha mostrado el gif de abrirCortinas.gif
            if (!cortinasCerradas) {
                // Mostrar abrirCortinas.gif si aún no se ha mostrado
                cortina.src = 'imágenes/cerrarcortinasya.gif';

                // Cambiar a la imagen cortinasAbiertas.png después de 1 segundo
                setTimeout(function () {
                    cortina.src = 'imágenes/cortinasCerradas.png';
                }, 1016); // 1000 milisegundos = 1 segundo
            }
        })(elementos[i]); // Pasamos la imagen actual como argumento a la función de cierre
    }
}


