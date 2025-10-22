// 🛒 Product Data (with images)
const products = [
  { name: "Piattos", description: "Crunchy potato crisps", price: 20.0, img: "photos/Piattos-Cheese-40g.webp" },
  { name: "Clover", description: "Cheesy snack bites", price: 15.0, img: "https://i.imgur.com/vdLzZrT.png" },
  { name: "Chicharon ni Mang Juan", description: "Savory crunchy treat", price: 15.0, img: "https://i.imgur.com/zuB7DCd.png" },
  { name: "Bangus", description: "Premium milkfish tin", price: 28.0, img: "https://i.imgur.com/2M36s7Z.png" },
  { name: "Nova", description: "Whole grain snack", price: 12.0, img: "https://i.imgur.com/ZbWcCVh.png" },
  { name: "Chippy", description: "Barbecue corn chips", price: 8.0, img: "https://i.imgur.com/QMc4gxI.png" },
  { name: "Mr. Chips", description: "Cheesy corn snack", price: 10.0, img: "https://i.imgur.com/k5yeV9y.png" },
  { name: "V-Cut", description: "Wavy potato chips", price: 15.0, img: "https://i.imgur.com/hG2sNeV.png" },
  { name: "Cloud 9", description: "Chocolate caramel bar", price: 12.0, img: "https://i.imgur.com/MJmPQ5u.png" },
  { name: "Rebisco Sandwich", description: "Creamy biscuits", price: 10.0, img: "https://i.imgur.com/5mIxY9Q.png" },
  { name: "SkyFlakes", description: "Classic crackers", price: 10.0, img: "https://i.imgur.com/YxIeiVY.png" },
  { name: "Ding Dong", description: "Mixed nuts snack", price: 15.0, img: "https://i.imgur.com/OfmLytz.png" },
  { name: "Oishi", description: "Classic snack favorite", price: 10.0, img: "https://i.imgur.com/hKmIv5n.png" }
];

// 🔹 DOM Elements
const productList = document.getElementById("productList");
const cartContainer = document.getElementById("cart");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");

// 🛒 Cart Object
const cart = {};

// 🧃 Display Products
products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="font-bold text-orange-400 mt-2">₱${product.price.toFixed(2)}</p>
  `;
  card.addEventListener("click", () => addToCart(product));
  productList.appendChild(card);
});

// 🛒 Add to Cart
function addToCart(product) {
  if (!cart[product.name]) {
    cart[product.name] = { ...product, quantity: 1 };
  } else {
    cart[product.name].quantity++;
  }
  updateCart();
}

// 🔄 Update Cart
function updateCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  for (const itemName in cart) {
    const item = cart[itemName];
    total += item.price * item.quantity;

    const itemCard = document.createElement("div");
    itemCard.className = "cart-item";
    itemCard.innerHTML = `
      <div>
        <h3 class="font-semibold text-yellow-400">${item.name}</h3>
        <p>₱${item.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="bg-white text-gray-900 font-bold px-2 rounded" onclick="decreaseQty('${itemName}')">-</button>
        <span>${item.quantity}</span>
        <button class="bg-white text-gray-900 font-bold px-2 rounded" onclick="increaseQty('${itemName}')">+</button>
      </div>
    `;
    cartContainer.appendChild(itemCard);
  }

  cartTotal.textContent = total > 0 ? `Total: ₱${total.toFixed(2)}` : "Cart is empty";
}

// ➕ / ➖ Quantity Controls
function increaseQty(name) {
  cart[name].quantity++;
  updateCart();
}

function decreaseQty(name) {
  if (cart[name].quantity > 1) {
    cart[name].quantity--;
  } else {
    delete cart[name];
  }
  updateCart();
}

// 🧹 Clear Cart
clearCartBtn.addEventListener("click", () => {
  for (const key in cart) delete cart[key];
  updateCart();
});
