/* ============================================
   Chinese New Year 春節 — Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLanguageToggle();
  loadArchiveData();
});

/* --- Tab Switching --- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

/* --- Language Toggle (Tab 2) --- */
function initLanguageToggle() {
  const langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;

      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.getElementById('article-en').style.display = (lang === 'en') ? '' : 'none';
      document.getElementById('article-tc').style.display = (lang === 'tc') ? '' : 'none';
    });
  });
}

/* --- Archive Data Loading --- */
function loadArchiveData() {
  loadList('data/cny.json', 'cny-list');
  loadList('data/lny.json', 'lny-list');
}

async function loadList(url, containerId) {
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    data.forEach(entry => {
      const card = createCard(entry);
      container.appendChild(card);
    });
  } catch (err) {
    console.error(`Failed to load ${url}:`, err);
    container.innerHTML = `<p style="color: var(--text-muted); padding: 1rem; font-size: 0.85rem;">Unable to load data. Please try refreshing the page.</p>`;
  }
}

/* --- Card Rendering --- */
function createCard(entry) {
  const card = document.createElement('a');
  card.className = 'card';
  card.href = entry.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.title = `Visit ${entry.name}`;

  const screenshotHTML = entry.screenshot
    ? `<div class="card-screenshot">
         <img src="${escapeHTML(entry.screenshot)}" alt="${escapeHTML(entry.name)}" loading="lazy"
              onerror="this.parentElement.classList.add('no-image')">
         <span class="card-placeholder">${escapeHTML(entry.name.charAt(0))}</span>
       </div>`
    : `<div class="card-screenshot no-image">
         <span class="card-placeholder">${escapeHTML(entry.name.charAt(0))}</span>
       </div>`;

  const noteHTML = entry.note
    ? `<span class="card-note">${escapeHTML(entry.note)}</span>`
    : '';

  card.innerHTML = `
    ${screenshotHTML}
    <div class="card-info">
      <span class="card-name">${escapeHTML(entry.name)}</span>
      ${noteHTML}
    </div>
  `;

  return card;
}

/* --- Utilities --- */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
