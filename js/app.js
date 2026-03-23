// ─────────────────────────────────────────────
// Firebase config — SUBSTITUIR com seus dados
// ─────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────
let currentUser = null;
let catalog = []; // Array of category objects

// category = { id, name, subcategories: [{id,name}], products: [{id,name,desc,price,subcategoryId}] }

function uid() { return '_' + Math.random().toString(36).slice(2, 10); }

// ─────────────────────────────────────────────
// Auth guard
// ─────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }
  currentUser = user;
  await loadCatalog();
  render();
});

// ─────────────────────────────────────────────
// Firestore
// ─────────────────────────────────────────────
async function saveCatalog() {
  if (!currentUser) return;
  try {
    await setDoc(doc(db, "catalogs", currentUser.uid), { data: JSON.stringify(catalog) });
  } catch (e) { console.error("Error guardando:", e); }
}

async function loadCatalog() {
  try {
    const snap = await getDoc(doc(db, "catalogs", currentUser.uid));
    if (snap.exists()) {
      catalog = JSON.parse(snap.data().data || "[]");
    }
  } catch (e) { console.error("Error cargando:", e); }
}

// ─────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ─────────────────────────────────────────────
// Modal helpers
// ─────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

// ─────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────
function render() {
  const container = document.getElementById("categoriesContainer");
  const empty     = document.getElementById("emptyState");

  container.innerHTML = "";

  if (catalog.length === 0) {
    empty.style.display = "";
    return;
  }
  empty.style.display = "none";

  catalog.forEach((cat, catIdx) => {
    const block = document.createElement("div");
    block.className = "category-block";
    block.dataset.catIdx = catIdx;

    // ── Category header
    block.innerHTML = `
      <div class="category-header" draggable="true" data-cat-idx="${catIdx}">
        <span class="drag-handle-cat" title="Arrastrar categoría">⠿</span>
        <span class="category-name">${escHtml(cat.name)}</span>
        <div class="category-actions">
          <button class="btn-icon" title="Editar categoría" data-action="editCat" data-cat-idx="${catIdx}">✎</button>
          <button class="btn-icon danger" title="Eliminar categoría" data-action="deleteCat" data-cat-idx="${catIdx}">✕</button>
        </div>
      </div>
    `;

    // ── Subcategories or flat products
    const hasSubs = cat.subcategories && cat.subcategories.length > 0;

    if (hasSubs) {
      // Products without subcategory
      const uncategorized = (cat.products || []).filter(p => !p.subcategoryId);
      if (uncategorized.length > 0) {
        block.appendChild(buildProductSection(cat, catIdx, null, uncategorized));
      }

      cat.subcategories.forEach((sub, subIdx) => {
        const subProds = (cat.products || []).filter(p => p.subcategoryId === sub.id);
        block.appendChild(buildProductSection(cat, catIdx, sub, subProds, subIdx));
      });
    } else {
      block.appendChild(buildProductSection(cat, catIdx, null, cat.products || []));
    }

    // ── "Add product" button
    const addBtn = document.createElement("button");
    addBtn.className = "btn-add-product";
    addBtn.textContent = "+ Agregar producto";
    addBtn.dataset.action = "addProduct";
    addBtn.dataset.catIdx = catIdx;
    block.appendChild(addBtn);

    container.appendChild(block);
  });

  attachDragEvents();
}

