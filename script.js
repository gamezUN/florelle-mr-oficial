const items=[
{id:"crumbl",name:"Crumbl Ref",detail:"1 rosa",price:12000,group:"rosas"},
{id:"amelia",name:"Amelia Ref",detail:"4 rosas + 1 mariposa",price:30000,group:"rosas"},
{id:"mood",name:"Mood Ref",detail:"6 rosas + 1 mariposa",price:44000,group:"rosas"},
{id:"tiana",name:"Tiana Ref",detail:"3 rosas + 2 dahlias + 2 plumerias",price:50000,group:"especiales"},
{id:"aura",name:"Aura Ref",detail:"5 rosas + 2 dahlias + 2 plumerias",price:65000,group:"especiales"},
{id:"aura-follaje",name:"Aura Ref · Follaje",detail:"5 rosas + 2 dahlias + 2 plumerias + follaje y papel perlado",price:75000,group:"especiales"},
{id:"vibe",name:"Vibe Ref",detail:"12 rosas + 2 mariposas",price:87000,group:"rosas"},
{id:"hello-kitty",name:"Hello Kitty Ref",detail:"10 rosas + tiara + luces frías",price:91000,group:"especiales"},
{id:"ensueno",name:"Ensueño Ref",detail:"3 tulipanes",price:30000,group:"especiales"},
{id:"princesa",name:"Princesa Ref",detail:"10 rosas + 4 plumerias + 2 hibiscos",price:130000,group:"especiales"},
{id:"elite",name:"Elite Ref",detail:"15 rosas + 2 mariposas",price:110000,group:"rosas"},
{id:"royal",name:"Royal Ref",detail:"20 rosas + 2 mariposas",price:145000,group:"rosas"},
{id:"mary",name:"Mary Ref · Quinceañera",detail:"Bouquet de 30 rosas",price:200000,group:"quince"},
{id:"clara",name:"Clara Ref · Quinceañera",detail:"Bouquet de 20 rosas",price:130000,group:"quince"},
{id:"lisa",name:"Lisa Ref · Quinceañera",detail:"Bouquet de 20 rosas",price:130000,group:"quince"}
];
const money=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
const productSelect=document.querySelector("#producto");
items.forEach(p=>productSelect.add(new Option(p.name+" — "+money(p.price),p.id)));
function productCard(p){return `<article class="product"><div class="product-top"><span class="product-mark">✿</span>${["crumbl","amelia","mood","vibe","elite"].includes(p.id)?'<span class="tag">MÁS VENDIDO</span>':""}</div><h3>${p.name}</h3><p class="detail">${p.detail}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button type="button" data-select="${p.id}">Elegir ↗</button></div></article>`}
let filter="todos";
function render(){const q=document.querySelector("#search").value.trim().toLowerCase();const main=items.filter(p=>p.group!=="quince"&&(filter==="todos"||(filter==="destacados"&&["crumbl","amelia","mood","vibe","elite"].includes(p.id))||filter===p.group)&&(p.name+" "+p.detail).toLowerCase().includes(q));document.querySelector("#products").innerHTML=main.map(productCard).join("")||"<p>No encontramos diseños con esa búsqueda.</p>";document.querySelector("#quince-products").innerHTML=items.filter(p=>p.group==="quince").map(productCard).join("")}
render();
document.querySelector("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;filter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("selected",x===b));render()});
document.querySelector("#search").addEventListener("input",render);
document.addEventListener("click",e=>{const b=e.target.closest("[data-select]");if(!b)return;productSelect.value=b.dataset.select;document.querySelector("#pedido").scrollIntoView({behavior:"smooth"});estimate()});
document.querySelector("#menu").addEventListener("click",()=>document.querySelector("#nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#nav").classList.remove("open")));
const date=document.querySelector("#fecha"),min=new Date();min.setDate(min.getDate()+2);date.min=new Date(min.getTime()-min.getTimezoneOffset()*60000).toISOString().slice(0,10);
const form=document.querySelector("#order-form"),estimateBox=document.querySelector("#estimate");
function calculate(){const p=items.find(x=>x.id===productSelect.value);if(!p)return null;const qty=Math.max(1,Number(form.cantidad.value)||1);let extra=0,labels=[];form.querySelectorAll(".addons input:checked").forEach(x=>{extra+=Number(x.value);labels.push(x.parentElement.textContent.trim())});const total=p.price*qty+extra;return{p,qty,extra,labels,total,deposit:total/2}}
function estimate(){const c=calculate();estimateBox.innerHTML=c?`<strong>Resumen estimado</strong><br>${c.p.name} × ${c.qty}: ${money(c.p.price*c.qty)}<br>Adicionales: ${c.labels.join(", ")||"Ninguno"} · ${money(c.extra)}<br><b class="total">Total de productos: ${money(c.total)}</b><br><span class="deposit">Anticipo estimado (50%): ${money(c.deposit)}</span><br><small>El domicilio se cotiza aparte según la ubicación.</small>`:"Selecciona un diseño para calcular el valor estimado."}
form.addEventListener("input",estimate);form.addEventListener("change",estimate);
document.querySelectorAll('input[name="entrega"]').forEach(r=>r.addEventListener("change",()=>document.querySelector("#address-wrap").classList.toggle("hidden",document.querySelector('input[name="entrega"]:checked').value!=="Domicilio en Cartagena")));
form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;const c=calculate(),d=new FormData(form);if(!c)return;const lines=["Hola FLORELLE MR., quiero consultar la disponibilidad de este pedido:","",`Nombre: ${d.get("nombre")}`,`Correo: ${d.get("correo")}`,`Diseño: ${c.p.name} — ${c.p.detail}`,`Cantidad: ${c.qty}`,`Adicionales: ${c.labels.join(", ")||"Ninguno"}`,`Total estimado de productos: ${money(c.total)}`,`Anticipo estimado (50%): ${money(c.deposit)}`,"",`Fecha: ${d.get("fecha")}`,`Hora preferida: ${d.get("hora")}`,`Entrega: ${d.get("entrega")}`,`Dirección: ${d.get("direccion")||"No indicada"}`,`Personalización: ${d.get("personalizacion")}`,`Detalles: ${d.get("detalles")||"Sin detalles"}`,"","Entiendo que esta solicitud no confirma automáticamente la reserva. El pedido queda agendado únicamente cuando FLORELLE MR. confirme disponibilidad y el anticipo. El domicilio se cotiza aparte si aplica."];document.querySelector("#status").textContent="Se abrirá tu aplicación de correo con el resumen. La solicitud debe enviarse manualmente.";location.href="mailto:Maryricardoquintero@gmail.com?subject="+encodeURIComponent("Solicitud FLORELLE MR. — "+c.p.name)+"&body="+encodeURIComponent(lines.join("\n"))});
