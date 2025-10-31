
      let cartItems = JSON.parse(localStorage.getItem("cart"))||[]

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
           <td >${(item.price)*(item.quantity)}</td>
          <td><span class="remove-btn">Remove</span></td> `;

           row.querySelector(".remove-btn").addEventListener("click", function() {
            row.remove()
            localStorage.removeItem("cart")
            
        cartItems.splice(index, 1); 

      });
      let inputs=row.querySelector(".quantity");
      console.log(inputs.value);
      

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
      

       
