# CaCiCu-Chat Frontend

Aplikasi chat frontend yang dibangun dengan HTML, CSS, dan Vanilla JavaScript. Siap untuk deploy ke **GitHub** dan **Cloudflare Pages**.

---

## 📁 Struktur File

```
cicicu-chat-frontend/
├── index.html          # Entry point aplikasi
├── css/
│   └── styles.css      # Semua styling (dark theme, responsive)
├── js/
│   ├── data.js         # Mock data & state management
│   ├── api.js          # API service module (siap integrasi backend)
│   └── app.js          # Main app controller & rendering
└── README.md           # Dokumentasi ini
```

---

## 🚀 Deploy ke GitHub + Cloudflare Pages

### 1. Upload ke GitHub

```bash
# Buat repo baru di GitHub (misal: cicicu-chat-frontend)
# Lalu di local:
git init
git add .
git commit -m "Initial commit: CaCiCu-Chat frontend"
git branch -M main
git remote add origin https://github.com/username/cicicu-chat-frontend.git
git push -u origin main
```

### 2. Deploy ke Cloudflare Pages

1. Buka [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Klik **"Create a project"** → **"Connect to Git"**
3. Pilih repo `cicicu-chat-frontend`
4. Konfigurasi build:
   - **Build command:** *(kosongkan - ini static site)*
   - **Build output directory:** `/` *(root)*
5. Klik **"Save and Deploy"**

> Cloudflare Pages akan otomatis deploy setiap kali kamu push ke GitHub.

---

## 🔌 Integrasi Backend

Frontend sudah disiapkan dengan struktur API yang jelas. Saat ini menggunakan **mock data**.

### Konfigurasi API

Edit `index.html` bagian `<script>` di `<head>`:

```javascript
window.API_CONFIG = {
    BASE_URL: 'https://api.cicicu-chat.com',  // Ganti dengan domain backend
    WS_URL: 'wss://api.cicicu-chat.com',      // WebSocket URL
    API_VERSION: 'v1',
    ENV: 'production'
};
```

### Endpoint API yang Direncanakan

| Method | Endpoint | Deskripsi | File |
|--------|----------|-----------|------|
| GET | `/api/v1/chats/personal` | Daftar chat personal | `api.js` |
| GET | `/api/v1/chats/group` | Info grup | `api.js` |
| GET | `/api/v1/chats/group/messages` | Pesan grup | `api.js` |
| POST | `/api/v1/chats/group/messages` | Kirim pesan | `api.js` |
| GET | `/api/v1/schedules` | Daftar jadwal | `api.js` |
| POST | `/api/v1/schedules` | Buat jadwal | `api.js` |
| GET | `/api/v1/notes` | Daftar catatan | `api.js` |
| POST | `/api/v1/notes` | Buat catatan | `api.js` |
| POST | `/api/v1/contacts` | Tambah kontak | `api.js` |
| GET | `/api/v1/profile` | Profil user | `api.js` |
| GET | `/api/v1/gallery` | Media gallery | `api.js` |
| POST | `/api/v1/auth/login` | Login | `api.js` |
| POST | `/api/v1/auth/logout` | Logout | `api.js` |
| WS | `/ws/v1/chat` | Real-time chat | `api.js` |

### Cara Integrasi

1. **Buka `js/api.js`**
2. **Uncomment** bagian `fetch()` di method `request()`
3. **Hapus** return mock data
4. Pastikan backend sudah handle CORS:
   ```
   Access-Control-Allow-Origin: https://cicicu-chat.pages.dev
   Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

### Backend Stack yang Direkomendasikan

- **Runtime:** Node.js (Express/Fastify) atau Python (FastAPI)
- **Database:** PostgreSQL / MongoDB
- **Real-time:** Socket.io atau WebSocket native
- **Auth:** JWT (JSON Web Tokens)
- **File Upload:** Cloudflare R2 atau AWS S3
- **Deploy:** Cloudflare Workers, Railway, atau Vercel

---

## 🎨 Fitur Frontend

- ✅ **Responsive Design** - Mobile-first, tablet & desktop
- ✅ **Dark Theme** - Tema gelap elegan
- ✅ **3 Tab Utama:** Personal Chat, Ruang Bebas (Group), Project
- ✅ **Project Sub-tab:** Jadwal & Catatan
- ✅ **Real-time Chat UI** - Siap integrasi WebSocket
- ✅ **Schedule Cards** - Dengan status & member avatars
- ✅ **Notes System** - Dengan tags
- ✅ **Contact Modal** - Dengan OTP verifikasi
- ✅ **Settings Page** - Profil, notifikasi, tampilan
- ✅ **Gallery** - Grid layout
- ✅ **Info Page** - Tentang aplikasi & keamanan
- ✅ **Toast Notifications** - Feedback user-friendly
- ✅ **Loading States** - Spinner overlay
- ✅ **Keyboard Navigation** - Enter to send, etc.
- ✅ **Accessibility** - Reduced motion support

---

## 🛠️ Development

Untuk development lokal, cukup buka `index.html` di browser atau gunakan live server:

```bash
# Dengan Python
python -m http.server 8000

# Dengan Node.js (npx)
npx serve .

# Dengan VS Code Live Server extension
# Klik kanan index.html → "Open with Live Server"
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `max-width: 480px` | Mobile (full screen) |
| `min-width: 481px` | Tablet & desktop (rounded container) |
| `min-width: 768px` | Large screens (wider container) |
| `max-height: 500px` | Landscape mode |

---

## 🔐 Keamanan (Frontend)

- Input sanitization dengan `escapeHtml()`
- OTP verification untuk kontak baru
- Token-based auth (JWT) siap implementasi
- LocalStorage untuk token storage

---

## 📄 License

&copy; 2026 CaCiCu-Chat. Hak Cipta Dilindungi.

---

**Dibuat dengan ❤️ saat saldo untuk Depo udah habis.**
