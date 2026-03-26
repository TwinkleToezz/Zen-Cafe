function displayOrders() {
  const ordersContainer = document.getElementById("orders");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  ordersContainer.innerHTML = "";

  orders.forEach((order, index) => {
    let div = document.createElement("div");
    div.className = "order";

    div.innerHTML = `
      <strong>${order.name}</strong><br>
      ${order.items.map(i=>`${i.name} x${i.qty}`).join(", ")}<br>
      UGX ${order.total}<br>
      Status: ${order.status}
    `;

    let btn = document.createElement("button");

    if(order.status==="pending"){
      btn.textContent="Mark Ready";
      btn.onclick=()=>{
        orders[index].status="ready";
        localStorage.setItem("orders", JSON.stringify(orders));
      };
    } else {
      btn.textContent="Remove";
      btn.onclick=()=>{
        orders.splice(index,1);
        localStorage.setItem("orders", JSON.stringify(orders));
      };
    }

    div.appendChild(btn);
    ordersContainer.appendChild(div);
  });
}

setInterval(displayOrders, 3000);
displayOrders();
