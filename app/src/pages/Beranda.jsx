import { Link } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext.jsx'
import { formatAngka } from '../config.js'
import AngkaRingkas from '../components/AngkaRingkas.jsx'
import KartuLatihan from '../components/KartuLatihan.jsx'
import KotakKosong from '../components/KotakKosong.jsx'

export default function Beranda() {
  const { items, loading, error, totalDurasi, totalKalori, jumlahKategori } = useKoleksi()
  const terakhir = [...items].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 3)

  return (
    <div className="page-section">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> JURNAL LATIHAN PRIBADI</p>
          <h1>Setiap gerak<br /><em>punya cerita.</em></h1>
          <p className="hero-description">Ruang sederhana untuk mencatat latihan, melihat kebiasaan, dan menyadari seberapa jauh kamu sudah berjalan.</p>
          <Link className="button button-light" to="/koleksi">Jelajahi catatan <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-ring art-ring-outer" />
          <div className="art-ring art-ring-inner" />
          <div className="art-center"><span>MOVE</span><strong>01</strong><span>REPEAT</span></div>
          <span className="art-mini art-mini-top">DO IT FOR YOU</span>
          <span className="art-mini art-mini-bottom">JUST KEEP MOVING ↗</span>
        </div>
      </section>

      <div className="section-heading section-heading-small">
        <div><p className="eyebrow eyebrow-muted">SEKILAS PROGRES</p><h2>Ringkasan aktivitas</h2></div>
        <span className="section-muted">Dari seluruh catatan yang tersimpan</span>
      </div>

      <section className="stats-grid" aria-label="Ringkasan olahraga">
        <AngkaRingkas label="Total latihan" angka={items.length} satuan="sesi" keterangan="Aktivitas tercatat" jenis="green" />
        <AngkaRingkas label="Waktu bergerak" angka={totalDurasi} satuan="menit" keterangan="Waktu yang kamu luangkan" />
        <AngkaRingkas label="Kalori terbakar" angka={totalKalori} satuan="kkal" keterangan="Perkiraan energi keluar" />
        <AngkaRingkas label="Kategori" angka={jumlahKategori} satuan="jenis" keterangan="Ragam aktivitas olahraga" />
      </section>

      <section className="recent-section">
        <div className="section-heading">
          <div><p className="eyebrow eyebrow-muted">ARSIP TERBARU</p><h2>Catatan terakhir</h2></div>
          <Link to="/koleksi" className="text-link">Lihat semua <span aria-hidden="true">↗</span></Link>
        </div>
        {loading && <p className="status-message" role="status">Memuat catatan latihan...</p>}
        {error && <p className="status-message status-error" role="alert">Gagal memuat data: {error}</p>}
        {!loading && !error && terakhir.length === 0 && <KotakKosong tampilkanTombol pesan="Mulai dengan mencatat latihan pertamamu." />}
        {!loading && !error && terakhir.length > 0 && (
          <div className="cards-grid">
            {terakhir.map((item, index) => <KartuLatihan item={item} nomor={index + 1} key={item.id} />)}
          </div>
        )}
      </section>
      <p className="summary-line">Sampai saat ini ada <strong>{formatAngka(items.length)}</strong> sesi dalam <strong>{formatAngka(jumlahKategori)}</strong> kategori.</p>
    </div>
  )
}
