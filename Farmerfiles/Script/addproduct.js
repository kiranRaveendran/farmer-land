// Script/addproduct.js

let buttonaddproduct = document.getElementById("btnaddproduct");
let pname = document.getElementById("Productname");
let category = document.getElementById("Category");
let description = document.getElementById("inputdescription");
let priceperunit = document.getElementById("price");
let quantity = document.getElementById("quantityinstock");
let image = document.getElementById("imageInput");
let arrofdetails = JSON.parse(localStorage.getItem("productDetails")) || [];

// Invalid fields selectors
let invalidnamee = document.getElementById("invalidname");
let invalidcategory = document.getElementById("invalidoption");
let invalidquantity = document.getElementById("invalidquantity");
let invaliddescription = document.getElementById("invaliddescription");
let invalidprice = document.getElementById("invalidprice");
let imageinvalid = document.querySelector(".imageinvalid");

function checkname() {
  if (pname.value == "") {
    invalidnamee.textContent = "Please enter the product name";
    return false;
  } else if (/[0-9]/.test(pname.value)) {
    invalidnamee.textContent = "Does not contain Numbers";
    return false;
  } else {
    invalidnamee.textContent = "";
    return true;
  }
}
function checkcategory() {
  if (category.value == "") {
    invalidcategory.textContent = "Please select a Category";
    return false;
  } else {
    invalidcategory.textContent = "";
    return true;
  }
}
function checkdescription() {
  if (description.value == "") {
    invaliddescription.textContent = "Please fill product Description";
    return false;
  } else {
    invaliddescription.textContent = "";
    return true;
  }
}
function checkprice() {
  if (priceperunit.value == "" || Number(priceperunit.value) <= 0) {
    invalidprice.textContent = "Please enter a valid price";
    return false;
  } else {
    invalidprice.textContent = "";
    return true;
  }
}
function checkquantity() {
  if (quantity.value == "" || Number(quantity.value) < 0) {
    invalidquantity.textContent = "Please Enter the Quantity";
    return false;
  } else {
    invalidquantity.textContent = "";
    return true;
  }
}
function checkimage() {
  if (!image.value) {
    imageinvalid.textContent = "Please upload a product image";
    return false;
  } else {
    imageinvalid.textContent = "";
    return true;
  }
}

// Main addproduct handler
function addproduct(event) {
  event.preventDefault();

  let validName = checkname();
  let validCategory = checkcategory();
  let validDesc = checkdescription();
  let validPrice = checkprice();
  let validQty = checkquantity();
  let validImg = checkimage();

  if (!validName) {
    pname.focus(); return;
  } else if (!validCategory) {
    category.focus(); return;
  } else if (!validDesc) {
    description.focus(); return;
  } else if (!validPrice) {
    priceperunit.focus(); return;
  } else if (!validQty) {
    quantity.focus(); return;
  } else if (!validImg) {
    image.focus(); return;
  }

  // Save product including image preview (base64)
  if (image.files && image.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      arrofdetails.push({
        name: pname.value,
        category: category.value,
        description: description.value,
        price: priceperunit.value,
        quantity: quantity.value,
        image: e.target.result
      });
      localStorage.setItem("productDetails", JSON.stringify(arrofdetails));
      alert("Product added successfully!");
      document.querySelector("form").reset();
      document.getElementById("preview").style.display = "none";
      document.getElementById("uploadText").style.display = "";
      document.getElementById("uploadicon").style.display = "";
    };
    reader.readAsDataURL(image.files[0]);
  } else {
    arrofdetails.push({
      name: pname.value,
      category: category.value,
      description: description.value,
      price: priceperunit.value,
      quantity: quantity.value,
      image: ""
    });
    localStorage.setItem("productDetails", JSON.stringify(arrofdetails));
    alert("Product added successfully!");
    document.querySelector("form").reset();
    document.getElementById("preview").style.display = "none";
    document.getElementById("uploadText").style.display = "";
    document.getElementById("uploadicon").style.display = "";
  }
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById('preview');
    preview.src = reader.result;
    preview.style.display = 'block';
    document.getElementById('uploadText').style.display = 'none';
    document.getElementById('uploadicon').style.display = 'none';
  };
  reader.readAsDataURL(event.target.files[0]);
}

if (buttonaddproduct) {
  buttonaddproduct.addEventListener("click", addproduct);
  pname.addEventListener("blur", checkname);
  category.addEventListener("blur", checkcategory);
  description.addEventListener("blur", checkdescription);
  priceperunit.addEventListener("blur", checkprice);
  quantity.addEventListener("blur", checkquantity);
  image.addEventListener("blur", checkimage);
  image.addEventListener("change", previewImage);
}

// Uncomment for testing (to clear products storage)
// localStorage.removeItem("productDetails");
