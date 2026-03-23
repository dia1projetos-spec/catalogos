*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f7f5f2;
  --surface: #ffffff;
  --ink: #1a1a1a;
  --ink-soft: #6b6b6b;
  --ink-faint: #a8a49e;
  --accent: #1a1a1a;
  --accent-hover: #000;
  --border: #e0ddd8;
  --border-light: #eeece9;
  --danger: #c0392b;
  --danger-hover: #962d22;
  --shadow: 0 1px 4px rgba(0,0,0,0.07);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.10);
  --radius: 2px;
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'DM Sans', sans-serif;
  --nav-h: 60px;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
}

/* ── NAVBAR ── */
.navbar {
  position: sticky; top: 0; z-index: 100;
  height: var(--nav-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  gap: 16px;
}

.nav-left { display: flex; align-items: center; gap: 10px; }

.brand-icon { font-size: 20px; }

.nav-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.04em;
}

.nav-right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.btn-nav {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--ink);
  padding: 7px 14px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-nav:hover { background: var(--ink); color: #fff; border-color: var(--ink); }

.btn-pdf { background: var(--ink); color: #fff; border-color: var(--ink); }
.btn-pdf:hover { background: #000; }

.btn-logout { border-color: transparent; color: var(--ink-soft); }
.btn-logout:hover { background: #f0ede9; color: var(--ink); border-color: var(--border); }

/* ── MAIN ── */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

/* ── EMPTY STATE ── */
.empty-state {
  text-align: center;
  padding: 100px 24px;
  color: var(--ink-soft);
}
.empty-icon { font-size: 40px; display: block; margin-bottom: 20px; opacity: 0.3; }
.empty-state p { font-size: 16px; margin-bottom: 6px; }
.empty-sub { font-size: 13px; color: var(--ink-faint); margin-bottom: 28px; }

/* ── BUTTONS ── */
.btn-primary {
  font-family: var(--font-body);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  background: var(--accent); color: #fff;
  border: none; padding: 11px 22px;
  border-radius: var(--radius); cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: var(--accent-hover); }

.btn-secondary {
  font-family: var(--font-body);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  background: transparent; color: var(--ink-soft);
  border: 1px solid var(--border); padding: 11px 22px;
  border-radius: var(--radius); cursor: pointer;
  transition: all 0.15s;
}
.btn-secondary:hover { border-color: var(--ink); color: var(--ink); }

.btn-danger {
  font-family: var(--font-body);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  background: var(--danger); color: #fff;
  border: none; padding: 11px 22px;
  border-radius: var(--radius); cursor: pointer;
  transition: background 0.15s;
}
.btn-danger:hover { background: var(--danger-hover); }

.btn-link {
  background: none; border: none;
  color: var(--ink-soft); font-size: 13px;
  cursor: pointer; padding: 4px 0;
  text-decoration: underline; text-underline-offset: 3px;
  font-family: var(--font-body);
}
.btn-link:hover { color: var(--ink); }

/* ── CATEGORY BLOCK ── */
.category-block {
  margin-bottom: 52px;
  animation: fadeUp 0.3s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.category-header {
  display: flex; align-items: center; gap: 12px;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 12px;
  margin-bottom: 28px;
  cursor: grab;
}
.category-header:active { cursor: grabbing; }

.drag-handle-cat {
  color: var(--ink-faint); font-size: 18px;
  cursor: grab; user-select: none; flex-shrink: 0;
}

.category-name {
  font-family: var(--font-display);
  font-size: 28px; font-weight: 300;
  letter-spacing: 0.03em;
  flex: 1;
}

.category-actions { display: flex; gap: 8px; align-items: center; margin-left: auto; }

.btn-icon {
  background: none; border: 1px solid var(--border-light);
  color: var(--ink-soft); width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius); cursor: pointer; font-size: 14px;
  transition: all 0.15s; flex-shrink: 0;
}
.btn-icon:hover { border-color: var(--ink); color: var(--ink); background: var(--bg); }
.btn-icon.danger:hover { border-color: var(--danger); color: var(--danger); }

/* ── SUBCATEGORY ── */
.subcategory-section { margin-bottom: 32px; }

.subcategory-label {
  font-size: 11px; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--ink-soft);
  margin-bottom: 16px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
}
.subcategory-label::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

/* ── PRODUCT GRID ── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 20px;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: grab;
}
.product-card:active { cursor: grabbing; }
.product-card:hover { box-shadow: var(--shadow-md); }
.product-card.dragging { opacity: 0.4; transform: scale(0.97); }
.product-card.drag-over { border-color: var(--ink); border-style: dashed; }

.product-card-actions {
  position: absolute; top: 10px; right: 10px;
  display: flex; gap: 4px;
  opacity: 0; transition: opacity 0.15s;
}
.product-card:hover .product-card-actions { opacity: 1; }

.product-drag-handle {
  position: absolute; top: 10px; left: 10px;
  color: var(--ink-faint); font-size: 14px;
  opacity: 0; transition: opacity 0.15s; cursor: grab;
}
.product-card:hover .product-drag-handle { opacity: 1; }

.product-name {
  font-family: var(--font-display);
  font-size: 19px; font-weight: 400;
  margin-bottom: 8px; padding-right: 24px;
  line-height: 1.25;
}

.product-desc {
  font-size: 12px; color: var(--ink-soft);
  line-height: 1.5; margin-bottom: 14px;
}

.product-price {
  font-size: 15px; font-weight: 500;
  color: var(--ink); letter-spacing: 0.02em;
}

/* ── ADD PRODUCT BTN ── */
.btn-add-product {
  background: none; border: 1px dashed var(--border);
  color: var(--ink-soft); font-size: 12px;
  font-family: var(--font-body); letter-spacing: 0.08em;
  text-transform: uppercase; padding: 10px 18px;
  border-radius: var(--radius); cursor: pointer;
  transition: all 0.15s;
}
.btn-add-product:hover { border-color: var(--ink); color: var(--ink); background: var(--surface); }

/* ── MODAL ── */
.modal-overlay {
  display: none;
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 200;
  align-items: center; justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease;
}
.modal-overlay.open { display: flex; }

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal {
  background: var(--surface);
  padding: 40px;
  width: 100%; max-width: 480px;
  animation: slideUp 0.25s ease;
  max-height: 90vh; overflow-y: auto;
}
.modal-sm { max-width: 360px; }

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

.modal-title {
  font-family: var(--font-display);
  font-size: 26px; font-weight: 300;
  margin-bottom: 28px;
}

.form-group {
  display: flex; flex-direction: column; gap: 7px;
  margin-bottom: 18px;
}

.form-group label {
  font-size: 11px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ink-soft);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 11px 13px;
  font-size: 14px; font-family: var(--font-body);
  color: var(--ink); background: var(--bg);
  outline: none; transition: border-color 0.2s;
  resize: vertical;
}
.form-group input:focus,
.form-group textarea:focus { border-color: var(--ink); background: #fff; }

.form-group textarea { min-height: 80px; }

.sub-label {
  font-size: 11px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ink-soft);
  font-weight: 500; display: block; margin-bottom: 10px;
}

#subList { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }

.sub-row { display: flex; gap: 8px; align-items: center; }
.sub-row input {
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 9px 12px; font-size: 13px; flex: 1;
  font-family: var(--font-body); outline: none;
  transition: border-color 0.2s; background: var(--bg);
}
.sub-row input:focus { border-color: var(--ink); background: #fff; }
.sub-row button {
  background: none; border: none; color: var(--ink-soft);
  font-size: 18px; cursor: pointer; padding: 4px 6px;
  line-height: 1; transition: color 0.15s;
}
.sub-row button:hover { color: var(--danger); }

.hint { color: var(--ink-faint); font-size: 10px; font-weight: 300; }
.req  { color: var(--danger); }

.modal-actions {
  display: flex; gap: 10px; justify-content: flex-end;
  margin-top: 28px;
}

.confirm-text { font-size: 14px; color: var(--ink-soft); line-height: 1.6; }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  background: var(--ink); color: #fff;
  font-size: 13px; padding: 12px 24px;
  border-radius: var(--radius);
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s;
  z-index: 999; white-space: nowrap;
}
.toast.show { opacity: 1; }

/* ── DRAG OVER CATEGORY ── */
.category-block.cat-drag-over { outline: 2px dashed var(--ink-faint); outline-offset: 4px; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .navbar { padding: 0 16px; }
  .nav-title { font-size: 20px; }
  .main-content { padding: 28px 16px 60px; }
  .products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .modal { padding: 28px 20px; }
}

@media (max-width: 480px) {
  .nav-right .btn-nav:not(.btn-pdf):not(.btn-logout) { display: none; }
  .products-grid { grid-template-columns: 1fr 1fr; }
}

/* ── PRINT / PDF ── */
@media print {
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .navbar, .category-actions, .product-card-actions,
  .product-drag-handle, .drag-handle-cat,
  .btn-add-product, .toast, .modal-overlay { display: none !important; }

  body { background: #fff; font-size: 12px; }

  .main-content { padding: 0; max-width: 100%; }

  .category-block { page-break-inside: avoid; margin-bottom: 36px; }

  .category-name { font-size: 22px; }

  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .product-card {
    border: 1px solid #ccc;
    padding: 14px;
    break-inside: avoid;
  }

  .product-name { font-size: 15px; }
  .product-price { font-size: 13px; font-weight: 600; }
}
