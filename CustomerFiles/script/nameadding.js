let getuser = JSON.parse(localStorage.getItem("currentUser")) || [];
let currentuserr = getuser[0];

let delt = setInterval(() => {
    let name = document.getElementById("namecustomer");
    let btnn = document.getElementById("logout");
    
    if (name) {
        if(currentuserr && currentuserr.name){
            name.textContent = currentuserr.name;
        } else {
            name.textContent = "Guest"; // fallback if no user info present
        }
        clearInterval(delt);
    }
    
    if (btnn) {
        btnn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser"); // corrected case
            window.location.href = "../loginForm.html";
        });
    }
}, 5);
