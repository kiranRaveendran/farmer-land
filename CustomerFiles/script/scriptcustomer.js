async function loadHTML(url, placeholderId) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  const html = await response.text();
  document.getElementById(placeholderId).innerHTML = html;
}

//------------------- Load sidebar and topbar
async function loadLayout() {
  await loadHTML('sidebarcustomer.html', 'sidebar-placeholder');
  await loadHTML('topbarcustomer.html', 'topbar-placeholder');

//----------------- Highlight active page
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    const sidebarButtons = document.querySelectorAll('#sidebarMenu button');
    sidebarButtons.forEach((btn) => {
      if (btn.dataset.page === currentPage) {
        btn.classList.add('bg-success');
        btn.classList.remove('bg-primary');

        const pageNameSpan = document.getElementById('currentpagename');
        if (pageNameSpan) pageNameSpan.textContent = btn.textContent;
      }
    });
  }
}

//-------------------- Load everything
window.addEventListener('DOMContentLoaded', loadLayout);
