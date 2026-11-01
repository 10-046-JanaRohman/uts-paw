import { useNavigate } from 'react-router-dom'
import { useKoleksi } from '../context/KoleksiContext.jsx'
import FormLatihan from '../components/FormLatihan.jsx'

export default function Tambah() {
  const navigate = useNavigate()
  const { tambahItem } = useKoleksi()

  function simpanLatihan(item) {
    tambahItem(item)
    navigate('/koleksi')
  }

  return (
    <section className="page-section add-page">
      <div className="page-intro"><div><p className="eyebrow eyebrow-muted">SESI BARU</p><h1>Catat latihan<span className="heading-dot">.</span></h1><p>Tulis aktivitas hari ini. Tidak perlu sempurna, yang penting konsisten.</p></div></div>
      <div className="form-layout">
        <div className="form-panel"><div className="panel-heading"><h2>Detail aktivitas</h2><span>FORM / 01</span></div><FormLatihan onSimpan={simpanLatihan} /></div>
        <aside className="form-aside"><span className="aside-overline">SEDIKIT PENGINGAT</span><strong>Yang tercatat,<br />lebih mudah<br />dilihat progresnya.</strong><p>Isi judul latihan, lalu lengkapi kategori, tanggal, durasi, dan perkiraan kalori.</p><span className="aside-flower" aria-hidden="true">✳</span></aside>
      </div>
    </section>
  )
}
