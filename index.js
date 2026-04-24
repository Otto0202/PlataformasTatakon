document.addEventListener("DOMContentLoaded", () => {

/******** MODAL IMPORTANTE ********/
window.closeAlertModal = function () {
  document.getElementById("welcomeModal").classList.add("hidden");
};

// Mostrar al cargar
document.getElementById("welcomeModal").classList.remove("hidden");
/******** FORMATO PRECIO ********/
function format(n){
return "$"+n.toLocaleString("es-CO");
}

/******** PRODUCTOS COMPLETOS ********/
const productos = [
{nombre:"Netflix",img:"https://i.imgur.com/qWeIeJQ.jpg",
pantalla:["26 días - 15000"],cuenta:[]},

{nombre:"Win Play",img:"https://i.imgur.com/Po4LLSW.jpg",
pantalla:["30 días - 15000"],cuenta:[]},

{nombre:"Disney+",img:"https://i.imgur.com/rw8oSWW.jpg",
pantalla:[
"Con ESPN - 10000",
"Sin ESPN SIN ANUNCIOS - 8000",
"Sin ESPN CON ANUNCIOS - 6000"
],
cuenta:[
"7 Pantallas con ESPN - 28000",
"7 Pantallas sin ESPN - 22000"
]},

{nombre:"HBO Max",img:"https://i.imgur.com/MEQjJ5o.jpg",
pantalla:[
"Estandar - 6500",
"Platino pantalla - 9000"
],
cuenta:[
"5 Pantallas - 15000",
"Platino 5 Pantallas - 20000"
]},

{nombre:"Crunchyroll",img:"https://i.imgur.com/nG42eev.jpg",
pantalla:["Mega Fan - 9000"],
cuenta:["5 Pantallas - 15500"]},

{nombre:"Prime Video",img:"https://i.imgur.com/lIL02hn.jpg",
pantalla:["Pantalla - 7500"],
cuenta:["6 Pantallas - 22000"]},

{nombre:"Paramount+",img:"https://i.imgur.com/A9OoDDR.jpg",
pantalla:["Pantalla - 6500"],
cuenta:["6 Pantallas - 16000"]},

{nombre:"Vix",img:"https://i.imgur.com/xk7TleC.jpg",
pantalla:["Pantalla - 8000"],
cuenta:["5 Pantallas - 16000"]},

{nombre:"Plex",img:"https://i.imgur.com/uH3mttW.jpg",
pantalla:[
"1 Mes (Roku/IOS) - 8000",
"1 Mes (NO Roku/IOS) - 6500",
"3 Meses (NO Roku/IOS) - 15000"
],
cuenta:[
"4 Pantallas 1 Mes (Roku/IOS) - 20000",
"4 Pantallas 1 Mes (NO Roku/IOS) - 15000",
"3 Meses (NO Roku/IOS) - 25000",
"6 Meses (NO Roku/IOS) - 45000"
]},

{nombre:"Magis TV",img:"https://i.imgur.com/Y6wj3CT.jpg",
pantalla:["PRO pantalla - 9500"],
cuenta:["Cuenta completa - 16000"]},

{nombre:"YouTube",img:"https://i.imgur.com/89YQK3J.jpg",
pantalla:["1 mes - 10000"],cuenta:[]},

{nombre:"Spotify",img:"https://i.imgur.com/rv3NfbX.jpg",
pantalla:["1 mes - 10000","3 meses - 25000"],cuenta:[]},

{nombre:"Deezer",img:"https://i.imgur.com/ggsjka3.jpg",
pantalla:["1 mes - 10000"],cuenta:[]},

{nombre:"Canva",img:"https://i.imgur.com/i0OC1VF.jpg",
pantalla:["1 Mes (estudiantil) - 12000"],cuenta:[]},

{nombre:"Apple TV",img:"https://i.imgur.com/7bhEfFG.jpg",
pantalla:["1 Mes (sin MLS) - 8000"],cuenta:[]},

{nombre:"Office 365",img:"https://i.imgur.com/Ys14gGe.jpg",
pantalla:["1 año - 45000"],cuenta:[]},

{nombre:"Chat GPT",img:"https://i.imgur.com/JYNI7nF.jpg",
pantalla:["Correo personal - 17000"],cuenta:[]},

{nombre:"Capcut Pro",img:"https://i.imgur.com/y48RpoH.jpg",
pantalla:["1 dispositivo - 14000"],
cuenta:["3 dispositivos - 20000"]},

{nombre:"Directv Go",img:"https://i.imgur.com/k8r44fZ.jpg",
pantalla:["Plan oro sin Win+ - 14000"],cuenta:[]}
];

/******** RENDER ********/
let cart=[];
const cont=document.getElementById("productos");

productos.forEach((p,i)=>{

let card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${p.img}" class="product-img">
<h2 class="mt-2 font-bold">${p.nombre}</h2>

<div class="text-sm mt-1">
<label><input type="radio" name="t${i}" value="pantalla" checked> Pantalla</label>
${p.cuenta.length?`<label class="ml-2"><input type="radio" name="t${i}" value="cuenta"> Cuenta completa</label>`:""}
</div>

<select id="s${i}" class="w-full text-black mt-2 p-1 rounded"></select>

<button class="btn">Agregar</button>
`;

cont.appendChild(card);

const select=card.querySelector("select");
const radios=card.querySelectorAll("input");
const btn=card.querySelector("button");

function update(){
let tipo=card.querySelector("input:checked").value;
let lista=tipo==="pantalla"?p.pantalla:p.cuenta;

select.innerHTML="";
lista.forEach(op=>{
let precio=parseInt(op.split(" - ")[1]);
select.innerHTML+=`<option value="${op}">${op.split(" - ")[0]} - ${format(precio)}</option>`;
});
}

radios.forEach(r=>r.addEventListener("change",update));

btn.onclick=()=>{
let val=select.value;
let precio=parseInt(val.split(" - ")[1]);

let item=cart.find(x=>x.name===p.nombre && x.opcion===val);
if(item)item.qty++;
else cart.push({name:p.nombre,opcion:val,precio,qty:1});

updateCounter();
};

update();
});

/******** CARRITO ********/
function updateCounter(){
document.getElementById("contador").innerText=
cart.reduce((s,p)=>s+p.qty,0);
}

window.openCart=()=>{
let div=document.getElementById("cartItems");
div.innerHTML="";
let total=0;

cart.forEach((p,i)=>{
let sub=p.qty*p.precio;
total+=sub;

div.innerHTML+=`
<div style="margin-bottom:15px;">
<b>${p.name}</b><br>
${p.opcion}<br>

<div style="margin:6px 0;">
${p.qty} x ${format(p.precio)} = <b>${format(sub)}</b>
</div>

<div style="display:flex; gap:10px; margin-top:5px;">
<button onclick="addOne(${i})" style="padding:4px 10px;">➕</button>
<button onclick="removeOne(${i})" style="padding:4px 10px;">➖</button>
<button onclick="deleteItem(${i})" style="padding:4px 10px;">❌</button>
</div>

<hr style="margin-top:10px;">
</div>
`;
});

div.innerHTML+=`<h3 style="margin-top:10px;">Total: ${format(total)}</h3>`;
document.getElementById("cartModal").style.display="flex";
};

window.closeCart=()=>document.getElementById("cartModal").style.display="none";

window.addOne=i=>{cart[i].qty++;updateCounter();openCart();}
window.removeOne=i=>{
cart[i].qty--;
if(cart[i].qty<=0)cart.splice(i,1);
updateCounter();
openCart();
}
window.deleteItem=i=>{
cart.splice(i,1);
updateCounter();
openCart();
}

window.checkout=()=>{
let total=0;
let msg="Hola, quiero realizar un pedido:\n\n";

cart.forEach(p=>{
let sub=p.qty*p.precio;
total+=sub;
msg+=`- ${p.name} (${p.opcion}) x${p.qty} → ${format(sub)}\n`;
});

msg+=`\nTotal: ${format(total)}`;

window.open(`https://wa.me/573239618378?text=${encodeURIComponent(msg)}`);
};

});
