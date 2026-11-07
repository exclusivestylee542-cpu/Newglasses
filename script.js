/* ============ CONFIGURACIÓN (cambia solo esto) ============ */
const CONFIG = {
  whatsapp:  "573000000000",                    // tu número con indicativo, sin + ni espacios
  instagram: "https://instagram.com/TU_USUARIO", // enlace de tu Instagram
  facebook:  "https://facebook.com/TU_PAGINA",   // enlace de tu Facebook
  tienda:    "New Glasses Medellín"
};

/* ============ PRODUCTOS ============
   El catálogo está vacío. Para agregar uno, copia este formato dentro de la lista
   (guarda la foto en img/productos/):
   { id:1, cat:"dama",   nombre:"Montura 001", precio:129900, img:"img/productos/001.jpg" },
   { id:2, cat:"hombre", nombre:"Montura 002", precio:129900, img:"img/productos/002.jpg" },
*/
const PRODUCTOS = [
];

/* ============ LÓGICA ============ */
const $ = s => document.querySelector(s);
const fmt = n => "$" + n.toLocaleString("es-CO");
let cat = "dama";
let cart = [];
try { cart = JSON.parse(localStorage.getItem("ng_cart") || "[]"); } catch (e) { cart = []; }

/* Enlaces de contacto */
const waLink = (txt) => `https://wa.me/${CONFIG.whatsapp}` + (txt ? `?text=${encodeURIComponent(txt)}` : "");
document.querySelectorAll("[data-wa]").forEach(a => a.href = waLink("Hola New Glasses, quiero información"));
document.querySelectorAll("[data-ig]").forEach(a => a.href = CONFIG.instagram);
document.querySelectorAll("[data-fb]").forEach(a => a.href = CONFIG.facebook);

function setTab(c){
  cat = c;
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("on", b.dataset.cat === cat));
  renderGrid();
}
function renderGrid(){
  const list = PRODUCTOS.filter(p => p.cat === cat);
  const g = $("#grid");
  if (!list.length){
    g.innerHTML = `<div class="empty"><h3>Próximamente</h3><p>Estamos preparando la nueva colección de gafas de ${cat}. Escríbenos por WhatsApp para conocer lo que tenemos disponible.</p></div>`;
    return;
  }
  g.innerHTML = list.map(p => `
    <article class="card">
      <div class="ph" data-view="${p.id}"><img src="${p.img}" alt="${p.nombre}" loading="lazy"></div>
      <div class="bd"><h3>${p.nombre}</h3><div class="pr">${fmt(p.precio)}</div>
        <button class="add" data-add="${p.id}">Agregar al carrito</button></div>
    </article>`).join("");
}
function save(){ try { localStorage.setItem("ng_cart", JSON.stringify(cart)); } catch (e) {} renderCart(); }
function toast(t){ const e = $("#toast"); e.textContent = t; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 1800); }
function add(id){
  const p = PRODUCTOS.find(x => x.id == id); if (!p) return;
  const l = cart.find(x => x.id == id); l ? l.q++ : cart.push({ id: p.id, q: 1 });
  save(); toast("Agregado al carrito");
}
function rowsOf(){ return cart.map(l => ({ ...PRODUCTOS.find(p => p.id == l.id), q: l.q })).filter(r => r.id !== undefined); }
function renderCart(){
  const rows = rowsOf();
  $("#count").textContent = rows.reduce((a, r) => a + r.q, 0);
  $("#items").innerHTML = rows.length ? rows.map(r => `
    <div class="it"><img src="${r.img}" alt="">
      <div><div>${r.nombre}</div><div style="color:var(--gold-d)">${fmt(r.precio)}</div>
        <div class="q"><button data-m="${r.id}">−</button>${r.q}<button data-p="${r.id}">+</button></div></div>
      <button class="rm" data-rm="${r.id}">Quitar</button></div>`).join("")
    : `<div class="none">Tu carrito está vacío.</div>`;
  $("#total").textContent = fmt(rows.reduce((a, r) => a + r.precio * r.q, 0));
  $("#goPay").disabled = !rows.length;
}
function openCart(o = true){
  $("#drawer").classList.toggle("open", o);
  $("#shade").classList.toggle("open", o);
  if (!o) showCheckout(false);
}
function showCheckout(on){
  $("#co").classList.toggle("open", on);
  $("#items").style.display = on ? "none" : "";
  $("#foot").style.display = on ? "none" : "";
  $("#dtitle").textContent = on ? "Finalizar pedido" : "Tu carrito";
}
function view(id){
  const p = PRODUCTOS.find(x => x.id == id); if (!p) return;
  $("#lbimg").src = p.img; $("#lbimg").alt = p.nombre;
  $("#lbname").textContent = p.nombre; $("#lbprice").textContent = fmt(p.precio);
  $("#lbadd").dataset.add = p.id; $("#lb").classList.add("open");
}

document.addEventListener("click", e => {
  const t = e.target;
  if (t.dataset.add){ add(t.dataset.add); if (t.id === "lbadd") $("#lb").classList.remove("open"); }
  const v = t.closest("[data-view]"); if (v) view(v.dataset.view);
  if (t.dataset.p){ cart.find(x => x.id == t.dataset.p).q++; save(); }
  if (t.dataset.m){ const l = cart.find(x => x.id == t.dataset.m); l.q--; if (l.q < 1) cart = cart.filter(x => x !== l); save(); }
  if (t.dataset.rm){ cart = cart.filter(x => x.id != t.dataset.rm); save(); }
  if (t.dataset.cat) setTab(t.dataset.cat);
  if (t.dataset.go) setTab(t.dataset.go);
});
$("#openCart").onclick = () => openCart(true);
$("#closeCart").onclick = $("#shade").onclick = () => openCart(false);
$("#lbx").onclick = () => $("#lb").classList.remove("open");
$("#lb").onclick = e => { if (e.target.id === "lb") $("#lb").classList.remove("open"); };
$("#goPay").onclick = () => showCheckout(true);
$("#back").onclick = () => showCheckout(false);
document.addEventListener("keydown", e => { if (e.key === "Escape"){ $("#lb").classList.remove("open"); openCart(false); } });

$("#co").addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const rows = rowsOf();
  const total = rows.reduce((a, r) => a + r.precio * r.q, 0);
  const msg = `*Nuevo pedido - ${CONFIG.tienda}*\n\n` +
    rows.map(r => `• ${r.nombre} x${r.q} — ${fmt(r.precio * r.q)}`).join("\n") +
    `\n\n*Total:* ${fmt(total)}\n*Pago:* Contra entrega\n\n` +
    `*Nombre:* ${f.nombre}\n*Celular:* ${f.cel}\n*Ciudad:* ${f.ciudad}\n*Dirección:* ${f.dir}` +
    (f.obs ? `\n*Obs:* ${f.obs}` : "");
  window.open(waLink(msg), "_blank");
  cart = []; save(); e.target.reset(); openCart(false); toast("¡Pedido enviado por WhatsApp!");
});

renderGrid(); renderCart();
