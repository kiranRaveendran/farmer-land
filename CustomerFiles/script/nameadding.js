let getuser=JSON.parse(localStorage.getItem("currentUser"))||[];
let currentuserr=getuser[0]



let delt=setInterval(()=>{
    let name=document.getElementById("namecustomer")
    let btnn=document.getElementById("logout")

    if(name){
        
        name.textContent=currentuserr.name
    console.log(name);
    console.log(currentuserr);
        clearInterval(delt)
    }
    if(btnn){
        btnn.addEventListener("click",(e)=>{
            e.preventDefault()
            localStorage.removeItem("currentuser")
            window.location.href="../loginForm.html"
        })
        
    }
    return 
},5)