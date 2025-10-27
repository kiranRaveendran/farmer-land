//--------------------ad HTML into a placeholder
async function loadHTML(url, placeholderId) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  const html = await response.text();
  document.getElementById(placeholderId).innerHTML = html;
}

//------------------- Load sidebar and topbar
async function loadLayout() {
  await loadHTML("sidebar.html", "sidebar-placeholder");
  await loadHTML("topbar.html", "topbar-placeholder");

  //----------------- Highlight active page
  const currentPage = document.body.getAttribute("data-page");
  if (currentPage) {
    const sidebarButtons = document.querySelectorAll("#sidebarMenu button");
    sidebarButtons.forEach((btn) => {
      if (btn.textContent === currentPage) {
        btn.classList.add("bg-success");
        document.getElementById("currentpagename").textContent =
          btn.textContent;
      }
    });
  }
}

//-------------------- Load everything
window.addEventListener("DOMContentLoaded", loadLayout);
