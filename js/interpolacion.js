document.addEventListener("DOMContentLoaded", () => {

document.getElementById("moduloInterpolacion").innerHTML = `

<div class="card shadow-sm">

<div class="card-body">

<h4 class="mb-4">
Curva de Precios de la Papa
</h4>

<div class="row">

<div class="col-md-4">

<label>Día a estimar</label>

<input
type="number"
id="diaInterpolar"
class="form-control"
value="12">

</div>

<div class="col-md-4 d-flex align-items-end">

<button
class="btn btn-primary"
onclick="calcularInterpolacion()">

Calcular Precio

</button>

</div>

</div>

<hr>

<div id="resultadoInterpolacion"></div>

<canvas id="graficoInterpolacion"></canvas>

</div>

</div>

`;

});

let graficoInterpolacion = null;

const diasDatos = [1,5,10,15,20,30];
const preciosDatos = [8,10,13,16,19,22];

function lagrange(x){

let n = diasDatos.length;

let resultado = 0;

for(let i=0;i<n;i++){

let termino = preciosDatos[i];

for(let j=0;j<n;j++){

if(i!==j){

termino *=
(x-diasDatos[j])/
(diasDatos[i]-diasDatos[j]);

}

}

resultado += termino;

}

return resultado;

}

function diferenciasDivididas(){

let n = diasDatos.length;

let tabla = [];

for(let i=0;i<n;i++){

tabla[i] = [];

tabla[i][0] = preciosDatos[i];

}

for(let j=1;j<n;j++){

for(let i=0;i<n-j;i++){

tabla[i][j] =

(
tabla[i+1][j-1]
-
tabla[i][j-1]
)

/

(
diasDatos[i+j]
-
diasDatos[i]
);

}

}

return tabla;

}

function newtonInterpolacion(x){

let tabla =
diferenciasDivididas();

let n = diasDatos.length;

let resultado =
tabla[0][0];

let producto = 1;

for(let i=1;i<n;i++){

producto *=
(x-diasDatos[i-1]);

resultado +=
tabla[0][i] *
producto;

}

return resultado;

}

function calcularInterpolacion(){

let dia =
Number(
document.getElementById(
"diaInterpolar"
).value
);

let precioLagrange =
lagrange(dia);

let precioNewton =
newtonInterpolacion(dia);

document.getElementById(
"resultadoInterpolacion"
).innerHTML = `

<div class="row">

<div class="col-md-6">

<div class="alert alert-primary">

<h5>Lagrange</h5>

Precio estimado:

<b>
${precioLagrange.toFixed(2)} Bs
</b>

</div>

</div>

<div class="col-md-6">

<div class="alert alert-success">

<h5>Newton</h5>

Precio estimado:

<b>
${precioNewton.toFixed(2)} Bs
</b>

</div>

</div>

</div>

<div class="alert alert-info">

<b>Interpretación:</b>

El precio estimado para el día
${dia}
permite reconstruir la evolución
del mercado incluso cuando no
se dispone de datos completos.

</div>

`;

dibujarGrafico(dia);

}

function dibujarGrafico(diaSeleccionado){

let diasCurva = [];
let preciosCurva = [];

for(let x=1;x<=30;x++){

diasCurva.push(x);

preciosCurva.push(
lagrange(x)
);

}

const ctx =
document.getElementById(
"graficoInterpolacion"
);

if(graficoInterpolacion){

graficoInterpolacion.destroy();

}

graficoInterpolacion =
new Chart(ctx,{

type:'line',

data:{

labels:diasCurva,

datasets:[

{
label:'Curva Interpolada',

data:preciosCurva,

borderWidth:3,

fill:false
},

{
label:'Datos Reales',

data:preciosDatos,

type:'scatter',

pointRadius:6,

showLine:false

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

generarConclusionesInterpolacion(
diaSeleccionado
);

}

function generarConclusionesInterpolacion(dia){

let precio =
lagrange(dia);

let tendencia = "";

if(precio < 12){

tendencia =
"mercado relativamente estable";

}
else if(precio < 18){

tendencia =
"incremento moderado";

}
else{

tendencia =
"incremento acelerado de precios";

}

document.getElementById(
"resultadoInterpolacion"
).innerHTML += `

<div class="alert alert-warning mt-3">

<h5>Análisis Económico</h5>

Para el día
<b>${dia}</b>
se estima un precio de

<b>${precio.toFixed(2)} Bs</b>.

<br><br>

La tendencia observada indica
un escenario de

<b>${tendencia}</b>.

<br><br>

Esto puede estar relacionado
con problemas de abastecimiento,
incremento de demanda o
limitaciones en la distribución.

</div>

`;

}