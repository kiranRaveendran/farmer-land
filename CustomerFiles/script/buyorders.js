let latestdata=JSON.parse(localStorage.getItem("myorders"))||[]
let insertappend=document.getElementById("orders-table-body")
console.log(latestdata);

function reload(){
  if (!Array.isArray(latestdata)) {
    latestdata = [latestdata];
  }

  insertappend.innerHTML = "";
  latestdata.forEach((item,index)=>{
    const id=String(index + 1).padStart(3, "0")
    item.orderid=id
    
    let insert=document.createElement("tr")
    
     insert.innerHTML = `
          <tr>
            <td>00${item.orderid}</td>
            <td><img src="${item.img}" alt="${item.name}" height="80">${item.name}</td>
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
        insertappend.appendChild(insert)
    let status=insert.querySelector(".status")
    if(status.textContent=="Ordered"){
      status.classList.add("bg-success","p-2","rounded-3","text-white")
    }
    let cancelorder=insert.querySelector(".cancel")
    cancelorder.addEventListener("click",()=>{
      clearInterval(delay)
      latestdata.splice(index, 1);
      localStorage.setItem("myorders", JSON.stringify(latestdata));
      reload()
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
localStorage.setItem("myorders", JSON.stringify(latestdata));
}
reload()
console.log(latestdata);

