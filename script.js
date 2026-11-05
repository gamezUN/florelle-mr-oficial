const products = [
  {id:"crumbl",name:"Crumbl Ref",description:"1 rosa · Un gesto delicado.",price:12000,category:"rosas",best:false,image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=80"},
  {id:"amelia",name:"Amelia Ref",description:"4 rosas + 1 mariposa.",price:30000,category:"rosas",best:true,image:"https://images.unsplash.com/photo-1520763185298-1b434c919b8f?auto=format&fit=crop&w=700&q=80"},
  {id:"mood",name:"Mood Ref",description:"6 rosas + 1 mariposa.",price:44000,category:"rosas",best:true,image:"https://images.unsplash.com/photo-1518882605630-8eb6c8a1b2c4?auto=format&fit=crop&w=700&q=80"},
  {id:"tiana",name:"Tiana Ref",description:"3 rosas + 2 dahlias + 2 plumerias.",price:50000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80"},
  {id:"aura",name:"Aura Ref",description:"5 rosas + 2 dahlias + 2 plumerias.",price:65000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80"},
  {id:"aura-follaje",name:"Aura · Edición especial",description:"Con follaje y papel perlado.",price:75000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=700&q=80"},
  {id:"vibe",name:"Vibe Ref",description:"12 rosas + 2 mariposas.",price:87000,category:"rosas",best:true,image:"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80"},
  {id:"hello-kitty",name:"Hello Kitty Ref",description:"10 rosas + tiara + luces frías.",price:91000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80"},
  {id:"ensueno",name:"Ensueño Ref",description:"3 tulipanes.",price:30000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1526397751294-331021109fbd?auto=format&fit=crop&w=700&q=80"},
  {id:"princesa",name:"Princesa Ref",description:"10 rosas + 4 plumerias + 2 hibiscos.",price:130000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=80"},
  {id:"elite",name:"Elite Ref",description:"15 rosas + 2 mariposas.",price:110000,category:"rosas",best:true,image:"https://images.unsplash.com/photo-1494625927555-6ec4433b1571?auto=format&fit=crop&w=700&q=80"},
  {id:"royal",name:"Royal Ref",description:"20 rosas + 2 mariposas.",price:145000,category:"rosas",best:false,image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=80"},
  {id:"mary",name:"Mary · Quinceañera",description:"Ramo de 30 rosas.",price:200000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80"},
  {id:"clara",name:"Clara · Quinceañera",description:"Ramo de 20 rosas.",price:130000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=80"},
  {id:"lisa",name:"Lisa · Quinceañera",description:"Ramo de 20 rosas.",price:130000,category:"especiales",best:false,image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80"}
];
const money = value => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(value);
const grid = document.getElementById("productGrid");
const select = document.getElementById("productSelect");
let activeFilter = "todos";

function renderProducts(){
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const shown = products.filter(p => {
    const filterMatch = activeFilter === "todos" || (activeFilter === "favoritos" ? p.best : p.category === activeFilter);
    return filterMatch && (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  });
  grid.innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.best ? '<span class="product-badge">MÁS VENDIDO</span>' : ''}
      </div>
      <div class="product-info">
        <div class="product-top"><h3>${p.name}</h3><span class="product-price">${money(p.price)}</span></div>
        <p class="product-description">${p.description}</p>
        <div class="product-actions"><button type="button" data-product="${p.id}">Elegir este ramo ↗</button><span>FLORELLE MR.</span></div>
      </div>
    </article>`).join("");
  if(!shown.length) grid.innerHTML = '<p>No encontramos productos con esa búsqueda.</p>';
}
products.forEach(p => select.add(new Option(`${p.name} — ${money(p.price)}`,p.id)));
renderProducts();

document.getElementById("filters").addEventListener("click",e=>{
  const btn=e.target.closest("[data-filter]"); if(!btn)return;
  activeFilter=btn.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));
  renderProducts();
});
document.getElementById("searchInput").addEventListener("input",renderProducts);
grid.addEventListener("click",e=>{
  const btn=e.target.closest("[data-product]"); if(!btn)return;
  select.value=btn.dataset.product;
  document.getElementById("reservar").scrollIntoView({behavior:"smooth"});
});

const dateInput=document.getElementById("deliveryDate");
const minDate=new Date(); minDate.setDate(minDate.getDate()+2);
const localDate=new Date(minDate.getTime()-minDate.getTimezoneOffset()*60000).toISOString().split("T")[0];
dateInput.min=localDate;

document.getElementById("reservationForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const product=products.find(p=>p.id===data.get("product"));
  const qty=Number(data.get("quantity"));
  const total=product.price*qty;
  const deposit=total*.5;
  const result=document.getElementById("formResult");
  result.style.display="block";
  result.textContent=`VISTA PREVIA DE TU SOLICITUD\n\nNombre: ${data.get("name")}\nRamo: ${product.name} × ${qty}\nValor de los ramos: ${money(total)}\nAnticipo estimado (50%): ${money(deposit)}\nFecha: ${data.get("date")}\nHorario: ${data.get("time")}\nEntrega: ${data.get("address")}\n\nEl domicilio se cotiza según la ubicación. Esta solicitud todavía no se ha enviado a FLORELLE MR.; falta conectar el sistema de reservas.`;
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
