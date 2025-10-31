let getuser=JSON.parse(localStorage.getItem("currentUser"))||[];
let currentuser=getuser[0]
let delt=setInterval(()=>{
    let name=document.getElementById("namecustomer")
    if(name){
        name.textContent=currentuser.name
        clearInterval(delt)
        return
    }
},5)