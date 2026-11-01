import { Link } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext.jsx'
import usePencarianKoleksi from '../hooks/usePencarianKoleksi.js'
import KartuLatihan from '../components/KartuLatihan.jsx'
import KotakKosong from '../components/KotakKosong.jsx'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const { pencarian, setPencarian, kategori, setKategori, semuaKategori, hasil } = usePencarianKoleksi(items)

  return (
    <section className="page-section">
      <div className="page-intro">
        <div><p className="eyebrow eyebrow-muted">ARSIP AKTIVITAS</p><h1>Koleksi latihan<span className="heading-dot">.</span></h1><p>Semua sesi yang pernah kamu catat, disimpan di satu tempat.</p></div>
        <span className="item-counter">{items.length} catatan</span>
      </div>

      <div className="filter-panel">
        <div className="filter-field search-field">
          <label htmlFor="cari-judul">Cari berdasarkan judul</label>
          <div className="search-input-wrap"><span aria-hidden="true">⌕</span><input id="cari-judul" type="search" placeholder="Cari nama latihan..." value={pencarian} onChange={(event) => setPencarian(event.target.value)} /></div>
        </div>
        <div className="filter-field category-field">
          <label htmlFor="filter-kategori">Filter kategori</label>
          <select id="filter-kategori" value={kategori} onChange={(event) => setKategori(event.target.value)}>
            {semuaKategori.map((nama) => <option key={nama} value={nama}>{nama}</option>)}
          </select>
        </div>
      </div>

      <div className="result-line"><span>{hasil.length} dari {items.length} latihan</span><Link to="/tambah" className="text-link">Catat yang baru ↗</Link></div>
      {loading && <p className="status-message" role="status">Memuat catatan latihan...</p>}
      {error && <p className="status-message status-error" role="alert">Gagal memuat data: {error}</p>}
      {!loading && !error && hasil.length === 0 && <KotakKosong judul={items.length ? 'Tidak ada hasil' : 'Belum ada latihan'} pesan={items.length ? 'Coba gunakan kata kunci atau kategori lain.' : 'Tambahkan satu sesi untuk memulai jurnalmu.'} tampilkanTombol={!items.length} />}
      {!loading && !error && hasil.length > 0 && (
        <div className="cards-grid">
          {hasil.map((item, index) => <KartuLatihan key={item.id} item={item} nomor={index + 1} />)}
        </div>
      )}
    </section>
  )
}
