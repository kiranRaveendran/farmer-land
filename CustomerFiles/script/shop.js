let insert = document.getElementById("insertitems");
let arrofdetails = JSON.parse(localStorage.getItem("productDetails")) || [];
console.log(arrofdetails);

arrofdetails.map((items) => {
  let resul = document.createElement("div");
  let count = 0;
  resul.className =
    "col px-2";
  insert.appendChild(resul);
  resul.innerHTML = ` <div class="card border-0 border-top border-start border-5 border-success rounded-4 col  p-3">
                        <div class="row g-0 gap-3 align-items-end">
                            <div class="col-3 d-flex align-items-center">
                                <img src="category-thumb-8.jpg" class="img-fluid rounded-4" alt="...">
                            </div>
                            <div class="col ">
                                <h5 class="card-title ">${items.name}</h5>
                                <p class="card-text fs-3">₹${items.price}</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${items.description}</p>
                            <p>Available quantity:${items.quantity} </p>
                            <div class="row gap-3 mt-2 align-items-center">
                            <label for="" class="col">Quantity(kg)</label>

                                <button class="btn col btn-danger decrement">-</button>
                                <div class="btn col border border-2 quantitycheck">${count}</div>
                                <button class="btn col btn-success increment">+</button>

                            </div>
                                <div class="row gap-3 mt-2">
                                    <button class="btn btn-success col">Buy Now</button>
                                <button class="btn btn-warning col">Add to Cart</button>
                                </div>
                        </div>
                        </div>
`;
  let btndecrement = resul.querySelector(".decrement");
  let btnincrement = resul.querySelector(".increment");
  let disp = resul.querySelector(".quantitycheck");

  btndecrement.addEventListener("click", () => {
    if (count > 0) count--;
    disp.textContent = count;
  });
  btnincrement.addEventListener("click", () => {
    if (count < items.quantity) count++;
    disp.textContent = count;
  });
});
