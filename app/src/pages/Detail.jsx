import { Link, useNavigate, useParams } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext.jsx'
import { formatAngka, formatTanggal } from '../config.js'
import InfoBaris from '../components/InfoBaris.jsx'
import LabelKategori from '../components/LabelKategori.jsx'

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, loading, error, hapusItem } = useKoleksi()
  const item = items.find((latihan) => String(latihan.id) === String(id))

  function konfirmasiHapus() {
    if (window.confirm('Hapus catatan latihan ini? Tindakan ini tidak dapat dibatalkan.')) {
      hapusItem(id)
      navigate('/koleksi')
    }
  }

  if (loading) return <p className="status-message" role="status">Memuat detail latihan...</p>
  if (error && !item) return <p className="status-message status-error" role="alert">Gagal memuat data: {error}</p>
  if (!item) return (
    <section className="detail-missing page-section">
      <p className="eyebrow eyebrow-muted">CATATAN TIDAK ADA</p>
      <h1>Latihan tidak ditemukan.</h1>
      <p>Catatan yang kamu cari mungkin sudah dihapus atau alamatnya berubah.</p>
      <Link to="/koleksi" className="button button-primary">Kembali ke koleksi</Link>
    </section>
  )

  return (
    <section className="page-section detail-page">
      <Link to="/koleksi" className="back-link">← Kembali ke koleksi</Link>
      <div className="detail-header">
        <p className="eyebrow eyebrow-muted">RINCIAN AKTIVITAS</p>
        <h1>{item.judul}</h1>
        <LabelKategori kategori={item.kategori} />
      </div>
      <div className="detail-layout">
        <div className="detail-panel">
          <div className="panel-heading"><h2>Informasi latihan</h2><span>01 / DATA SESI</span></div>
          <dl className="info-list">
            <InfoBaris label="ID" nilai={item.id} />
            <InfoBaris label="Judul" nilai={item.judul} />
            <InfoBaris label="Kategori" nilai={item.kategori} />
            <InfoBaris label="Tanggal" nilai={formatTanggal(item.tanggal)} />
            <InfoBaris label="Durasi" nilai={`${formatAngka(item.durasi)} menit`} />
            <InfoBaris label="Kalori Terbakar" nilai={`${formatAngka(item.kalori)} kkal`} />
          </dl>
        </div>
        <aside className="detail-aside">
          <div className="detail-feature"><p>WAKTU BERGERAK</p><strong>{formatAngka(item.durasi)}<span>menit</span></strong><span>Setiap menit tetap berarti.</span></div>
          <p className="detail-note">Catatan ini tersimpan secara lokal di browser yang sedang kamu gunakan.</p>
          <button type="button" onClick={konfirmasiHapus} className="button button-danger">Hapus catatan</button>
        </aside>
      </div>
    </section>
  )
}
