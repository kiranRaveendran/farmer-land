
      const tableBody = document.getElementById("farmerTableBody");
      const addbutton = document.getElementById("addbutton");
      const totalfarmer = document.querySelector(".Total-farmers");
      const verifiedfarmer = document.querySelector(".verified-farmer");
      const filterSelect = document.getElementById("filterSelect");
      const searchInput = document.getElementById("searchInput");

      let active = 0;
      let arr = [
        { name: "Ameen", status: "Inactive" },
        { name: "Aathil", status: "Inactive" },
        { name: "Fathima", status: "Inactive" },
      ];

      let currentIndex = 0;
      let farmerToDelete = null;

      function renderFarmers(list) {
        tableBody.innerHTML = "";

        if (list.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="3" class="text-muted py-3">No customers found</td></tr>`;
          return;
        }

        list.forEach((farmer) => {
          const tr = document.createElement("tr");

          let statusClass =
            farmer.status === "Active" ? "badge-delivered" : "badge-cancelled";

          tr.innerHTML = `
            <td class="d-flex align-items-center text-center">
              <img src="ed189191dc22169f0e6786a85f068616.jpg" alt="Farmer" class="profilephoto ms-5"/>
              <div class="ms-3">${farmer.name}</div>
            </td>
            <td><span class="status-cell text-decoration-none ${statusClass} rounded-5 px-2 p-1 text-danger">${farmer.status}</span></td>
            <td class="ms-5">
              <button class="btn btn-sm btn-outline-success toggle-status"><i class="fa-regular fa-circle-check"></i></button>
              <button class="delete-btn btn text-dark"><i class="fa-regular fa-trash-can"></i></button>
              <button class="dropdown-btn btn text-dark"><i class="fa-solid fa-caret-down"></i></button>
            </td>
          `;

          // DETAILS ROW
          const detailsRow = document.createElement("tr");
          detailsRow.style.display = "none";
          detailsRow.innerHTML = `
            <td colspan="3" class="bg-light text-start">
              <div class="p-3">
                <div class="row">
                  <p class="col">Name: ${farmer.name}</p>
                  <p class="col">Phone: 9876543210</p>
                  <p class="col">Email: ${farmer.name.toLowerCase()}@gmail.com</p>
                </div>
                <div class="row">
                  <p class="col">Age: 35</p>
                  <p class="col">Address: Kochi, Kerala</p>
                  <div class="col d-flex align-items-center">
                    <p class="me-5">Aadhar: XXXX XXXX 1234</p>
                    <img src="ed189191dc22169f0e6786a85f068616.jpg" width="100px" height="120px" alt="">
                  </div>
                </div>
              </div>
            </td>
          `;

          const toggleStatusBtn = tr.querySelector(".toggle-status");
          const deleteBtn = tr.querySelector(".delete-btn");
          const dropdownBtn = tr.querySelector(".dropdown-btn");
          const statusCell = tr.querySelector(".status-cell");

          // TOGGLE STATUS
          toggleStatusBtn.addEventListener("click", () => {
            if (farmer.status === "Inactive") {
              farmer.status = "Active";
              active++;
            } else {
              farmer.status = "Inactive";
              active--;
            }
            verifiedfarmer.textContent = active;
            statusCell.textContent = farmer.status;
            statusCell.className = `status-cell text-decoration-none ${
              farmer.status === "Active"
                ? "badge-delivered"
                : "badge-cancelled "
            } rounded-5 px-2 p-1 text-danger`;
            if (farmer.status == "Active") {
              toggleStatusBtn.className = "btn btn-sm btn-success";
            } else {
              toggleStatusBtn.className = "btn btn-sm btn-outline-success";
            }
          });

          // DELETE BUTTON
          deleteBtn.addEventListener("click", () => confirmDelete(farmer));

          // DROPDOWN BUTTON (show/hide details)
          dropdownBtn.addEventListener("click", () => {
            detailsRow.style.display =
              detailsRow.style.display === "none" ? "table-row" : "none";
          });

          tableBody.appendChild(tr);
          tableBody.appendChild(detailsRow);
        });
      }

      function confirmDelete(farmer) {
        farmerToDelete = farmer;
        document.getElementById("farmerName").textContent = farmer.name;

        const deleteModal = new bootstrap.Modal(
          document.getElementById("deleteModal")
        );
        deleteModal.show();

        document.getElementById("confirmDeleteBtn").onclick = function () {
          const index = arr.indexOf(farmerToDelete);
          if (index !== -1) {
            if (arr[index].status === "Active") active--;
            arr.splice(index, 1);
          }
          currentIndex = Math.min(currentIndex, arr.length);
          totalfarmer.textContent = arr.length;
          verifiedfarmer.textContent = active;
          renderFarmers(arr.slice(0, currentIndex));
          deleteModal.hide();
        };
      }

      addbutton.addEventListener("click", () => {
        if (currentIndex >= arr.length) return;
        currentIndex++;
        totalfarmer.textContent = currentIndex;
        renderFarmers(arr.slice(0, currentIndex));
      });

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

      totalfarmer.textContent = currentIndex;
      verifiedfarmer.textContent = active;
      renderFarmers(arr.slice(0, currentIndex));
