document.addEventListener("DOMContentLoaded", () => {

document.getElementById("moduloSistemas").innerHTML = `

<div class="card shadow-sm">

<div class="card-body">

<h4 class="mb-4">
Datos del Sistema
</h4>

<div class="row">

<div class="col-md-6">

<h5>Matriz A</h5>

<table class="table table-bordered">

<tr>
<td><input id="a11" value="10"></td>
<td><input id="a12" value="2"></td>
<td><input id="a13" value="1"></td>
</tr>

<tr>
<td><input id="a21" value="1"></td>
<td><input id="a22" value="5"></td>
<td><input id="a23" value="1"></td>
</tr>

<tr>
<td><input id="a31" value="2"></td>
<td><input id="a32" value="3"></td>
<td><input id="a33" value="10"></td>
</tr>

</table>

</div>

<div class="col-md-6">

<h5>Vector B</h5>

<input class="form-control mb-2" id="b1" value="700">
<input class="form-control mb-2" id="b2" value="400">
<input class="form-control mb-2" id="b3" value="900">

</div>

</div>

<hr>

<div class="d-flex gap-2 flex-wrap">

<button
class="btn btn-primary"
onclick="resolverJacobi()">

Jacobi

</button>

<button
class="btn btn-success"
onclick="resolverGaussSeidel()">

Gauss-Seidel

</button>

<button
class="btn btn-dark"
onclick="resolverLU()">

LU

</button>

</div>

<hr>

<div id="resultadoSistema"></div>

</div>

</div>

`;

});

function leerSistema(){

return{

A:[

[
Number(a11.value),
Number(a12.value),
Number(a13.value)
],

[
Number(a21.value),
Number(a22.value),
Number(a23.value)
],

[
Number(a31.value),
Number(a32.value),
Number(a33.value)
]

],

B:[

Number(b1.value),
Number(b2.value),
Number(b3.value)

]

};

}

function mostrarTabla(iteraciones,titulo,clase){

let html=`

<h4 class="mt-4">
${titulo}
</h4>

<table class="table table-striped table-hover">

<thead>

<tr>

<th>Iter</th>
<th>x1</th>
<th>x2</th>
<th>x3</th>

</tr>

</thead>

<tbody>

`;

iteraciones.forEach(fila=>{

html+=`

<tr>

<td>${fila.iter}</td>

<td>${fila.x1.toFixed(6)}</td>

<td>${fila.x2.toFixed(6)}</td>

<td>${fila.x3.toFixed(6)}</td>

</tr>

`;

});

html+=`
</tbody>
</table>
`;

let ultima=iteraciones[iteraciones.length-1];

html+=`

<div class="alert ${clase}">

<b>Solución aproximada:</b><br>

Zona Norte = ${ultima.x1.toFixed(4)}<br>

Zona Centro = ${ultima.x2.toFixed(4)}<br>

Zona Sur = ${ultima.x3.toFixed(4)}

</div>

`;

return html;

}

function resolverJacobi(){

const {A,B}=leerSistema();

let x=[0,0,0];

let iteraciones=[];

for(let k=1;k<=20;k++){

let xn=[];

xn[0]=(B[0]-A[0][1]*x[1]-A[0][2]*x[2])/A[0][0];

xn[1]=(B[1]-A[1][0]*x[0]-A[1][2]*x[2])/A[1][1];

xn[2]=(B[2]-A[2][0]*x[0]-A[2][1]*x[1])/A[2][2];

iteraciones.push({

iter:k,

x1:xn[0],

x2:xn[1],

x3:xn[2]

});

x=[...xn];

}

resultadoSistema.innerHTML=

mostrarTabla(
iteraciones,
"Método Jacobi",
"alert-primary"
)

+

`

<div class="alert alert-info">

<b>Interpretación:</b>

Jacobi actualiza todas las variables utilizando
los valores de la iteración anterior.
Suele requerir más iteraciones para converger.

</div>

`;

}

function resolverGaussSeidel(){

const {A,B}=leerSistema();

let x=[0,0,0];

let iteraciones=[];

for(let k=1;k<=20;k++){

x[0]=(B[0]-A[0][1]*x[1]-A[0][2]*x[2])/A[0][0];

x[1]=(B[1]-A[1][0]*x[0]-A[1][2]*x[2])/A[1][1];

x[2]=(B[2]-A[2][0]*x[0]-A[2][1]*x[1])/A[2][2];

iteraciones.push({

iter:k,

x1:x[0],

x2:x[1],

x3:x[2]

});

}

resultadoSistema.innerHTML=

mostrarTabla(
iteraciones,
"Método Gauss-Seidel",
"alert-success"
)

+

`

<div class="alert alert-success">

<b>Interpretación:</b>

Gauss-Seidel utiliza inmediatamente
los valores actualizados,
por lo que normalmente converge más rápido.

</div>

`;

}

function resolverLU(){

const {A,B}=leerSistema();

let n=3;

let L=[
[0,0,0],
[0,0,0],
[0,0,0]
];

let U=[
[0,0,0],
[0,0,0],
[0,0,0]
];

for(let i=0;i<n;i++){

for(let k=i;k<n;k++){

let suma=0;

for(let j=0;j<i;j++){

suma+=L[i][j]*U[j][k];

}

U[i][k]=A[i][k]-suma;

}

for(let k=i;k<n;k++){

if(i===k){

L[i][i]=1;

}else{

let suma=0;

for(let j=0;j<i;j++){

suma+=L[k][j]*U[j][i];

}

L[k][i]=(A[k][i]-suma)/U[i][i];

}

}

}

let y=[];

for(let i=0;i<n;i++){

let suma=0;

for(let j=0;j<i;j++){

suma+=L[i][j]*y[j];

}

y[i]=B[i]-suma;

}

let x=[];

for(let i=n-1;i>=0;i--){

let suma=0;

for(let j=i+1;j<n;j++){

suma+=U[i][j]*x[j];

}

x[i]=(y[i]-suma)/U[i][i];

}

resultadoSistema.innerHTML=`

<h4>Factorización LU</h4>

<div class="row">

<div class="col-md-6">

<h5>Matriz L</h5>

<table class="table table-bordered">

${L.map(
fila=>`
<tr>
${fila.map(v=>`<td>${v.toFixed(4)}</td>`).join("")}
</tr>
`
).join("")}

</table>

</div>

<div class="col-md-6">

<h5>Matriz U</h5>

<table class="table table-bordered">

${U.map(
fila=>`
<tr>
${fila.map(v=>`<td>${v.toFixed(4)}</td>`).join("")}
</tr>
`
).join("")}

</table>

</div>

</div>

<div class="alert alert-warning">

<b>Solución:</b><br>

Zona Norte = ${x[0].toFixed(4)}<br>

Zona Centro = ${x[1].toFixed(4)}<br>

Zona Sur = ${x[2].toFixed(4)}

</div>

<div class="alert alert-secondary">

<b>Interpretación:</b>

La factorización LU descompone la matriz A
en dos matrices triangulares.
Es uno de los métodos directos más utilizados
en ingeniería y análisis numérico.

</div>

`;

}