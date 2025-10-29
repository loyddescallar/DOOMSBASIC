// 🍲 Filipino Dishes
const products = [
  { name: "Adobo", desc: "Soy sauce & vinegar braised meat", price: 120, img: "https://i.imgur.com/gCXtU1x.jpg" },
  { name: "Sinigang", desc: "Tamarind sour soup with veggies", price: 110, img: "https://i.imgur.com/hZ9v0r3.jpg" },
  { name: "Kare-Kare", desc: "Peanut stew with oxtail & veggies", price: 150, img: "https://i.imgur.com/aQ5OeeU.jpg" },
  { name: "Sisig", desc: "Crispy pork with egg & chili", price: 130, img: "https://i.imgur.com/BhdjA3F.jpg" },
  { name: "Laing", desc: "Taro leaves in coconut milk", price: 100, img: "https://i.imgur.com/nK5Bhzv.jpg" },
  { name: "Lumpia", desc: "Crispy spring rolls", price: 90, img: "https://i.imgur.com/JNeXzt2.jpg" }
];

// 🔹 DOM Elements
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

// 🧃 Display Products
products.forEach((dish, i) => {
  const card = document.createElement("div");
  card.className = "product-card bg-gray-800 p-5 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300";
  card.innerHTML = `
    <img src="${dish.img}" alt="${dish.name}" class="rounded-xl mb-3 w-full h-56 object-cover transition-transform duration-300">
    <h3 class="text-xl font-semibold text-yellow-400">${dish.name}</h3>
    <p class="text-gray-400 text-sm">${dish.desc}</p>
    <p class="mt-2 font-bold text-gray-200">₱${dish.price}</p>
  `;
  card.addEventListener("click", () => addToCart(dish));
  productList.appendChild(card);

  console.group(`🍽️ Product ${i + 1}: ${dish.name}`);
  console.log("Parent:", productList);
  console.log("Element:", card);
  console.log("Children:", card.children);
  console.groupEnd();
});

// 🛒 Add to Cart
function addToCart(item) {
  if (!cart[item.name]) cart[item.name] = { ...item, qty: 1 };
  else cart[item.name].qty++;
  saveAndUpdate();
}

// 🔄 Update Cart
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  for (const key in cart) {
    const { name, price, qty } = cart[key];
    total += price * qty;

    const li = document.createElement("li");
    li.className = "flex justify-between bg-gray-800 p-3 rounded-lg items-center hover:scale-[1.02] transition-all duration-200";
    li.innerHTML = `
      <span class="text-yellow-300">${name}</span>
      <div class="flex items-center gap-2">
        <button class="px-2 bg-gray-700 rounded hover:bg-gray-600" onclick="changeQty('${name}', -1)">-</button>
        <span>${qty}</span>
        <button class="px-2 bg-gray-700 rounded hover:bg-gray-600" onclick="changeQty('${name}', 1)">+</button>
        <button class="px-2 bg-red-700 rounded hover:bg-red-600 text-sm" onclick="removeItem('${name}')">🗑️</button>
      </div>
      <span>₱${(price * qty).toFixed(2)}</span>
    `;
    cartList.appendChild(li);
  }

  cartTotal.textContent = total ? `Total: ₱${total.toFixed(2)}` : "Cart is empty";
}

// ➕ / ➖ Change Quantity
function changeQty(name, delta) {
  if (cart[name]) {
    cart[name].qty += delta;
    if (cart[name].qty <= 0) delete cart[name];
    saveAndUpdate();
  }
}

// 🗑️ Remove Item
function removeItem(name) {
  delete cart[name];
  saveAndUpdate();
}

// 💾 Save + Update
function saveAndUpdate() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// 🧹 Clear Cart
clearCartBtn.addEventListener("click", () => {
  cart = {};
  saveAndUpdate();
});

// ✅ Checkout Modal
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) return alert("🛒 Cart is empty!");
  checkoutModal.classList.remove("hidden");
  cart = {};
  saveAndUpdate();
});

// ✖️ Close Modal
closeModal.addEventListener("click", () => checkoutModal.classList.add("hidden"));

// 🪄 On Load
updateCart();
