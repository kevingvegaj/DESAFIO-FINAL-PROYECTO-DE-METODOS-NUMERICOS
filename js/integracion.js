document.addEventListener("DOMContentLoaded", () => {

document.getElementById("moduloIntegracion").innerHTML = `

<div class="card shadow-sm">

<div class="card-body">

<h4 class="mb-4">
Estimación del Gasto Familiar Acumulado
</h4>

<p>

La función representa el costo diario
de una canasta básica durante un periodo.

</p>

<div class="row">

<div class="col-md-3">

<label>Valor inicial (a)</label>

<input
type="number"
id="limiteInferior"
class="form-control"
value="0">

</div>

<div class="col-md-3">

<label>Valor final (b)</label>

<input
type="number"
id="limiteSuperior"
class="form-control"
value="30">

</div>

<div class="col-md-3">

<label>Subintervalos (n)</label>

<input
type="number"
id="subintervalos"
class="form-control"
value="6">

</div>

<div class="col-md-3 d-flex align-items-end">

<button
class="btn btn-primary w-100"
onclick="calcularIntegracion()">

Calcular

</button>

</div>

</div>

<hr>

<div id="resultadoIntegracion"></div>

<canvas id="graficoIntegracion"></canvas>

</div>

</div>

`;

});

let graficoIntegracion = null;

/*
Función del problema

f(x)=8+0.4x

Costo diario estimado
*/

function fIntegracion(x){

return 8 + 0.4*x;

}

function trapecio(a,b,n){

let h=(b-a)/n;

let suma=
fIntegracion(a)+
fIntegracion(b);

for(let i=1;i<n;i++){

suma +=
2*fIntegracion(a+i*h);

}

return (h/2)*suma;

}

function simpson13(a,b,n){

if(n%2!==0){

return null;

}

let h=(b-a)/n;

let suma=
fIntegracion(a)+
fIntegracion(b);

for(let i=1;i<n;i++){

if(i%2===0){

suma +=
2*fIntegracion(a+i*h);

}else{

suma +=
4*fIntegracion(a+i*h);

}

}

return (h/3)*suma;

}

function simpson38(a,b,n){

while(n%3!==0){

n++;

}

let h=(b-a)/n;

let suma=
fIntegracion(a)+
fIntegracion(b);

for(let i=1;i<n;i++){

if(i%3===0){

suma +=
2*fIntegracion(a+i*h);

}else{

suma +=
3*fIntegracion(a+i*h);

}

}

return (3*h/8)*suma;

}

function calcularIntegracion(){

let a=
Number(
document.getElementById(
"limiteInferior"
).value
);

let b=
Number(
document.getElementById(
"limiteSuperior"
).value
);

let n=
Number(
document.getElementById(
"subintervalos"
).value
);

let trap =
trapecio(a,b,n);

let sim13 =
simpson13(a,b,n);

let sim38 =
simpson38(a,b,n);

document.getElementById(
"resultadoIntegracion"
).innerHTML = `

<div class="row">

<div class="col-md-4">

<div class="alert alert-primary">

<h5>Trapecio</h5>

Resultado:

<b>
${trap.toFixed(4)}
</b>

</div>

</div>

<div class="col-md-4">

<div class="alert alert-success">

<h5>Simpson 1/3</h5>

Resultado:

<b>
${sim13 ?
sim13.toFixed(4)
:
"No válido"}
</b>

</div>

</div>

<div class="col-md-4">

<div class="alert alert-warning">

<h5>Simpson 3/8</h5>

Resultado:

<b>
${sim38.toFixed(4)}
</b>

</div>

</div>

</div>

`;

dibujarGraficoIntegracion(a,b);

generarAnalisisIntegracion(
trap,
sim13,
sim38
);

}

function dibujarGraficoIntegracion(a,b){

let xs=[];
let ys=[];

for(let x=a;x<=b;x+=0.5){

xs.push(x.toFixed(1));

ys.push(
fIntegracion(x)
);

}

const ctx=
document.getElementById(
"graficoIntegracion"
);

if(graficoIntegracion){

graficoIntegracion.destroy();

}

graficoIntegracion=
new Chart(ctx,{

type:'line',

data:{

labels:xs,

datasets:[

{

label:'Costo Diario',

data:ys,

borderWidth:3,

fill:true

}

]

},

options:{

responsive:true,

plugins:{

legend:{

position:'top'

}

}

}

});

}

function generarAnalisisIntegracion(
trap,
sim13,
sim38
){

let mejorMetodo="";

let diferencia13=
Math.abs(sim13-trap);

let diferencia38=
Math.abs(sim38-trap);

if(diferencia13<diferencia38){

mejorMetodo=
"Simpson 1/3";

}else{

mejorMetodo=
"Simpson 3/8";

}

document.getElementById(
"resultadoIntegracion"
).innerHTML += `

<div class="alert alert-info mt-3">

<h5>Interpretación</h5>

La integral representa el gasto
acumulado durante el periodo analizado.

<br><br>

El método que presenta una mejor
aproximación para esta función es:

<b>${mejorMetodo}</b>

<br><br>

Esto permite estimar con mayor
precisión el costo total soportado
por una familia durante un periodo
de crisis o incremento de precios.

</div>

`;

}