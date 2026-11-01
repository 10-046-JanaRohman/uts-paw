import { Link } from 'react-router-dom'

export default function Halaman404() {
  return (
    <section className="not-found page-section"><span className="eyebrow eyebrow-muted">SEPERTINYA KAMU TERSASAR</span><h1>404<span className="heading-dot">.</span></h1><h2>Halaman tidak ditemukan</h2><p>Alamat yang kamu buka tidak tersedia. Yuk, kembali ke awal.</p><Link to="/" className="button button-primary">Kembali ke beranda ↗</Link></section>
  )
}
