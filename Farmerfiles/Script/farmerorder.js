// Script/farmerorder.js

function getBadge(status) {
  switch (status) {
    case "Delivered": return '<span class="badge badge-delivered px-3 py-2">Delivered</span>';
    case "Processing": return '<span class="badge badge-processing px-3 py-2">Processing</span>';
    case "Shipped": return '<span class="badge badge-shipped px-3 py-2">Shipped</span>';
    case "Cancelled": return '<span class="badge badge-cancelled px-3 py-2">Cancelled</span>';
    case "Ordered": return '<span class="badge badge-processing px-3 py-2">Ordered</span>';
    default: return `<span class="badge bg-secondary px-3 py-2">${status}</span>`;
  }
}

// Render all orders
function renderFarmerOrders(filter = "All") {
  let orders = JSON.parse(localStorage.getItem("myorders")) || [];
  const tbody = document.getElementById("orders-table-body");
  const countElement = document.getElementById("orders-count");
  tbody.innerHTML = "";

  let filtered = filter && filter !== "All"
    ? orders.filter(order => order.statusoforder === filter)
    : orders;

  filtered.forEach((order, idx) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.orderid || ""}</td>
      <td>${order.customername || "N/A"}</td>
      <td>
        <img src="${order.img || "https://via.placeholder.com/32x32?text=No+Img"}" alt="${order.name}" style="min-width:32px;max-width:40px;max-height:40px;border-radius:0.4em;margin-right:0.7em;">
        ${order.name || ""}
      </td>
      <td>${order.quantity || ""}</td>
      <td>${order.totalprice || ""}</td>
      <td>${getBadge(order.statusoforder || "")}</td>
      <td>
        <button class="btn text-success p-0 btn-view-order" data-order-idx="${order.orderid}"><i class="fa-regular fa-eye"></i> View</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  countElement.textContent = `Showing 1 to ${filtered.length} of ${orders.length} orders`;

  // Attach view listeners
  tbody.querySelectorAll(".btn-view-order").forEach(btn => {
    btn.onclick = function() {
      let orderId = this.getAttribute("data-order-idx");
      let allOrders = JSON.parse(localStorage.getItem("myorders")) || [];
      let order = allOrders.find(o => o.orderid === orderId);
      if (order) showOrderModal(order);
    };
  });
}

function showOrderModal(order) {
  // Set modal fields
  document.getElementById("modalOrderId").textContent = order.orderid || "";
  document.getElementById("modalCustomer").textContent = order.customername || "N/A";
  document.getElementById("modalProductImg").src = order.img || "https://via.placeholder.com/32x32?text=No+Img";
  document.getElementById("modalProductName").textContent = order.name || "";
  document.getElementById("modalQty").textContent = order.quantity || "";
  document.getElementById("modalTotal").textContent = order.totalprice || "";
  document.getElementById("modalStatus").value = order.statusoforder || "Ordered";
  
  // Save reference for updating
  document.getElementById("orderDetailForm").dataset.orderid = order.orderid;

  // Show modal
  let orderModal = new bootstrap.Modal(document.getElementById("orderDetailModal"));
  orderModal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  renderFarmerOrders("All");
  document.querySelectorAll('[data-status]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.btn-status-active').forEach(b => {
        b.classList.remove('btn-status-active');
        b.classList.add('btn-status');
      });
      this.classList.remove('btn-status');
      this.classList.add('btn-status-active');
      renderFarmerOrders(this.getAttribute('data-status'));
    });
  });

  // Handle modal status saving
  document.getElementById("orderDetailForm").onsubmit = function(e) {
    e.preventDefault();
    let orderId = this.dataset.orderid;
    let newStatus = document.getElementById("modalStatus").value;
    let allOrders = JSON.parse(localStorage.getItem("myorders")) || [];
    let idx = allOrders.findIndex(o => o.orderid === orderId);
    if (idx > -1) {
      allOrders[idx].statusoforder = newStatus;
      localStorage.setItem("myorders", JSON.stringify(allOrders));
      renderFarmerOrders(document.querySelector(".btn-status-active").getAttribute("data-status"));
      bootstrap.Modal.getInstance(document.getElementById("orderDetailModal")).hide();
    }
  };
});
