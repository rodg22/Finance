//=========================== DECLARACION DE ARRAY "cursosFinance" ===========================

const cursosFinance = [];

//=========================== CONSTRUCCION DE OBJETO "CursoFinance" ===========================

class CursoFinance {
    constructor(id, titulo, objetivos, precio) {
        this.id = id;
        this.titulo = titulo;
        this.objetivos = objetivos;
        this.precio = precio;
    }
    //15% de descuento en el precio del curso
    precioDescuento(){
        this.precioDescuento = this.precio * 0.85;
    }
}

//================================ PUSHEANDO CURSOS AL ARRAY ================================

cursosFinance.push(
    new CursoFinance(1, `"Saliendo de las deudas"`, "Tendrás el camino claro para salir de tus deudas con un método paso a paso.", 80),
    new CursoFinance(2, `"Tu sueldo alcanza y sobra"`, "Podrás ahorrar y tendrás claros tus objetivos financieros.", 100),
    new CursoFinance(3, `"Convivir con las finanzas"`, "Vos y tu pareja/convivientes tendrán total control de sus finanzas.", 120),
    new CursoFinance(4, `"Ahora quiero invertir"`, "Invertirás lo ahorrado y sabrás gestionar tus inversiones.", 160),
    new CursoFinance(5, `"Criptoinversiones"`, "Gestionáras parte de tus inversiones en una cartera crypto.", 300),
    new CursoFinance(6, `"De emprendedor a empresario"`, "Lograrás la transición entre finanzas de emprendedor y finanzas de empresa.", 440),
);

//==================== CALCULO DEL 15% DE DESCUENTO EN TODOS LOS PRECIOS DE LOS CURSOS ====================

for (descuento of cursosFinance) {
    descuento.precioDescuento();
}