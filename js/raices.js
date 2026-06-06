document.addEventListener("DOMContentLoaded", () => {

document.getElementById("moduloRaices").innerHTML = `

<div class="card shadow-sm">

<div class="card-body">

<h4 class="mb-4">

Punto Crítico de Abastecimiento

</h4>

<p>

Función:

f(x)=x³−6x²+11x−6

</p>

<div class="row">

<div class="col-md-3">

<label>Xi</label>

<input
type="number"
id="xi"
class="form-control"
value="0.5">

</div>

<div class="col-md-3">

<label>Xs</label>

<input
type="number"
id="xs"
class="form-control"
value="1.5">

</div>

<div class="col-md-3">

<label>Tolerancia</label>

<input
type="number"
id="tol"
class="form-control"
value="0.0001">

</div>

<div class="col-md-3 d-flex align-items-end">

<button
class="btn btn-primary w-100"
onclick="ejecutarRaices()">

Calcular

</button>

</div>

</div>

<hr>

<div id="resultadoRaices"></div>

<canvas id="graficoRaices"></canvas>

</div>

</div>

`;

dibujarFuncionRaices();

});

let graficoRaices = null;

function f(x){

return (
Math.pow(x,3)
-
6*Math.pow(x,2)
+
11*x
-
6
);

}

function df(x){

return (
3*Math.pow(x,2)
-
12*x
+
11
);

}

function ejecutarRaices(){

let xi =
Number(
document.getElementById("xi").value
);

let xs =
Number(
document.getElementById("xs").value
);

let tol =
Number(
document.getElementById("tol").value
);

let b =
biseccion(xi,xs,tol);

let n =
newtonRaphson(
(xi+xs)/2,
tol
);

let s =
secante(
xi,
xs,
tol
);

mostrarResultados(
b,
n,
s
);

}

function biseccion(xi,xs,tol){

let tabla=[];

let xm;
let error=100;
let iter=0;

while(error>tol && iter<100){

let anterior=xm;

xm=(xi+xs)/2;

if(iter>0){

error=
Math.abs(
xm-anterior
);

}

tabla.push({

iter:iter+1,

x:xm,

error:error

});

if(
f(xi)*f(xm)<0
){

xs=xm;

}else{

xi=xm;

}

iter++;

}

return {

raiz:xm,

iteraciones:tabla

};

}

function newtonRaphson(x0,tol){

let tabla=[];

let error=100;
let iter=0;

while(error>tol && iter<100){

let xn=
x0-
(
f(x0)
/df(x0)
);

error=
Math.abs(
xn-x0
);

tabla.push({

iter:iter+1,

x:xn,

error:error

});

x0=xn;

iter++;

}

return {

raiz:x0,

iteraciones:tabla

};

}

function secante(x0,x1,tol){

let tabla=[];

let error=100;
let iter=0;

while(error>tol && iter<100){

let x2=

x1

-

(

f(x1)

*

(x1-x0)

)

/

(

f(x1)-f(x0)

);

error=
Math.abs(
x2-x1
);

tabla.push({

iter:iter+1,

x:x2,

error:error

});

x0=x1;
x1=x2;

iter++;

}

return{

raiz:x1,

iteraciones:tabla

};

}

function crearTabla(datos,titulo,color){

let html=`

<h5 class="mt-4">

${titulo}

</h5>

<table class="table table-bordered">

<thead>

<tr>

<th>Iter</th>
<th>Raíz</th>
<th>Error</th>

</tr>

</thead>

<tbody>

`;

datos.iteraciones.forEach(r=>{

html+=`

<tr>

<td>${r.iter}</td>

<td>${r.x.toFixed(6)}</td>

<td>${r.error.toFixed(8)}</td>

</tr>

`;

});

html+=`
</tbody>
</table>

<div class="alert ${color}">

Raíz encontrada:

<b>

${datos.raiz.toFixed(6)}

</b>

</div>

`;

return html;

}

function mostrarResultados(
b,
n,
s
){

let html=`

<div class="row">

<div class="col-md-4">

<div class="alert alert-primary">

Bisección

<br>

Raíz:

<b>
${b.raiz.toFixed(6)}
</b>

<br>

Iteraciones:

<b>
${b.iteraciones.length}
</b>

</div>

</div>

<div class="col-md-4">

<div class="alert alert-success">

Newton-Raphson

<br>

Raíz:

<b>
${n.raiz.toFixed(6)}
</b>

<br>

Iteraciones:

<b>
${n.iteraciones.length}
</b>

</div>

</div>

<div class="col-md-4">

<div class="alert alert-warning">

Secante

<br>

Raíz:

<b>
${s.raiz.toFixed(6)}
</b>

<br>

Iteraciones:

<b>
${s.iteraciones.length}
</b>

</div>

</div>

</div>

`;

html+=crearTabla(
b,
"Detalle Bisección",
"alert-primary"
);

html+=crearTabla(
n,
"Detalle Newton-Raphson",
"alert-success"
);

html+=crearTabla(
s,
"Detalle Secante",
"alert-warning"
);

let mejor="";

if(
n.iteraciones.length<
s.iteraciones.length &&
n.iteraciones.length<
b.iteraciones.length
){

mejor="Newton-Raphson";

}
else if(
s.iteraciones.length<
b.iteraciones.length
){

mejor="Secante";

}
else{

mejor="Bisección";

}

html+=`

<div class="alert alert-info mt-4">

<h5>Interpretación</h5>

Los tres métodos convergen
a la misma raíz.

<br><br>

El método más eficiente fue:

<b>${mejor}</b>

porque necesitó menos iteraciones.

<br><br>

En el contexto del proyecto,
la raíz representa un punto
crítico donde el sistema cambia
de comportamiento.

</div>

`;

document.getElementById(
"resultadoRaices"
).innerHTML=html;

}

function dibujarFuncionRaices(){

const ctx=
document.getElementById(
"graficoRaices"
);

if(!ctx)return;

let xs=[];
let ys=[];

for(
let x=0;
x<=4;
x+=0.05
){

xs.push(
x.toFixed(2)
);

ys.push(
f(x)
);

}

if(graficoRaices){

graficoRaices.destroy();

}

graficoRaices=
new Chart(ctx,{

type:'line',

data:{

labels:xs,

datasets:[{

label:'f(x)',

data:ys,

borderWidth:3,

fill:false

}]

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