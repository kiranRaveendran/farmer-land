let datasorder=JSON.parse(localStorage.getItem("myorders"))
let orderplaced=document.getElementById("Ordercount")
orderplaced.textContent=datasorder.length
let datascart=JSON.parse(localStorage.getItem("cart"))
let cart=document.getElementById("Cartcount")
console.log(datascart);

cart.textContent=datascart.length






