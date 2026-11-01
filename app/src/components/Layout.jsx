import { Link, useLocation } from 'react-router-dom'
import Navigasi from './Navigasi.jsx'

const namaHalaman = {
  '/': 'Beranda',
  '/koleksi': 'Koleksi latihan',
  '/tambah': 'Tambah catatan',
  '/statistik': 'Statistik',
  '/tentang': 'Tentang aplikasi',
}

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const sekarang = namaHalaman[pathname] || (pathname.startsWith('/koleksi/') ? 'Detail latihan' : 'Halaman lain')

  return (
    <div className="app-shell">
      <aside id="panel-navigasi" className="sidebar">
        <Link to="/" className="brand" aria-label="Ruang Gerak, kembali ke beranda">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-name">ruang<span>gerak</span><small>Jurnal aktivitas pribadi</small></span>
        </Link>
        <p className="sidebar-caption">MENU UTAMA</p>
        <Navigasi />
        <div className="sidebar-note">
          <span className="note-dot" />
          <strong>Bergerak itu proses.</strong>
          <p>Simpan perjalanan olahragamu, satu catatan dalam satu waktu.</p>
        </div>
      </aside>

      <div className="page-frame">
        <header id="atas-halaman" className="topbar">
          <div className="topbar-location"><span>RUANG GERAK</span><span aria-hidden="true">/</span><strong>{sekarang}</strong></div>
          <Link to="/tambah" className="button button-primary topbar-button">+ Catat latihan</Link>
        </header>
        <main id="konten-utama" className="main-content">{children}</main>
        <footer id="kaki-halaman" data-skema="k7.2" className="footer">
          <span>© 2026 Ruang Gerak</span>
          <span>Dibuat untuk mencatat progres, bukan mengejar angka.</span>
        </footer>
      </div>
    </div>
  )
}
