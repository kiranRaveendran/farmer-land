let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartBody = document.getElementById("cart-body");
cartBody.innerHTML = "";
let subtotal = 0;

cartItems.map((item, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><img src="${item.img}" alt="${item.name}" width="70" height="70"></td>
    <td>${item.name}</td>
    <td class="price">${item.price}</td>
    <td>
      <input type="number" min="1" value="${item.quantity}"
        class="form-control text-center quantity"
        style="width:80px;margin:auto;">
    </td>
    <td >₹<span class="total">${item.price * item.quantity}.00</span></td>
    <td><span class="remove-btn" style="color:red;cursor:pointer;">Remove</span></td>
  `;

  cartBody.appendChild(row);
  let inputs = row.querySelector(".quantity");
  let total = row.querySelector(".total");


  function addtotal() {
    const q = parseFloat(inputs.value) || 0;
    const p = parseFloat(item.price) || 0;
    const t = q * p;
    total.textContent = t.toFixed(2);

   
    cartItems[index].quantity = q;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updatesubtotal();
  }

  inputs.addEventListener("input", addtotal);

  row.querySelector(".remove-btn").addEventListener("click", function () {
    row.remove();
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updatesubtotal();
  });
});

//  Subtotal 
function updatesubtotal() {
  subtotal = 0;
  document.querySelectorAll(".total").forEach((it) => {
    subtotal += parseFloat(it.textContent) || 0;
  });
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("maintotal").textContent=(subtotal+50).toFixed(2)
}
updatesubtotal();
