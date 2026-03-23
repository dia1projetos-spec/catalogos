# 📋 Catálogo — Guía de configuración

## Archivos del proyecto

```
catalogo/
├── index.html        → Página de login
├── catalog.html      → Catálogo principal
├── css/
│   ├── login.css
│   └── catalog.css
└── js/
    └── app.js
```

---

## 🔥 Configuración de Firebase

### 1. Crear proyecto en Firebase
1. Ir a https://console.firebase.google.com
2. Clic en **"Agregar proyecto"** → ponerle un nombre
3. Desactivar Google Analytics (opcional) → **Crear proyecto**

### 2. Activar Authentication
1. En el menú lateral: **Build → Authentication**
2. Clic en **"Comenzar"**
3. Pestaña **Sign-in method** → Habilitar **Correo electrónico/Contraseña**
4. Guardar

### 3. Activar Firestore
1. En el menú lateral: **Build → Firestore Database**
2. Clic en **"Crear base de datos"**
3. Elegir **Modo de producción** → seleccionar región → Listo

### 4. Configurar reglas de Firestore
En **Firestore → Reglas**, reemplazar con:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /catalogs/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
Clic en **Publicar**.

### 5. Obtener las credenciales
1. Ir a **Configuración del proyecto** (ícono de engranaje) → **General**
2. Bajar hasta **"Tus apps"** → Clic en el ícono `</>`  (Web)
3. Registrar app (apodo opcional) → **Registrar app**
4. Copiar el objeto `firebaseConfig` que aparece

### 6. Pegar las credenciales en el proyecto

Abrir **AMBOS** archivos y reemplazar el bloque `firebaseConfig`:

- `index.html` (al final, dentro del `<script type="module">`)
- `js/app.js` (al inicio del archivo)

Reemplazar:
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Con tus datos reales del paso anterior.

---

## 🚀 Cómo usar

### Opción A — Abrir localmente (sin servidor)
❌ No funciona directamente con `file://` por restricciones de Firebase.

### Opción B — Servidor local (recomendado para pruebas)
Con Node.js instalado:
```bash
npx serve .
```
O con Python:
```bash
python -m http.server 8000
```
Luego abrir http://localhost:8000

### Opción C — Hosting gratuito con Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 📄 Exportar PDF
Hacer clic en **"⬇ Exportar PDF"** en la barra superior.
Se abre el diálogo de impresión del navegador → elegir **"Guardar como PDF"**.

Para mejor resultado:
- Desactivar "Encabezados y pies de página"
- Activar "Gráficos de fondo"
- Escala: 100%

---

## ✨ Funciones disponibles
- ✅ Login / Registro por email
- ✅ Datos separados por usuario (Firestore)
- ✅ Crear categorías con subcategorías ilimitadas
- ✅ Agregar / editar / eliminar productos
- ✅ Nombre, descripción (opcional), precio (ARS $)
- ✅ Grilla responsiva (2-4 productos por fila)
- ✅ Reordenar productos arrastrando (drag & drop)
- ✅ Reordenar categorías arrastrando
- ✅ Exportar catálogo a PDF
- ✅ Guardado automático en la nube
