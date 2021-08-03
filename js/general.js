//==================================== PARA CALCULAR TIPO DE CAMBIO DOLAR VENTA ===================================

//URL PARA EXTRAER COTIZACIONES DEL DOLAR
const URL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

//FUNCIONES PARA CALCULAR GASTO MAXIMO Y AHORRO MINIMO
const GASTOMAX = (ingresos) => ingresos * 0.8;
const AHORROMIN = (ingresos) => ingresos * 0.2;

//VARIABLE PARA GUARDAR EL TIPO DE CAMBIO DOLAR VENDEDOR EN UNA VARIABLE
let cotizacionDolarVenta;

//COTIZAR TIPO DE CAMBIO DOLAR VENDEDOR --> PARA PASAR EL PRECIO DE LOS CURSOS A PESOS ARGENTINOS
function tipoDeDolar(tipodedolar){
    $.get(URL, function(datos) {
        for(dato of datos) {
            if(dato.casa.nombre == tipodedolar) {
                //Redondeado al entero anterior
                cotizacionDolarVenta = parseInt(dato.casa.venta);
                agregarCursos();
            }
        }
    });
}

//=============================== AGREGANDO CURSOS AL CONTENIDO DE CURSOS-SECTION ===============================

function agregarCursos() {
    $("#cursos").addClass("contenedor-datos");
    
    for (const curso of cursosFinance) {
        //CREANDO LOS CONTENEDORES DE LOS CURSOS Y SU CONTENIDO
        $("#cursos").append(`<div id="div${curso.id}" class="contenedor-cursos div-datos">
                                <img src="recursos/imagenes/curso${curso.id}.jpg">
                                <h3 class="titulo-curso">${curso.titulo}</h3>
                                <p>${curso.objetivos}</p>
                                <div id="precio${curso.id}" style="display: none;">
                                    <p class="parrafo-tachado">US$ ${curso.precio} o $ars ${curso.precio*cotizacionDolarVenta}</p>
                                    <p class="parrafo-datos">US$ ${curso.precioDescuento} o $ars ${curso.precioDescuento*cotizacionDolarVenta}</p>
                                    <p class="parrafito-datos">**15% de descuento hasta el 31/08/21**</p>
                                </div>
                                <button id="btn-${curso.id}" class="mostrar-precio">ver precio</button>
                            </div>
                            `);

        //LUEGO DE CLICKEAR LOS BOTONES "ver precio": MUESTRA EL PRECIO DE C/CURSO CON SU DESCUENTO
        $(`#btn-${curso.id}`).click(function() {
            //Deshabilitar el boton ver precio
            $(`#btn-${curso.id}`).prop("disabled", true);
            if ($(`#btn-${curso.id}`).text() === "ver precio") {
                $(`#btn-${curso.id}`).text("ocultar precio");
            } else {
                $(`#btn-${curso.id}`).text("ver precio");
            }
            $(`#precio${curso.id}`).slideToggle(1000, function(){
                //Habilitar el boton ocultar precio
                $(`#btn-${curso.id}`).prop("disabled", false);
            })
        });
    }
}

//================================== PARA ALMACENAR DATOS DEL "Financer" EN EL LS =================================

function toLocalStorage(key, value) {
    localStorage.setItem(`Financer: ${key}`, value);
}

//=============================== MOSTRAR ERROR SI NO VALIDA INPUT NOMBRE E INGRESOS ==============================

function mostrarError() {
    $("#validador").css({"backgroundColor": "red",
                                 "width": "50%",
                                 "color": "white",
                                 "boxSizing": "border-box"})
                            .slideDown(300);
    setTimeout(() => {$("#validador").slideUp(300)}, 2000);
}

//================ MOSTRAR GASTOS Y AHORROS SEGUN INGRESOS --> APENDEA LOS RESULTADOS DEL CALCULO ================

function mostrarGastoAhorro(nombre, ingresos) {
    $("#datos-section").append(`
            <div id="show" style="display: none;">    
                <div>
                    <p class="parrafo-datos">${nombre.toUpperCase()}, recordá que tus gastos deberían ser como <span class="resaltar">máximo del 80%</span> y los ahorros <span class="resaltar">mínimo del 20%</span> de tus ingresos. Lo ideal sería que:</p>
                    <div class="div-datos">
                        <ul>
                            <li class="lista-datos temporal">Ahorro mínimo <span>$${AHORROMIN(ingresos)}</span></li>
                            <li class="lista-datos temporal">Gasto máximo <span>$${GASTOMAX(ingresos)}</span></li>
                        </ul>
                    </div>
                    <p class="parrafo-datos">¿Y? ¿Cómo venís con tus finanzas?</p>
                </div>
                <input id="boton-recalcular" class="cta-button" type="button" value="RECALCULAR">
            </div>`);
    setTimeout(() => {$("#show").slideDown(1000)}, 1100);
}