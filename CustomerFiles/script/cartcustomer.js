
      let cartItems = [
      { image: "images/product-thumb-9.png", name: "Wheat", price: 50, quantity: 2 },
      { image: "images/product-thumb-10.png", name: "Rice", price: 60, quantity: 1 },
      { image: "images/category-thumb-7.jpg", name: "Egg", price: 10, quantity: 5 }
    ];

      const cartBody = document.getElementById("cart-body");
      cartBody.innerHTML = "";

       cartItems.map((item, index) => {
        // console.log(item);
        
          const row = document.createElement("tr");
           row.innerHTML = `
          <td><img src="${item.image}" alt="${item.name}" width="70" height="70"></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>
             <input type="number" min="1" value="${item.quantity}"
                   class="form-control text-center quantity"
                   style="width:80px;margin:auto;">
          </td>
           <td>${(item.price)*(item.quantity)}</td>
          <td><span class="remove-btn">Remove</span></td> `;

           row.querySelector(".remove-btn").addEventListener("click", function() {
            row.remove()
        cartItems.splice(index, 1); 

      });
      let inputs=row.querySelector(".quantity");

  // inputs.forEach(input => {
    // inputs.addEventListener("input", () => {
    //   // let row = input.parentElement.parentElement; 
    //   let price = parseFloat(row.children[2].innerText); 
    //   let qty = input.value;
    //   let subtotal = row.children[4]; 
    //   subtotal.innerText = price * qty;
    // });
  // });
        cartBody.appendChild(row);
       });
      

       
