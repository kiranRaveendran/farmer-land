let latestdata=JSON.parse(localStorage.getItem("myorders"))||[]
console.log(latestdata);

let result=latestdata.map((item)=>{
    let insertappend=document.getElementById("orders-table-body")
    let insert=document.createElement("tr")
    insertappend.appendChild(insert)
     insert.innerHTML = `
          <tr>
            <td>${item.orderid}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.totalprice}</td>
            <td ><span class="status">${item.statusoforder}</span></td>
            <td>
            <button class="btn btn-outline-primary p-2">Track order</button>
            <td>
              <button class="btn btn-outline-danger p-2 cancel">Cancel order</button>
              <div class="time">05:00</div>
            </td>
          </tr>
        `;
    let status=insert.querySelector(".status")
    if(status.textContent=="Ordered"){
      status.classList.add("bg-success","p-2","rounded-3","text-white")
    }
    let cancelorder=insert.querySelector(".cancel")
    cancelorder.addEventListener("click",()=>{
      clearInterval(delay)
      let getarray=JSON.parse(localStorage.getItem("myorders"))||[]
      let resultt=getarray.filter((h)=>h.orderid!==item.orderid)
      localStorage.setItem("myorders",JSON.stringify(resultt))
      insert.remove()
    })
  
    let time=insert.querySelector(".time")
    console.log(time);
    let delay=null
    let second=60
    let minute=5
    function display(){
      let s=String(second).padStart(2,"0")
      let m=String(minute).padStart(2,"0")
      time.textContent=`${m}:${s}`
    }
    function canceltime(){
      if(delay) return  
      delay=setInterval(() => {
        if(minute===0 && second===0){
          clearInterval(delay)
          display()
          cancelorder.disabled=true
          return
        }
        if(second===0){
          second=59
          minute--
        }
        else{
          second--
        }
        display()
      }, 1000);
    }
    canceltime()
})

console.log(latestdata);

