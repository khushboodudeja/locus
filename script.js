const productsContainer = document.getElementById('products');
const cartContainer = document.getElementById('cart');
const summary = document.getElementById('summary');

async function loadProducts() {
  const res = await fetch('http://localhost:5000/api/products');
  const products = await res.json();

  productsContainer.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(div);
  });
}

async function addToCart(id) {
  await fetch('http://localhost:5000/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  loadCart();
}

async function removeFromCart(id) {
  await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
    method: 'DELETE'
  });
  loadCart();
}

async function loadCart() {
  const res = await fetch('http://localhost:5000/api/cart');
  const data = await res.json();

  cartContainer.innerHTML = '';
  data.items.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="remove" onclick="removeFromCart(${p.id})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  summary.innerHTML = `
    <h3>Total: ₹${data.total.toFixed(2)}</h3>
    <h3>Discount: ₹${data.discount.toFixed(2)}</h3>
    <h3><strong>Payable: ₹${data.final.toFixed(2)}</strong></h3>
  `;
}

loadProducts();
loadCart();
