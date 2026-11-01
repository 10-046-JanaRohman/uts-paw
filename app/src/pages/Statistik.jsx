import { useKoleksi } from '../context/KoleksiContext.jsx'
import { formatAngka } from '../config.js'
import AngkaRingkas from '../components/AngkaRingkas.jsx'

export default function Statistik() {
  const { items, loading, error, totalDurasi, totalKalori, jumlahKategori } = useKoleksi()
  const rekap = items.reduce((akumulasi, item) => {
    const nama = item.kategori
    if (!akumulasi[nama]) akumulasi[nama] = { jumlah: 0, durasi: 0 }
    akumulasi[nama].jumlah += 1
    akumulasi[nama].durasi += Number(item.durasi || 0)
    return akumulasi
  }, {})
  const baris = Object.entries(rekap).sort(([a], [b]) => a.localeCompare(b, 'id-ID'))

  return (
    <section className="page-section">
      <div className="page-intro"><div><p className="eyebrow eyebrow-muted">ANGKA YANG BERARTI</p><h1>Statistik<span className="heading-dot">.</span></h1><p>Lihat kebiasaan olahraga dari catatan yang telah kamu kumpulkan.</p></div></div>
      <div className="stats-grid stats-grid-three">
        <AngkaRingkas label="Jumlah sesi" angka={items.length} satuan="latihan" keterangan="Total catatan" jenis="green" />
        <AngkaRingkas label="Total durasi" angka={totalDurasi} satuan="menit" keterangan="Waktu aktivitas" />
        <AngkaRingkas label="Estimasi kalori" angka={totalKalori} satuan="kkal" keterangan={`${jumlahKategori} kategori olahraga`} />
      </div>
      <div className="table-panel">
        <div className="panel-heading"><div><p className="eyebrow eyebrow-muted">PER KATEGORI</p><h2>Rekap latihan</h2></div><span>RINGKASAN / 2026</span></div>
        {loading && <p className="status-message" role="status">Memuat statistik...</p>}
        {error && <p className="status-message status-error" role="alert">Gagal memuat data: {error}</p>}
        <div className="table-scroll">
          <table>
            <thead><tr><th scope="col">Kategori</th><th scope="col">Jumlah sesi</th><th scope="col">Durasi total</th></tr></thead>
            <tbody>
              {baris.map(([nama, nilai]) => <tr key={nama}><th scope="row">{nama}</th><td>{formatAngka(nilai.jumlah)}</td><td>{formatAngka(nilai.durasi)} menit</td></tr>)}
              <tr className="total-row"><th scope="row">Total</th><td>{formatAngka(items.length)}</td><td>{formatAngka(totalDurasi)} menit</td></tr>
            </tbody>
          </table>
        </div>
        <p className="table-caption">Data diperbarui otomatis ketika kamu menambah atau menghapus catatan latihan.</p>
      </div>
    </section>
  )
}
