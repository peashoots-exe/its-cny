/* ============================================
   Chinese New Year 春節 — Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  loadArchiveData();
});

/* --- Tab Switching --- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(target) {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    const btn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
    if (btn) btn.classList.add('active');
    const content = document.getElementById(target);
    if (content) content.classList.add('active');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      history.replaceState(null, '', `#${target}`);
      switchTab(target);
      window.scrollTo(0, 0);
    });
  });

  // Activate tab from hash captured before body was parsed (no scroll occurs)
  const hash = window.__initialTab || '';
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
    // Restore hash in URL after browser's scroll pass is fully complete
    setTimeout(() => {
      history.replaceState(null, '', `#${hash}`);
      window.scrollTo(0, 0);
    }, 50);
  }
}

/* --- Archive Data Loading --- */
function loadArchiveData() {
  loadList('/data/cny.json', 'cny-list');
  loadList('/data/lny.json', 'lny-list');
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
const pageLang = document.documentElement.lang;

function getLocalizedName(entry) {
  if (pageLang === 'zh-TW' && entry.name_TC) return entry.name_TC;
  if (pageLang === 'zh-CN' && entry.name_SC) return entry.name_SC;
  return entry.name;
}

function createCard(entry) {
  const displayName = getLocalizedName(entry);
  const card = document.createElement(entry.url ? 'a' : 'div');
  card.className = 'card';
  if (entry.url) {
    card.href = entry.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.title = `Visit ${entry.name}`;
  }

  const screenshotSrc = entry.screenshot ? '/' + entry.screenshot.replace(/^\//, '') : '';
  const screenshotHTML = entry.screenshot
    ? `<div class="card-screenshot">
         <img src="${escapeHTML(screenshotSrc)}" alt="${escapeHTML(displayName)}" loading="lazy"
              onerror="this.parentElement.classList.add('no-image')">
         <span class="card-placeholder">${escapeHTML(displayName.charAt(0))}</span>
       </div>`
    : `<div class="card-screenshot no-image">
         <span class="card-placeholder">${escapeHTML(displayName.charAt(0))}</span>
       </div>`;

  const noteHTML = entry.note
    ? `<span class="card-note">${escapeHTML(entry.note)}</span>`
    : '';

  card.innerHTML = `
    ${screenshotHTML}
    <div class="card-info">
      <span class="card-name">${escapeHTML(displayName)}</span>
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
