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

  // Highlight active page
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    const sidebarButtons = document.querySelectorAll('#sidebarMenu [data-page]');
    sidebarButtons.forEach((btn) => {
      if (btn.getAttribute('data-page') === currentPage) {
        btn.classList.add('bg-white', 'text-dark');
        btn.classList.remove('text-white');
      } else {
        btn.classList.remove('bg-success', 'text-light');
        btn.classList.add('text-white');
      }
    });
    // Optional: update topbar
    const pageNameSpan = document.getElementById('currentpagename');
    if (pageNameSpan) {
      const prettyName = currentPage.charAt(0).toUpperCase() + currentPage.substr(1);
      pageNameSpan.textContent = prettyName;
    }
  }
}

//-------------------- Load everything
window.addEventListener("DOMContentLoaded", loadLayout);
