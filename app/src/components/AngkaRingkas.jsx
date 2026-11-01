import { formatAngka } from '../config.js'

export default function AngkaRingkas({ label, angka, satuan, keterangan, jenis }) {
  return (
    <div className={`stat-card${jenis ? ` stat-card-${jenis}` : ''}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{formatAngka(angka)}<span>{satuan}</span></p>
      <p className="stat-note">{keterangan}</p>
    </div>
  )
}
