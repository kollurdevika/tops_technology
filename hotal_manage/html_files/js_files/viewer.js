// js/viewer.js
import { StorageUtil } from './utils.js';

export default class SubmissionViewer {
  constructor({ storageKey = 'submissions', container, searchInput, exportBtn, importBtn, importFile, clearAllBtn }) {
    this.storageKey = storageKey;
    this.container = container;
    this.searchInput = searchInput;
    this.exportBtn = exportBtn;
    this.importBtn = importBtn;
    this.importFile = importFile;
    this.clearAllBtn = clearAllBtn;
    this.data = [];
    this._handleClick = this._handleClick.bind(this);
  }

  init() {
    this._load();
    this._render();
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this._render());
    }
    if (this.exportBtn) {
      this.exportBtn.addEventListener('click', () => this._exportJSON());
    }
    if (this.importBtn && this.importFile) {
      this.importBtn.addEventListener('click', () => this.importFile.click());
      this.importFile.addEventListener('change', (e) => this._importJSON(e));
    }
    if (this.clearAllBtn) {
      this.clearAllBtn.addEventListener('click', () => {
        if (!confirm('Clear ALL submissions?')) return;
        StorageUtil.clear(this.storageKey);
        this._load();
        this._render();
      });
    }
    this.container.addEventListener('click', this._handleClick);
  }

  _load() {
    this.data = StorageUtil.getItem(this.storageKey) || [];
  }

  _filter() {
    const q = (this.searchInput?.value || '').trim().toLowerCase();
    if (!q) return this.data.slice().reverse(); // latest first
    return this.data.filter(item => {
      const name = (item.name || '').toLowerCase();
      const date = (item.submittedAt || '').slice(0,10); // YYYY-MM-DD
      return name.includes(q) || date.includes(q);
    }).reverse();
  }

  _render() {
    this._load();
    const list = this._filter();
    if (!list.length) {
      this.container.innerHTML = '<div class="no-data card p-4">No data found.</div>';
      return;
    }

    const rows = list.map(item => `
      <tr data-id="${item.id}">
        <td>
          <div><strong>${escapeHtml(item.name)}</strong></div>
          <div class="small-muted">${escapeHtml(item.email)} • ${escapeHtml(item.phone)}</div>
        </td>
        <td>${escapeHtml(item.aadhar || '')}</td>
        <td>${escapeHtml(item.address || '')}</td>
        <td>${escapeHtml(item.checkin || '')} → ${escapeHtml(item.checkout || '')}</td>
        <td>${escapeHtml(item.adults || '')}</td>
        <td style="min-width:220px;">
          <div>${escapeHtml(item.purpose || '')}</div>
          <div class="small-muted">Submitted: ${formatDate(item.submittedAt)}</div>
        </td>
        <td class="text-end">
          <button class="btn btn-sm btn-danger btn-delete">Delete</button>
        </td>
      </tr>
    `).join('');

    const html = `
      <div class="card shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped mb-0">
              <thead class="table-light">
                <tr>
                  <th>Guest</th>
                  <th>Aadhar</th>
                  <th>Address</th>
                  <th>Stay</th>
                  <th>Adults</th>
                  <th>Purpose & meta</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  _handleClick(e) {
    const t = e.target;
    if (t.matches('.btn-delete')) {
      const tr = t.closest('tr');
      const id = tr?.dataset.id;
      if (!id) return;
      if (!confirm('Delete this record?')) return;
      this._delete(id);
    }
  }

  _delete(id) {
    const arr = StorageUtil.getItem(this.storageKey) || [];
    const newArr = arr.filter(item => item.id !== id);
    StorageUtil.setItem(this.storageKey, newArr);
    this._load();
    this._render();
  }

  _exportJSON() {
    const data = StorageUtil.getItem(this.storageKey) || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  _importJSON(event) {
    const file = (event.target.files || [])[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!Array.isArray(imported)) throw new Error('Invalid format - expected an array');
        const existing = StorageUtil.getItem(this.storageKey) || [];
        // merge but avoid duplicate ids: if imported item lacks id add new id
        imported.forEach(item => {
          if (!item.id) item.id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
        });
        const merged = existing.concat(imported);
        StorageUtil.setItem(this.storageKey, merged);
        this._load();
        this._render();
        alert('Import successful');
      } catch (err) {
        console.error(err);
        alert('Import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
    // reset file input
    event.target.value = '';
  }
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleString();
}

function escapeHtml(s = '') {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}
