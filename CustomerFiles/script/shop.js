let insert = document.getElementById("insertitems");
let arrofdetails = JSON.parse(localStorage.getItem("productDetails")) || [];
console.log(arrofdetails);
let buyitems=JSON.parse(localStorage.getItem("myorders"))||[];


arrofdetails.map((items,index) => {
  const imgsrc = items.image ? items.image : "https://via.placeholder.com/32x32?text=No+Img";
  let resul = document.createElement("div");
  let count = 1;
  resul.className =
    "col px-2";
  insert.appendChild(resul);
  resul.innerHTML = ` <div class="card border-0  border-5 border-success rounded-4 col  p-4">
                        <div class="row g-0 gap-3 align-items-end">
                            <div class="col-3 d-flex ">
                                <img src="${imgsrc}" class="img-fluid rounded-4" alt="...">
                            </div>
                            <div class="col ">
                                <h5 class="card-title fw-bold fs-2">${items.name}</h5>
                                <p class="card-text fs-3">₹${items.price}</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${items.description}</p>
                            <p>Available quantity:${items.quantity} </p>
                            <div class="row gap-3 mt-2 align-items-center">
                            <label for="" class="col-6">Quantity(kg)</label>

                                <button class="btn col-1 btn-outline-danger decrement">-</button>
                                <div class="btn col-2 border border-2 quantitycheck">${count}</div>
                                <button class="btn col-1 btn-outline-success increment">+</button>

                            </div>
                                <div class="row gap-3 mt-2">
                                    <button class="btn btn-outline-success col buybtn">Buy Now</button>
                                <button class="btn btn-outline-warning col btnaddcart">Add to Cart</button>
                                <button class="btn btn-outline-danger col-2"><i class="fa-regular fa-heart"></i></button>
                                </div>
                        </div>
                        </div>
`;
  let btndecrement = resul.querySelector(".decrement");
  let btnincrement = resul.querySelector(".increment");
  let disp = resul.querySelector(".quantitycheck");
  let buynow=resul.querySelector(".buybtn")
  
  function additemstorder(){
    buyitems.push({
      orderid:`000${buyitems.length+1}`,
      customername:"",
      name:items.name,
      price:items.price,
      quantity:count,
      totalprice:(items.price)*count
    })
    localStorage.setItem("myorders", JSON.stringify(buyitems));
    console.log(buyitems);
    
  }
  buynow.addEventListener("click",additemstorder)


  btndecrement.addEventListener("click", () => {
    if (count > 1) count--;
    disp.textContent = count;
  });
  btnincrement.addEventListener("click", () => {
    if (count < items.quantity) count++;
    disp.textContent = count;
  });
});
// localStorage.removeItem("myorders");