function buildProductSection(cat, catIdx, sub, products, subIdx) {
  const section = document.createElement("div");
  section.className = "subcategory-section";
  if (sub) {
    section.dataset.subIdx = subIdx;
    section.innerHTML = `
      <div class="subcategory-label">
        ${escHtml(sub.name)}
      </div>
    `;
  }

  const grid = document.createElement("div");
  grid.className = "products-grid";
  grid.dataset.catIdx = catIdx;
  if (sub) grid.dataset.subId = sub.id;

  products.forEach((prod, localIdx) => {
    const realIdx = (cat.products || []).findIndex(p => p.id === prod.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.draggable = true;
    card.dataset.prodId = prod.id;
    card.dataset.catIdx = catIdx;
    card.innerHTML = `
      <span class="product-drag-handle" title="Arrastrar">⠿</span>
      <div class="product-card-actions">
        <button class="btn-icon" title="Editar" data-action="editProd" data-cat-idx="${catIdx}" data-prod-id="${prod.id}">✎</button>
        <button class="btn-icon danger" title="Eliminar" data-action="deleteProd" data-cat-idx="${catIdx}" data-prod-id="${prod.id}">✕</button>
      </div>
      <div class="product-name">${escHtml(prod.name)}</div>
      ${prod.desc ? `<div class="product-desc">${escHtml(prod.desc)}</div>` : ''}
      <div class="product-price">ARS $ ${formatPrice(prod.price)}</div>
    `;
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

function formatPrice(val) {
  return Number(val).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─────────────────────────────────────────────
// Event delegation
// ─────────────────────────────────────────────
document.getElementById("categoriesContainer").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action  = btn.dataset.action;
  const catIdx  = parseInt(btn.dataset.catIdx);
  const prodId  = btn.dataset.prodId;

  if (action === "addProduct")  openAddProduct(catIdx);
  if (action === "editCat")     openEditCategory(catIdx);
  if (action === "deleteCat")   confirmDelete("categoría", () => deleteCategory(catIdx));
  if (action === "editProd")    openEditProduct(catIdx, prodId);
  if (action === "deleteProd")  confirmDelete("producto", () => deleteProduct(catIdx, prodId));
});

document.getElementById("emptyState").querySelector("#btnAddCategoryEmpty").addEventListener("click", () => openAddCategory());
document.getElementById("btnAddCategory").addEventListener("click", () => openAddCategory());
document.getElementById("btnLogout").addEventListener("click", () => signOut(auth).then(() => window.location.href = "index.html"));
document.getElementById("btnExportPDF").addEventListener("click", exportPDF);

// ─────────────────────────────────────────────
// CATEGORY modal
// ─────────────────────────────────────────────
let editingCatIdx = null;

function openAddCategory() {
  editingCatIdx = null;
  document.getElementById("modalCategoryTitle").textContent = "Nueva Categoría";
  document.getElementById("inputCategoryName").value = "";
  document.getElementById("subList").innerHTML = "";
  openModal("modalCategory");
}

function openEditCategory(catIdx) {
  editingCatIdx = catIdx;
  const cat = catalog[catIdx];
  document.getElementById("modalCategoryTitle").textContent = "Editar Categoría";
  document.getElementById("inputCategoryName").value = cat.name;
  document.getElementById("subList").innerHTML = "";
  (cat.subcategories || []).forEach(sub => addSubRow(sub.name, sub.id));
  openModal("modalCategory");
}

document.getElementById("btnAddSub").addEventListener("click", () => addSubRow());
document.getElementById("btnCancelCategory").addEventListener("click", () => closeModal("modalCategory"));

document.getElementById("btnSaveCategory").addEventListener("click", () => {
  const name = document.getElementById("inputCategoryName").value.trim();
  if (!name) { alert("El nombre de la categoría es obligatorio."); return; }

  const subInputs = document.querySelectorAll("#subList .sub-row input");
  const subs = [];
  subInputs.forEach(inp => {
    const v = inp.value.trim();
    if (v) subs.push({ id: inp.dataset.subId || uid(), name: v });
  });

  if (editingCatIdx !== null) {
    const cat = catalog[editingCatIdx];
    cat.name = name;
    // Preserve existing sub ids
    cat.subcategories = subs;
  } else {
    catalog.push({ id: uid(), name, subcategories: subs, products: [] });
  }

  closeModal("modalCategory");
  saveCatalog();
  render();
  toast(editingCatIdx !== null ? "Categoría actualizada ✓" : "Categoría creada ✓");
});

function addSubRow(value = "", subId = "") {
  const row = document.createElement("div");
  row.className = "sub-row";
  const id = subId || uid();
  row.innerHTML = `
    <input type="text" placeholder="Ej: Sin alcohol" value="${escHtml(value)}" data-sub-id="${id}"/>
    <button type="button" title="Eliminar">×</button>
  `;
  row.querySelector("button").addEventListener("click", () => row.remove());
  document.getElementById("subList").appendChild(row);
}

// ─────────────────────────────────────────────
// PRODUCT modal
// ─────────────────────────────────────────────
let addingToCatIdx = null;
let editingProdId  = null;

function openAddProduct(catIdx) {
  addingToCatIdx = catIdx;
  editingProdId  = null;
  document.getElementById("modalProductTitle").textContent = "Nuevo Producto";
  document.getElementById("inputProductName").value  = "";
  document.getElementById("inputProductDesc").value  = "";
  document.getElementById("inputProductPrice").value = "";
  openModal("modalProduct");
}

function openEditProduct(catIdx, prodId) {
  addingToCatIdx = catIdx;
  editingProdId  = prodId;
  const prod = catalog[catIdx].products.find(p => p.id === prodId);
  document.getElementById("modalProductTitle").textContent = "Editar Producto";
  document.getElementById("inputProductName").value  = prod.name;
  document.getElementById("inputProductDesc").value  = prod.desc || "";
  document.getElementById("inputProductPrice").value = prod.price;
  openModal("modalProduct");
}

document.getElementById("btnCancelProduct").addEventListener("click", () => closeModal("modalProduct"));

document.getElementById("btnSaveProduct").addEventListener("click", () => {
  const name  = document.getElementById("inputProductName").value.trim();
  const desc  = document.getElementById("inputProductDesc").value.trim();
  const price = parseFloat(document.getElementById("inputProductPrice").value);

  if (!name)          { alert("El nombre del producto es obligatorio."); return; }
  if (isNaN(price))   { alert("El precio es obligatorio."); return; }

  const cat = catalog[addingToCatIdx];

  if (editingProdId) {
    const prod = cat.products.find(p => p.id === editingProdId);
    prod.name  = name;
    prod.desc  = desc;
    prod.price = price;
    toast("Producto actualizado ✓");
  } else {
    cat.products.push({ id: uid(), name, desc, price });
    toast("Producto agregado ✓");
  }

  closeModal("modalProduct");
  saveCatalog();
  render();
});

// ─────────────────────────────────────────────
// DELETE confirm
// ─────────────────────────────────────────────
let pendingDelete = null;

function confirmDelete(what, fn) {
  pendingDelete = fn;
  document.getElementById("confirmText").textContent = `¿Estás seguro de que querés eliminar este/a ${what}? Esta acción no se puede deshacer.`;
  openModal("modalConfirm");
}

document.getElementById("btnCancelConfirm").addEventListener("click", () => { closeModal("modalConfirm"); pendingDelete = null; });
document.getElementById("btnConfirmDelete").addEventListener("click", () => {
  if (pendingDelete) { pendingDelete(); pendingDelete = null; }
  closeModal("modalConfirm");
});

function deleteCategory(catIdx) {
  catalog.splice(catIdx, 1);
  saveCatalog(); render();
  toast("Categoría eliminada");
}

function deleteProduct(catIdx, prodId) {
  catalog[catIdx].products = catalog[catIdx].products.filter(p => p.id !== prodId);
  saveCatalog(); render();
  toast("Producto eliminado");
}

// Close modals on overlay click
["modalCategory","modalProduct","modalConfirm"].forEach(id => {
  document.getElementById(id).addEventListener("click", (e) => {
    if (e.target === document.getElementById(id)) closeModal(id);
  });
});

// ─────────────────────────────────────────────
// DRAG & DROP — Categories
// ─────────────────────────────────────────────
let dragCatIdx  = null;
let dragProdId  = null;
let dragProdCatIdx = null;

function attachDragEvents() {
  // Category blocks
  document.querySelectorAll(".category-header[draggable]").forEach(header => {
    header.addEventListener("dragstart", (e) => {
      dragCatIdx = parseInt(header.dataset.catIdx);
      dragProdId = null;
      e.dataTransfer.effectAllowed = "move";
    });
  });

  document.querySelectorAll(".category-block").forEach(block => {
    block.addEventListener("dragover", (e) => {
      if (dragCatIdx === null || dragProdId !== null) return;
      e.preventDefault();
      block.classList.add("cat-drag-over");
    });
    block.addEventListener("dragleave", () => block.classList.remove("cat-drag-over"));
    block.addEventListener("drop", (e) => {
      e.preventDefault();
      block.classList.remove("cat-drag-over");
      if (dragCatIdx === null || dragProdId !== null) return;
      const targetIdx = parseInt(block.dataset.catIdx);
      if (targetIdx === dragCatIdx) return;
      const moved = catalog.splice(dragCatIdx, 1)[0];
      catalog.splice(targetIdx, 0, moved);
      dragCatIdx = null;
      saveCatalog(); render();
    });
  });

  // Product cards
  document.querySelectorAll(".product-card[draggable]").forEach(card => {
    card.addEventListener("dragstart", (e) => {
      dragProdId     = card.dataset.prodId;
      dragProdCatIdx = parseInt(card.dataset.catIdx);
      dragCatIdx     = null;
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() => card.classList.add("dragging"), 0);
    });
    card.addEventListener("dragend", () => card.classList.remove("dragging"));

    card.addEventListener("dragover", (e) => {
      if (!dragProdId) return;
      e.preventDefault();
      card.classList.add("drag-over");
    });
    card.addEventListener("dragleave", () => card.classList.remove("drag-over"));
    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.classList.remove("drag-over");
      if (!dragProdId) return;

      const targetProdId  = card.dataset.prodId;
      const targetCatIdx  = parseInt(card.dataset.catIdx);

      if (dragProdId === targetProdId) return;

      const sourceCat = catalog[dragProdCatIdx];
      const targetCat = catalog[targetCatIdx];

      const sourceIdx = sourceCat.products.findIndex(p => p.id === dragProdId);
      const targetIdx = targetCat.products.findIndex(p => p.id === targetProdId);

      const [moved] = sourceCat.products.splice(sourceIdx, 1);

      if (dragProdCatIdx !== targetCatIdx) {
        targetCat.products.splice(targetIdx, 0, moved);
      } else {
        sourceCat.products.splice(targetIdx, 0, moved);
      }

      dragProdId = null;
      saveCatalog(); render();
    });
  });
}

// ─────────────────────────────────────────────
// PDF Export using print
// ─────────────────────────────────────────────
function exportPDF() {
  window.print();
}
