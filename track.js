function updateTrackingPage() {
    const currentId = localStorage.getItem("currentOrderId");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const myOrder = orders.find(o => o.id == currentId);

    const statusDiv = document.getElementById("orderStatus");
    const detailsDiv = document.getElementById("orderDetails");

    if (!myOrder) {
        statusDiv.innerHTML = "<div style='font-size:24px;'>No active order found.</div>";
        return;
    }

    // 1. DISPLAY ITEMS (Large Font)
    detailsDiv.innerHTML = myOrder.items.map(item => 
        `<div style="font-size: 30px; margin-bottom: 8px;">${item.qty}x ${item.name}</div>`
    ).join("");

    detailsDiv.innerHTML += `
        <hr style="border: 1px solid #efbbff; margin: 20px 0;">
        <div style="font-size: 34px; font-weight: bold; color: #660066;">
            Total: UGX ${myOrder.total.toLocaleString()}
        </div>
    `;

    // 2. DISPLAY STATUS (Logic Fix)
    if (myOrder.status === "ready") {
        statusDiv.style.color = "green";
        statusDiv.style.fontSize = "45px";
        statusDiv.innerHTML = "✅ READY FOR PICKUP";
    } else {
        statusDiv.style.color = "#d86256"; // Your orange/red
        statusDiv.style.fontSize = "40px";
        statusDiv.innerHTML = "⏳ PREPARING YOUR ORDER...";
    }
}

// Run once immediately
updateTrackingPage();

// Check for updates every 3 seconds (No flickering)
setInterval(updateTrackingPage, 3000);