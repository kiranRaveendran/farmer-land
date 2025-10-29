
    
      const tableBody = document.getElementById("farmerTableBody");
      const addbutton = document.getElementById("addbutton");
      const totalfarmer = document.querySelector(".Total-farmers");
      const verifiedfarmer = document.querySelector(".verified-farmer");
      const filterSelect = document.getElementById("filterSelect");
      const searchInput = document.getElementById("searchInput");

      let active = 0;
      let arr = [
        { name: "Ameen", auth: null, status: "Inactive" },
        { name: "Rahul", auth: null, status: "Inactive" },
        { name: "Fathima", auth: null, status: "Inactive" },
      ];

      let currentIndex = 0; // To add one farmer per click
      let farmerToDelete = null; // for modal deletion

      // RENDER TABLE
      function renderFarmers(list) {
        tableBody.innerHTML = "";
        if (list.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="4" class="text-muted py-3 mx-auto ">No farmers found</td></tr>`;
          return;
        }

        list.forEach((farmer, index) => {
          const tr = document.createElement("tr");

          let statusClass = "";
          if (farmer.status === "Active") statusClass = "badge-delivered";
          else if (farmer.status === "Pending")
            statusClass = "badge-processing";
          else statusClass = "badge-cancelled";

          tr.innerHTML = `
      <td class="d-flex align-items-center text-center">
        <img src="ed189191dc22169f0e6786a85f068616.jpg" alt="Farmer" class="profilephoto ms-5"/>
        <div class="ms-3">${farmer.name}</div>
      </td>
      <td><a href="#" class="auth-cell text-dark text-decoration-none">${
        farmer.auth ?? "Not checked"
      }</a></td>
      
      <td><a href="#" class="status-cell text-decoration-none ${statusClass} rounded-5 px-2 p-1 text-danger">${
            farmer.status
          }</a></td>
     <td class="ms-5">
              <button class="btn btn-sm btn-outline-success  submit-btn"><i class="fa-regular fa-circle-check"></i></button>
              <button class="delete-btn btn text-dark"><i class="fa-regular fa-trash-can"></i></button>
              <button class="dropdown-btn details btn text-dark"><i class="fa-solid fa-caret-down"></i></button>
            </td>
    `;

          // DETAILS ROW
          const detailsRow = document.createElement("tr");
          detailsRow.style.display = "none";
          detailsRow.innerHTML = `
      <td colspan="5" class="bg-light text-start">
        <div class="p-3">
          <div class="row">
            <p class="col">Name: ${farmer.name}</p>
            <p class="col">Phone Number: 9876543210</p>
            <p class="col">Email: ${farmer.name.toLowerCase()}@gmail.com</p>
          </div>
          <div class="row justify-content-center align-items-center">
            <p class="col">Age: 35</p>
            <p class="col">Address: Kochi, Kerala</p>
            <div class="col d-flex align-items-center">
              <p class="me-5">Aadhar No: XXXX XXXX 1234</p>
              <img src="ed189191dc22169f0e6786a85f068616.jpg" width="100px" height="120px" alt="">
            </div>
            <button class="verify-button btn btn-success">Validate</button>
          </div>
        </div>
      </td>
    `;

          const verifyButton = detailsRow.querySelector(".verify-button");
          const authCell = tr.querySelector(".auth-cell");
          const detailsLink = tr.querySelector(".details");
          const submitBtn = tr.querySelector(".submit-btn");
          const statusCell = tr.querySelector(".status-cell");
          const deleteBtn = tr.querySelector(".delete-btn");

          let authText = farmer.auth ?? "Not checked";

          // VERIFY BUTTON
          verifyButton.addEventListener("click", () => {
            if (verifyButton.textContent.toLowerCase() === "validate") {
              authText = "Completed";
              authCell.textContent = authText;
              authCell.style.fontWeight = "bold";
              authCell.style.color = "green";
              verifyButton.textContent = "Invalidate";

              if (farmer.status !== "Active") {
                farmer.status = "Pending";
                statusCell.textContent = "Pending";
                statusCell.className =
                  "text-decoration-none badge-processing rounded-5 px-2 p-1 text-light";
              }
            } else {
              if (farmer.status === "Active" && active > 0) {
                active--;
                verifiedfarmer.textContent = active;
              }

              authText = "Incomplete";
              authCell.textContent = authText;
              authCell.style.color = "black";
              verifyButton.textContent = "Validate";

              farmer.status = "Inactive";
              statusCell.textContent = "Inactive";
              statusCell.className =
                "text-decoration-none badge-cancelled rounded-5 px-2 p-1 text-danger";
                submitBtn.className="btn btn-sm btn-outline-success"
            }
          });

          // SUBMIT BUTTON
          // SUBMIT BUTTON
          submitBtn.addEventListener("click", () => {
            if (farmer.status === "Pending" && authText === "Completed") {
              // Activate farmer
              farmer.status = "Active";
              active++;
              verifiedfarmer.textContent = active;
              statusCell.textContent = "Active";
              statusCell.className =
                "text-decoration-none badge-delivered rounded-5 px-2 p-1 text-light";
              submitBtn.className = "btn btn-sm btn-success";
            } else if (farmer.status === "Active") {
              // Move back to Pending
              farmer.status = "Pending";
              if (active > 0) active--;
              verifiedfarmer.textContent = active;
              statusCell.textContent = "Pending";
              statusCell.className =
                "text-decoration-none badge-processing rounded-5 px-2 p-1 text-danger";
              submitBtn.className = "btn btn-sm btn-outline-success";
            }
          });

          // DETAILS TOGGLE
          detailsLink.addEventListener("click", (e) => {
            e.preventDefault();
            detailsRow.style.display =
              detailsRow.style.display === "none" ? "table-row" : "none";
          });

          // DELETE BUTTON (show modal)
          deleteBtn.addEventListener("click", () => {
            confirmDelete(farmer);
          });

          tableBody.appendChild(tr);
          tableBody.appendChild(detailsRow);
        });
      }

      // CONFIRM DELETE (outside render loop)
      function confirmDelete(farmer) {
        farmerToDelete = farmer;
        document.getElementById("farmerName").textContent = farmer.name;

        const deleteModal = new bootstrap.Modal(
          document.getElementById("deleteModal")
        );
        deleteModal.show();

        const confirmBtn = document.getElementById("confirmDeleteBtn");
        confirmBtn.onclick = function () {
          const indexToRemove = arr.indexOf(farmerToDelete);
          if (indexToRemove !== -1) arr.splice(indexToRemove, 1);

          currentIndex = Math.min(currentIndex, arr.length);
          totalfarmer.textContent = arr.length;
          renderFarmers(arr.slice(0, currentIndex));

          deleteModal.hide();
        };
      }

      // ADD FARMER
      addbutton.addEventListener("click", () => {
        if (currentIndex >= arr.length) return;
        currentIndex++;
        totalfarmer.textContent = currentIndex;
        renderFarmers(arr.slice(0, currentIndex));
      });

      // FILTER + SEARCH
      filterSelect.addEventListener("change", search);
      searchInput.addEventListener("input", search);

      function search() {
        const searchText = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;
        const visibleFarmers = arr.slice(0, currentIndex).filter((farmer) => {
          const matchesSearch = farmer.name.toLowerCase().includes(searchText);
          const matchesFilter =
            filterValue === "all" || farmer.status === filterValue;
          return matchesSearch && matchesFilter;
        });
        renderFarmers(visibleFarmers);
      }

      // INITIALIZE
      totalfarmer.textContent = currentIndex;
      verifiedfarmer.textContent = active;
      renderFarmers(arr.slice(0, currentIndex));
    