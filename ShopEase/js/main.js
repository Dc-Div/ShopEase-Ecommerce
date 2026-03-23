/* ══════════════════════════════════════
   ShopEase – Shared JavaScript
══════════════════════════════════════ */

/* ── PRODUCT DATA ── */
const products = [
  { id:1, name:"Casual Cotton Shirt",   desc:"Breathable everyday casual shirt in premium cotton. Perfect for weekends and informal occasions.", category:"Clothing",    rating:4,   price:350,  oldPrice:599,  img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", sizes:["S","M","L","XL"],       reviews:[{user:"Ankit M.",stars:4,text:"Great quality, fits perfectly!"},{user:"Divya K.",stars:5,text:"Loved the fabric, very comfortable."}] },
  { id:2, name:"Classic Formal Shirt",  desc:"Crisp white formal shirt ideal for office and events. Iron-free fabric for convenience.",          category:"Clothing",    rating:5,   price:599,  oldPrice:999,  img:"https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&q=80", sizes:["S","M","L","XL","XXL"],  reviews:[{user:"Rohan S.",stars:5,text:"Best formal shirt I've owned!"},{user:"Meera P.",stars:4,text:"Nice material, slightly slim fit."}] },
  { id:3, name:"Denim Jacket",          desc:"Stylish blue denim jacket with a vintage look. Pairs well with everything.",                        category:"Clothing",    rating:4.5, price:999,  oldPrice:1699, img:"https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80", sizes:["S","M","L","XL"],       reviews:[{user:"Kabir J.",stars:5,text:"Perfect fit and great look!"},{user:"Sana R.",stars:4,text:"Good quality denim."}] },
  { id:4, name:"Running Shoes",         desc:"Lightweight sports shoes with cushioned sole. Designed for long-distance running.",                  category:"Footwear",    rating:4,   price:1299, oldPrice:2199, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", sizes:["6","7","8","9","10"],    reviews:[{user:"Vijay T.",stars:4,text:"Very comfortable for daily runs."},{user:"Priya N.",stars:4,text:"Light and durable."}] },
  { id:5, name:"Leather Wallet",        desc:"Genuine full-grain leather slim wallet with RFID blocking. 6 card slots.",                           category:"Accessories", rating:3.5, price:449,  oldPrice:749,  img:"https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80", sizes:["One Size"],             reviews:[{user:"Amit C.",stars:4,text:"Very slim and elegant."},{user:"Neha S.",stars:3,text:"Good but not as described."}] },
  { id:6, name:"Wireless Earbuds",      desc:"Bluetooth 5.0 earbuds with active noise cancellation and 30-hour battery life.",                    category:"Electronics", rating:5,   price:1999, oldPrice:3499, img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", sizes:["One Size"],             reviews:[{user:"Rahul M.",stars:5,text:"Amazing sound quality!"},{user:"Pooja K.",stars:5,text:"Best earbuds under 2K."}] },
  { id:7, name:"Smart Watch",           desc:"Premium smartwatch with heart-rate monitor, GPS, and 7-day battery life.",                          category:"Electronics", rating:4,   price:2499, oldPrice:3999, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", sizes:["S/M","L/XL"],           reviews:[{user:"Suresh L.",stars:4,text:"Great watch for the price."},{user:"Kavya D.",stars:4,text:"Accurate fitness tracking."}] },
  { id:8, name:"Polo T-Shirt",          desc:"Classic polo shirt in premium piqué fabric. Ideal for casual and semi-formal wear.",                 category:"Clothing",    rating:4,   price:299,  oldPrice:499,  img:"https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80", sizes:["S","M","L","XL"],       reviews:[{user:"Aryan B.",stars:4,text:"Good quality polo."},{user:"Riya P.",stars:4,text:"Value for money!"}] },
];

/* ── CART (localStorage) ── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('shopease_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('shopease_cart', JSON.stringify(cart));
  updateCartBadge(cart);
}
function updateCartBadge(cart) {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cart.reduce((a, b) => a + b.qty, 0);
}
function addToCart(id, size = 'M', qty = 1) {
  const cart = getCart();
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id && x.size === size);
  if (existing) existing.qty += qty;
  else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, category: p.category, size, qty });
  saveCart(cart);
  toast('<i class="fas fa-check-circle mr-1" style="color:var(--gold);"></i> ' + p.name + ' added to cart!');
}
function removeFromCart(id, size) {
  let cart = getCart().filter(x => !(x.id === id && x.size === size));
  saveCart(cart);
}
function updateCartQty(id, size, delta) {
  let cart = getCart();
  const item = cart.find(x => x.id === id && x.size === size);
  if (item) { item.qty += delta; if (item.qty <= 0) cart = cart.filter(x => !(x.id === id && x.size === size)); }
  saveCart(cart);
}

/* ── STARS ── */
function renderStars(r) {
  let h = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(r))   h += '<i class="fas fa-star"></i>';
    else if (i - 0.5 <= r)   h += '<i class="fas fa-star-half-alt"></i>';
    else                      h += '<i class="far fa-star"></i>';
  }
  return '<span class="stars">' + h + '</span>';
}

/* ── PRODUCT CARD HTML ── */
function productCardHTML(p) {
  const disc = Math.round((1 - p.price / p.oldPrice) * 100);
  return `
  <div class="col-6 col-md-4 col-lg-3 mb-4">
    <div class="product-card" onclick="location.href='product-view.html?id=${p.id}'">
      <div class="card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        <div class="badge-cat">${p.category}</div>
      </div>
      <div class="card-body">
        ${renderStars(p.rating)}
        <div class="card-title mt-1">${p.name}</div>
        <div class="card-price">₹${p.price}
          <span class="old">₹${p.oldPrice}</span>
          <span style="font-size:.72rem;background:#e6f4ea;color:var(--green);font-weight:700;padding:1px 6px;border-radius:5px;margin-left:4px;">${disc}% OFF</span>
        </div>
        <button class="btn-gold btn btn-sm w-100 mt-2"
          onclick="event.stopPropagation();addToCart(${p.id});updateCartBadge(getCart())">
          <i class="fas fa-cart-plus mr-1"></i>Add to Cart
        </button>
      </div>
    </div>
  </div>`;
}

/* ── TOAST ── */
function toast(msg) {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toastWrap'; wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const div = document.createElement('div');
  div.className = 'toast-msg'; div.innerHTML = msg;
  wrap.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

/* ── INIT BADGE ON EVERY PAGE ── */
document.addEventListener('DOMContentLoaded', () => updateCartBadge(getCart()));
