$(document).ready(function() {
    //=================================> 1-LLAMANDO A LA FUNCION "tipoDeDolar" <=================================
    tipoDeDolar("Dolar Oficial");

    //========> 2-BOTON "CALCULAR": VALIDA INPUTS Y LUEGO CALCULA GASTOS Y AHORRO A PARTIR DE INGRESOS <=========
    $("#boton-calcular").click(calcularVariables);

    function calcularVariables() {
        let inputNombre = $(".user-input").first().val();
        let inputIngresos = $(".user-input").last().val();

        if (inputNombre == "" || inputIngresos <= 0) {
            mostrarError();
        }
        else {
            //ESCONDE INPUTS Y BOTONES PARA MOSTRAR RESULTADOS
            $("#hide").slideUp(1000);            
            
            //PARA REMOVER RESULTADOS ANTERIORES (CUANDO SE CLICKEE EN RECALCULAR PARA VOLVER A INTENTARLO)
            $("#show").remove();
            
            //MUESTRA EL NOMBRE DEL USUARIO Y LOS AHORROS MINIMOS Y GASTOS MAXIMOS SEGUN INGRESOS 
            mostrarGastoAhorro(inputNombre, inputIngresos);
            
            //BOTON RECALCULAR
            $("#boton-recalcular").click(recalcular);

            //ALMACENA LOS VALUE DE LOS INPUTS EN LOCAL STORAGE
            toLocalStorage(inputNombre, inputIngresos);
        }

    }

    //LUEGO DE PRESIONAR EL BOTON "RECALCULAR": ESCONDE LOS RESULTADOS Y PERMITE VOLVER A CALCULAR VARIABLES
    function recalcular() {
        $("#show").slideUp(1000);
        setTimeout(() => {$("#hide").slideDown(1200)}, 1300);
    };
    //=========================> 3-SIMULAR ENVIO DE MAIL CON INFORMACION DE LOS CURSOS <=========================
    
    $("#enviar-mail").click(function(){
        $("#div-mail").slideUp(2000);
        setTimeout(() => {$("#mensaje-mail").fadeIn(1000)}, 2000);
    });
    $("#reenviar-mail").click(function(e){
        e.preventDefault();
        $("#mensaje-mail").slideUp(2000);
        setTimeout(() => {$("#div-mail").fadeIn(2000)}, 2200);
    });

    //============================================> 4-BOTON IR ARRIBA <============================================

    $("#arriba").click( function(e) { 
        e.preventDefault();
        $("html, body").animate({scrollTop: "0px"}, 1000)});
    $(window).scroll(function () {
        if($(this).scrollTop() > 400) {
            $("#arriba").slideDown(300);
        }
        else {
            $("#arriba").slideUp(300);
        }
    });
});