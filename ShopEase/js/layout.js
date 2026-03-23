/* ══════════════════════════════════════
   ShopEase – Navbar & Footer Injector
══════════════════════════════════════ */

function injectNavbar(activePage) {
  const pages = [
    { id: 'home',       label: 'Home',       href: 'index.html' },
    { id: 'products',   label: 'Products',   href: 'products.html' },
    { id: 'category',   label: 'Category',   href: 'category.html' },
    { id: 'about',      label: 'About Us',   href: 'about.html' },
    { id: 'contact',    label: 'Contact Us', href: 'contact.html' },
  ];
  const links = pages.map(p =>
    `<li class="nav-item"><a class="nav-link${activePage === p.id ? ' active' : ''}" href="${p.href}">${p.label}</a></li>`
  ).join('');

  document.getElementById('navbar-placeholder').innerHTML = `
  <nav class="navbar navbar-expand-lg">
    <a class="navbar-brand" href="index.html">Shop<span>Ease</span></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ml-auto align-items-center">
        ${links}
        <li class="nav-item">
          <a class="nav-link${activePage === 'search' ? ' active' : ''}" href="search.html">
            <i class="fas fa-search mr-1"></i>Search
          </a>
        </li>
        <li class="nav-item ml-2">
          <a class="nav-link${activePage === 'cart' ? ' active' : ''}" href="cart.html"
             style="background:rgba(240,165,0,.12);border-radius:10px;">
            <i class="fas fa-shopping-cart mr-1"></i>Cart
            <span class="cart-badge" id="cart-count">0</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>`;
}

function injectFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div style="font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:var(--gold);margin-bottom:.8rem;">ShopEase</div>
          <p>Your one-stop destination for premium products at unbeatable prices.</p>
          <div class="mt-3 d-flex" style="gap:.6rem;">
            <a href="#" style="width:34px;height:34px;background:rgba(255,255,255,.07);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;"><i class="fab fa-facebook-f"></i></a>
            <a href="#" style="width:34px;height:34px;background:rgba(255,255,255,.07);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;"><i class="fab fa-instagram"></i></a>
            <a href="#" style="width:34px;height:34px;background:rgba(255,255,255,.07);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <div class="col-6 col-md-2 mb-4">
          <h6>Pages</h6>
          <a href="index.html" style="display:block;">Home</a>
          <a href="products.html" style="display:block;">Products</a>
          <a href="category.html" style="display:block;">Category</a>
          <a href="about.html" style="display:block;">About Us</a>
          <a href="contact.html" style="display:block;">Contact Us</a>
        </div>
        <div class="col-6 col-md-2 mb-4">
          <h6>Support</h6>
          <a style="display:block;">FAQ</a>
          <a style="display:block;">Shipping Policy</a>
          <a style="display:block;">Return Policy</a>
          <a style="display:block;">Track Order</a>
          <a style="display:block;">Privacy Policy</a>
        </div>
        <div class="col-md-4 mb-4">
          <h6>Newsletter</h6>
          <p>Get the latest deals & new arrivals in your inbox.</p>
          <div class="input-group mt-2" style="max-width:320px;">
            <input type="email" class="form-control" placeholder="Your email"
              style="border-radius:8px 0 0 8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#fff;"/>
            <div class="input-group-append">
              <button class="btn-gold btn" style="border-radius:0 8px 8px 0;padding:6px 14px;">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom text-center">
        <p class="mb-0">© 2024 ShopEase. All rights reserved. Built with Bootstrap, HTML, CSS, jQuery & JavaScript.</p>
      </div>
    </div>
  </footer>`;
}
