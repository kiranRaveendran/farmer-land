// adding cart items to orders
let cartimport = JSON.parse(localStorage.getItem("cart")) || [];
let myorder = JSON.parse(localStorage.getItem("myorders")) || [];
console.log(myorder);

console.log(cartimport);

let checkout = document.getElementById("Checkout");
checkout.addEventListener("click", () => {
  cartimport.forEach((items) => {
    if (items.statusoforder == "Incart") {
      items.statusoforder = "Ordered";
      myorder.push(items);
    }
  });
  localStorage.setItem("myorders", JSON.stringify(myorder));
  cartimport = cartimport.filter((item) => item.statusoforder !== "Ordered");
  localStorage.setItem("cart", JSON.stringify(cartimport));
  alert("checkout complete items Ordered")
});
