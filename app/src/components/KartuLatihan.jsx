import { Link } from 'react-router-dom'
import { formatAngka, formatTanggal } from '../config.js'
import LabelKategori from './LabelKategori.jsx'

export default function KartuLatihan({ item, nomor }) {
  return (
    <article className="exercise-card">
      <div className="card-topline">
        <span className="card-number">/{String(nomor).padStart(2, '0')}</span>
        <LabelKategori kategori={item.kategori} />
      </div>
      <Link to={`/koleksi/${item.id}`} className="exercise-title">{item.judul}</Link>
      <p className="card-date">{formatTanggal(item.tanggal)}</p>
      <div className="card-metrics">
        <span><strong>{formatAngka(item.durasi)}</strong> menit</span>
        <span><strong>{formatAngka(item.kalori)}</strong> kkal</span>
        <Link to={`/koleksi/${item.id}`} className="card-arrow" aria-label={`Lihat detail ${item.judul}`}>↗</Link>
      </div>
    </article>
  )
}
