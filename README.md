# Ruang Gerak — Jurnal Latihan Olahraga

**Nama:** Jana Rohman Wasiso  
**NIM:** 123140046  
**Kelas:** RB  
**Tema:** Jurnal Latihan Olahraga  
**Mata kuliah:** IF25-22014 Pengembangan Aplikasi Web  
**Deployment:** https://10-046-JanaRohman.github.io/uts-paw/  
**Repositori:** https://github.com/10-046-JanaRohman/uts-paw

![Pratinjau desain beranda Ruang Gerak](docs/beranda.png)

## Fitur

- Beranda berisi total latihan, durasi, kalori, jumlah kategori, dan catatan terbaru.
- Halaman koleksi dengan pencarian berdasarkan judul dan filter kategori.
- Halaman detail yang memperlihatkan tanggal, durasi, dan kalori terbakar.
- Form tambah latihan dengan validasi judul di JavaScript.
- Hapus catatan menggunakan konfirmasi sebelum menghapus.
- Statistik berupa tabel jumlah latihan dan akumulasi durasi per kategori.
- Penyimpanan data tambahan dan penghapusan di localStorage agar tetap ada setelah refresh.
- Halaman Tentang dan halaman 404 untuk rute yang tidak dikenal.

## Menjalankan secara lokal

Proyek ini ditambahkan ke **fork dari repo induk** `mh4Scripts/uts-paw`. Folder `.github/workflows/`, `grader/`, dan `shared/` dari repo induk tidak diubah.

```bash
cd uts-paw/app
npm ci
npm run dev
```

Buka URL lokal yang tertera di terminal. Untuk memeriksa hasil:

```bash
npm run build
npm run lint
npm run test
npm run cek
```

## Konsep React yang dipakai

- Komponen fungsional, props, dan pemetaan daftar dengan `map` beserta `key`.
- `useState`, `useEffect`, `createContext`, `Provider`, dan `useContext`.
- Dua custom hook: `useLocalStorage` dan `usePencarianKoleksi`.
- `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useParams`, dan `useNavigate`.
- `fetch` dengan `async/await`, serta state untuk proses memuat dan error.
- Form terkontrol, validasi JavaScript, dan penyimpanan perubahan di browser.
- HTML semantik dan CSS responsif dengan Grid, Flexbox, dan media query.
- 11 test case sendiri menggunakan Vitest dan React Testing Library.
