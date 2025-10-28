let buttonaddproduct = document.getElementById("btnaddproduct");
let pname = document.getElementById("Productname");
let category = document.getElementById("Category");
let description = document.getElementById("inputdescription");
let priceperunit = document.getElementById("price");
let quantity = document.getElementById("quantityinstock");
let image = document.getElementById("imageInput");
let arrofdetails = JSON.parse(localStorage.getItem("productDetails")) || [];

// --------invalid
let invalidnamee = document.getElementById("invalidname");
let invalidcategory = document.getElementById("invalidoption");
let invalidquantity = document.getElementById("invalidquantity");
let invaliddescription = document.getElementById("invaliddescription");
let invalidprice = document.getElementById("invalidprice");
let imageinvalid = document.getElementById("imageinvalid");

function checkname() {
  if (pname.value == "") {
    invalidnamee.textContent = "Please enter the product name";
  } else if (/[0-9]/.test(pname.value)) {
    invalidnamee.textContent = "Does not contain Numbers";
  } else invalidnamee.textContent = "";
}
function checkcategory() {
  if (category.value == "")
    invalidcategory.textContent = "Please select a Category";
  else invalidcategory.textContent = "";
  console.log(category.value);
}
function checkdescription() {
  if (description.value == "")
    invaliddescription.textContent = "Please fill product Description";
  else invaliddescription.textContent = "";
}
function checkprice() {
  if (priceperunit.value == "" || priceperunit.value == 0)
    invalidprice.textContent = "Please enter the proce";
  else invalidprice.textContent = "";
}
function checkquantity() {
  if (quantity.value == "")
    invalidquantity.textContent = "Please Enter the Quantity";
  else invalidquantity.textContent = "";
}
function checkimage() {
  if (image.value == "") imageinvalid.textContent = "Please Enter the Quantity";
  else imageinvalid.textContent = "";
}

function addproduct(event) {
  event.preventDefault();
  checkname();
  checkcategory();
  checkdescription();
  checkprice();
  checkquantity;
  if (invalidnamee.textContent != "") pname.focus();
  else if (invalidcategory.textContent !== "") category.focus();
  else if (invaliddescription.textContent !== "") description.focus();
  else if (invalidprice.textContent !== "") priceperunit.focus();
  else if (invalidquantity.textContent !== "") quantity.focus();
  else {
    arrofdetails.push({
      name: pname.value,
      category: category.value,
      description: description.value,
      price: priceperunit.value,
      quantity: quantity.value,
    });
    localStorage.setItem("productDetails", JSON.stringify(arrofdetails));
    console.log(arrofdetails);
    
  }
}
arrofdetails.map((items) => {
  document.getElementById("productcount").textContent = items.name;
});
if (buttonaddproduct) {
  buttonaddproduct.addEventListener("click", addproduct);
  pname.addEventListener("blur", checkname);
  category.addEventListener("blur", checkcategory);
  description.addEventListener("blur", checkdescription);
  priceperunit.addEventListener("blur", checkprice);
  quantity.addEventListener("blur", checkquantity);
}
console.log(arrofdetails);

// buttonaddproduct.addEventListener("click",checkname)
// localStorage.removeItem("productDetails");
// arrofdetails = [];
