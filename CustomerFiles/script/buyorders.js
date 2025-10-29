let latestdata=JSON.parse(localStorage.getItem("myorders"))||[]
console.log(latestdata);

let result=latestdata.map((item)=>{
    let insert=document.getElementById("orders-table-body")
     insert.innerHTML += `
          <tr>
            <td>${item.orderid}</td>
            <td>${item.customername}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.totalprice}</td>
            <td></td>
            <td>
              <button class="btn btn-outline-danger p-2">Cancel order</button>
            </td>
          </tr>
        `;
})

