document.addEventListener("DOMContentLoaded", function () {
  let productDetails = JSON.parse(localStorage.getItem("productDetails")) || [];
  const tableBody = document.getElementById("product-table-body");

  function getCategoryName(catVal) {
    if (catVal === "1") return "Rice";
    if (catVal === "2") return "Carrot";
    if (catVal === "3") return "Tomato";
    if (catVal === "4") return "Onion";
    return "Other";
  }
  function getStatus(quantity) {
    quantity = parseInt(quantity, 10);
    if (isNaN(quantity) || quantity === 0) return {text: "Out of Stock", badge: "badge-outstock"};
    if (quantity < 30) return {text: "Low Stock", badge: "badge-warning"};
    return {text: "Available", badge: "badge-available"};
  }

  // Render table rows
  function renderTable() {
    tableBody.innerHTML = "";
    productDetails.forEach((product, i) => {
      const status = getStatus(product.quantity);
      const imgsrc = product.image ? product.image : "https://via.placeholder.com/32x32?text=No+Img";
      const catName = getCategoryName(product.category);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>PRD-${100 + i}</td>
        <td>
          <img src="${imgsrc}" alt="" width="32" class="me-2 align-middle">
          <span class="fw-bold text-dark">${product.name}</span>
        </td>
        <td><span class="badge bg-light text-success">${catName}</span></td>
        <td${status.text === 'Out of Stock' ? ' class="text-danger fw-bold"' : ''}>${product.quantity} kg</td>
        <td>₹${parseFloat(product.price).toFixed(2)}</td>
        <td><span class="badge ${status.badge}">${status.text}</span></td>
        <td class="table-actions">
          <button class="btn btn-edit" data-index="${i}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="btn btn-delete" data-index="${i}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // Attach Edit/Delete listeners after rendering
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.onclick = function () { openEditModal(this.dataset.index); };
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.onclick = function () { deleteProduct(this.dataset.index); };
    });
  }

  // Delete Product
  function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
      productDetails.splice(index, 1);
      localStorage.setItem("productDetails", JSON.stringify(productDetails));
      renderTable();
    }
  }

  // Edit Modal Functions
  const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
  const editForm = document.getElementById("editProductForm");

  function openEditModal(index) {
    document.getElementById("editIndex").value = index;
    const prod = productDetails[index];
    document.getElementById("editName").value = prod.name;
    document.getElementById("editCategory").value = prod.category;
    document.getElementById("editDescription").value = prod.description;
    document.getElementById("editPrice").value = prod.price;
    document.getElementById("editQuantity").value = prod.quantity;
    document.getElementById("editPreview").src = prod.image ? prod.image : "https://via.placeholder.com/32x32?text=No+Img";
    editProductModal.show();
  }

  // Preview updated image in modal
  document.getElementById("editImage").addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById("editPreview").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  });
  
  // Save changes from modal
  editForm.onsubmit = function (event) {
    event.preventDefault();
    const idx = document.getElementById("editIndex").value;
    const updatedProduct = {
      name: document.getElementById("editName").value,
      category: document.getElementById("editCategory").value,
      description: document.getElementById("editDescription").value,
      price: document.getElementById("editPrice").value,
      quantity: document.getElementById("editQuantity").value,
      image: document.getElementById("editPreview").src // grab preview src as image
    };
    productDetails[idx] = updatedProduct;
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
    renderTable();
    editProductModal.hide();
  };

  // Initial render
  renderTable();
});
