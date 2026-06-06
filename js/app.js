document.addEventListener("DOMContentLoaded", () => {

generarDashboard();

});

function generarDashboard(){

const html = `

<div class="card shadow-sm mt-4">

<div class="card-body">

<h4>
Resumen Ejecutivo
</h4>

<p>

Este dashboard integra los principales
métodos numéricos utilizados para el análisis
de abastecimiento, reservas, precios,
costos y puntos críticos.

</p>

<table class="table table-bordered">

<thead>

<tr>

<th>Área</th>
<th>Métodos</th>

</tr>

</thead>

<tbody>

<tr>

<td>Sistemas Lineales</td>

<td>
Jacobi, Gauss-Seidel, LU
</td>

</tr>

<tr>

<td>Ecuaciones Diferenciales</td>

<td>
Euler, Heun, RK4
</td>

</tr>

<tr>

<td>Interpolación</td>

<td>
Lagrange, Newton
</td>

</tr>

<tr>

<td>Integración</td>

<td>
Trapecio, Simpson 1/3, Simpson 3/8
</td>

</tr>

<tr>

<td>Raíces</td>

<td>
Bisección, Newton-Raphson, Secante
</td>

</tr>

</tbody>

</table>

</div>

</div>

`;

const inicio =
document.getElementById("inicio");

if(inicio){

inicio.insertAdjacentHTML(
"beforeend",
html
);

}

actualizarConclusiones();

}

function actualizarConclusiones(){

const html = `

<div class="row">

<div class="col-md-6">

<div class="alert alert-primary">

<h5>Sistemas Lineales</h5>

Gauss-Seidel generalmente
requiere menos iteraciones
que Jacobi.

La factorización LU
proporciona una solución
directa del sistema.

</div>

</div>

<div class="col-md-6">

<div class="alert alert-success">

<h5>Ecuaciones Diferenciales</h5>

RK4 presenta la mayor
precisión y estabilidad.

Euler es el método más simple,
pero también el más propenso
al error acumulado.

</div>

</div>

<div class="col-md-6">

<div class="alert alert-warning">

<h5>Interpolación</h5>

Lagrange y Newton permiten
reconstruir valores faltantes
en series de precios.

Newton es más eficiente
cuando se agregan nuevos datos.

</div>

</div>

<div class="col-md-6">

<div class="alert alert-info">

<h5>Integración</h5>

Los métodos de Simpson
presentan mejor precisión
que la regla del Trapecio
para funciones generales.

</div>

</div>

<div class="col-md-12">

<div class="alert alert-dark">

<h5>Raíces de Ecuaciones</h5>

Newton-Raphson suele converger
más rápido que Bisección.

La Secante ofrece una alternativa
cuando no se dispone
de la derivada.

</div>

</div>

</div>

<hr>

<h4>
Comparación General de Métodos
</h4>

<table class="table table-striped">

<thead>

<tr>

<th>Problema</th>
<th>Método Recomendado</th>

</tr>

</thead>

<tbody>

<tr>

<td>Sistemas Lineales</td>

<td>Gauss-Seidel / LU</td>

</tr>

<tr>

<td>Ecuaciones Diferenciales</td>

<td>RK4</td>

</tr>

<tr>

<td>Interpolación</td>

<td>Newton</td>

</tr>

<tr>

<td>Integración</td>

<td>Simpson 1/3</td>

</tr>

<tr>

<td>Raíces</td>

<td>Newton-Raphson</td>

</tr>

</tbody>

</table>

<div class="alert alert-secondary mt-4">

<h5>Conclusión General</h5>

Los métodos numéricos permiten modelar
situaciones reales de abastecimiento,
precios y estabilidad económica.

La selección adecuada del método
depende del problema planteado,
la precisión requerida y
el costo computacional.

Los resultados obtenidos demuestran
que métodos avanzados como
RK4, Simpson y Newton-Raphson
presentan mejor desempeño
en términos de precisión
y velocidad de convergencia.

</div>

`;

const contenedor =
document.getElementById(
"resultadoConclusiones"
);

if(contenedor){

contenedor.innerHTML = html;

}

}