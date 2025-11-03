// Script/farmer_orders.js

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

// Loads orders from localStorage and renders them
function renderFarmerOrders(filter = "All") {
  const orders = JSON.parse(localStorage.getItem("myorders")) || [];
  const tbody = document.getElementById("orders-table-body");
  const countElement = document.getElementById("orders-count");
  tbody.innerHTML = "";

  let filtered = filter && filter !== "All"
    ? orders.filter(order => order.statusoforder === filter)
    : orders;

  for (const order of filtered) {
    tbody.innerHTML += `
      <tr>
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
          <button class="btn text-success p-0"><i class="fa-regular fa-eye"></i> View</button>
        </td>
      </tr>
    `;
  }
  countElement.textContent = `Showing 1 to ${filtered.length} of ${orders.length} orders`;
}

// Attach event listeners to status filter buttons
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
});
