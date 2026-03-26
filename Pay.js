const menu = [
  { id:1, name:"Fried Chicken", price: 30000, category: "Lunch" },
  { id:2, name:"Steak", price: 50000, category: "Lunch" },
  { id:3, name:"Burger", price: 30000, category: "Lunch" },
  { id:4, name:"Pizza", price: 40000, category: "Lunch" },

  { id:5, name:"Iced Coffe", price: 17000, category: "Drinks"},
  { id:6, name:"Orange Juice", price: 12000, category: "Drinks"},
  { id:7, name:"Oreo Milkshake", price: 15000, category: "Drinks"},
  { id:8, name:"Cola", price: 2000, category: "Drinks"},

  { id:9, name:"Crossiant", price: 12000, category: "Breakfast"},
  { id:10, name:"Toast", price: 12000, category: "Breakfast"},
  { id:11, name:"Sandwich", price: 30000, category: "Breakfast"},
  { id:12, name:"Waffles", price: 15000, category: "Breakfast"},
  
  { id:13, name:"Cheesecake", price: 20000, category: "Desserts"},
  { id:14, name:"Brownie", price: 15000, category: "Desserts"},
  { id:15, name:"Red Velvet", price: 20000, category: "Desserts"},
  { id:16, name:"Blueberry cupcake", price: 10000, category: "Desserts"},
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* MENU */
function showMenu(){
  let menuHTML = "";
  let currentCategory = "";

  menu.forEach(item => {
    if (item.category !== currentCategory) {
      currentCategory = item.category;
      menuHTML += `<div class="menu-divisor">${currentCategory}</div>`;
    }

    menuHTML += `
      <div class="menu-item">
        <div class="item-info">
          <div class="menu-name">${item.name}</div>
          <div class="menu-price">UGX ${item.price.toLocaleString()}</div>
        </div>
        <button class="add-btn" onclick="add(${item.id})">Add</button>
      </div>
    `;
  });

  document.getElementById("menu").innerHTML = menuHTML;
}

/* ADD TO CART */
function add(id){
  const item = menu.find(x=>x.id===id);
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty++;
  else cart.push({...item, qty:1});
  saveCart();
}

/* CHANGE QTY */
function changeQty(id, change){
  const item = cart.find(c=>c.id===id);
  if(!item) return;
  item.qty += change;
  if(item.qty <=0) cart = cart.filter(c=>c.id!==id);
  saveCart();
}

/* SAVE CART */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

/* DISPLAY CART */
function showCart(){
  const div = document.getElementById("cartList");
  if(cart.length===0){
    div.innerHTML="<i>Cart is empty</i>";
    document.getElementById("total").textContent = "Total: UGX 0"; // Fixed this
    document.getElementById("changeBox").textContent="";
    return;
}

  let total=0;
  div.innerHTML = cart.map(item=>{
    total += item.price*item.qty;
    return `
      <div class="cart-item">
        <div class="cart-name">${item.name}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("total").textContent = "Total: UGX " + total;
  calcChange();
}

/* CALCULATE CHANGE */
function calcChange(){
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const given = parseInt(document.getElementById("moneyGiven").value)||0;
  const box = document.getElementById("changeBox");
  
  if(given > 0 && total > 0){
    const change = given - total;
    box.textContent = change < 0 
      ? `Short by UGX ${Math.abs(change).toLocaleString()}`
      : `Change: UGX ${change.toLocaleString()}`;
    box.style.color = change < 0 ? "red" : "green";
  } else { 
    box.textContent = ""; 
  }
}

/* PLACE ORDER */
function placeOrder(){
  const name = document.getElementById("customerName").value.trim();
  if(!name || cart.length===0){ alert("Enter name and add food"); return; }

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const order = {
    id: Date.now(),
    name,
    items: cart,
    total,
    status: "pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders"))||[];
  orders.unshift(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.setItem("currentOrderId", order.id);
  localStorage.removeItem("cart"); // clear cart after order

  window.location.href = "track.html";
}

showMenu();
showCart();

function checkUrlForItems() {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');

    if (idFromUrl) {
        add(parseInt(idFromUrl));
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}


showMenu();
showCart();
checkUrlForItems(); 