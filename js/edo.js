document.addEventListener("DOMContentLoaded", () => {

document.getElementById("moduloEDO").innerHTML = `

<div class="card shadow-sm">

<div class="card-body">

<h4 class="mb-4">
Simulación de Reservas de Combustible
</h4>

<div class="row">

<div class="col-md-3">

<label>Reserva Inicial</label>

<input
type="number"
id="reservaInicial"
class="form-control"
value="10000">

</div>

<div class="col-md-3">

<label>Abastecimiento Diario</label>

<input
type="number"
id="entrada"
class="form-control"
value="500">

</div>

<div class="col-md-3">

<label>Tasa Consumo (%)</label>

<input
type="number"
id="consumo"
class="form-control"
value="8">

</div>

<div class="col-md-3">

<label>Días</label>

<input
type="number"
id="dias"
class="form-control"
value="30">

</div>

</div>

<hr>

<div class="d-flex gap-2 flex-wrap">

<button
class="btn btn-primary"
onclick="simularEDO()">

Ejecutar Simulación

</button>

</div>

<hr>

<div id="resultadoEDO"></div>

<canvas id="graficoEDO"></canvas>

</div>

</div>

`;

});

let graficoReserva = null;

function f(R, entrada, tasa){

return entrada - (tasa * R);

}

function simularEDO(){

const R0 =
Number(document.getElementById("reservaInicial").value);

const entrada =
Number(document.getElementById("entrada").value);

const tasa =
Number(document.getElementById("consumo").value) / 100;

const dias =
Number(document.getElementById("dias").value);

const h = 1;

let tiempo = [];

let euler = [];
let heun = [];
let rk4 = [];

let RE = R0;
let RH = R0;
let RR = R0;

let tabla = `

<table class="table table-striped table-hover">

<thead>

<tr>

<th>Día</th>

<th>Euler</th>

<th>Heun</th>

<th>RK4</th>

</tr>

</thead>

<tbody>

`;

for(let t=0;t<=dias;t++){

tiempo.push(t);

euler.push(RE);
heun.push(RH);
rk4.push(RR);

tabla += `

<tr>

<td>${t}</td>

<td>${RE.toFixed(2)}</td>

<td>${RH.toFixed(2)}</td>

<td>${RR.toFixed(2)}</td>

</tr>

`;

/* EULER */

RE =
RE +
h * f(RE, entrada, tasa);

/* HEUN */

let k1 =
f(RH, entrada, tasa);

let predictor =
RH + h*k1;

let k2 =
f(predictor, entrada, tasa);

RH =
RH +
(h/2)*(k1+k2);

/* RK4 */

let r1 =
f(RR, entrada, tasa);

let r2 =
f(
RR + h*r1/2,
entrada,
tasa
);

let r3 =
f(
RR + h*r2/2,
entrada,
tasa
);

let r4 =
f(
RR + h*r3,
entrada,
tasa
);

RR =
RR +
(h/6)*(r1+2*r2+2*r3+r4);

}

tabla += `
</tbody>
</table>
`;

document.getElementById(
"resultadoEDO"
).innerHTML = tabla +

`

<div class="alert alert-info">

<b>Euler:</b>
Método simple y rápido,
pero menos preciso.

</div>

<div class="alert alert-success">

<b>Heun:</b>
Mejora la precisión usando
predicción y corrección.

</div>

<div class="alert alert-warning">

<b>RK4:</b>
Método más estable y preciso.
Es el estándar para simulaciones.

</div>

`;

dibujarGrafico(
tiempo,
euler,
heun,
rk4
);

generarConclusionEDO(
euler,
heun,
rk4
);

}

function dibujarGrafico(
tiempo,
euler,
heun,
rk4
){

const ctx =
document.getElementById(
"graficoEDO"
);

if(graficoReserva){

graficoReserva.destroy();

}

graficoReserva =
new Chart(ctx, {

type:'line',

data:{

labels:tiempo,

datasets:[

{
label:'Euler',
data:euler,
borderWidth:2
},

{
label:'Heun',
data:heun,
borderWidth:2
},

{
label:'RK4',
data:rk4,
borderWidth:3
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

function generarConclusionEDO(
euler,
heun,
rk4
){

let ultimoEuler =
euler[euler.length-1];

let ultimoHeun =
heun[heun.length-1];

let ultimoRK4 =
rk4[rk4.length-1];

let texto = `

<div class="alert alert-primary mt-3">

<h5>Interpretación Automática</h5>

La simulación muestra la evolución
de las reservas de combustible.

<br><br>

Reserva final Euler:
<b>${ultimoEuler.toFixed(2)}</b>

<br>

Reserva final Heun:
<b>${ultimoHeun.toFixed(2)}</b>

<br>

Reserva final RK4:
<b>${ultimoRK4.toFixed(2)}</b>

<br><br>

El método RK4 presenta la
aproximación más estable,
por lo que es el más recomendable
para evaluar escenarios de
abastecimiento y consumo.

</div>

`;

document.getElementById(
"resultadoEDO"
).innerHTML += texto;

}