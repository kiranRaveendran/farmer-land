let getuser=JSON.parse(localStorage.getItem("currentUser"))||[];
let currentuserr=getuser[0]



let delt=setInterval(()=>{
    let btnn=document.getElementById("logout")
    if(btnn){
        btnn.addEventListener("click",(e)=>{
            e.preventDefault()
            localStorage.removeItem("currentuser")
            window.location.href="../loginForm.html"
        })
        
    }
    return 
},5)
console.log(getuser);
