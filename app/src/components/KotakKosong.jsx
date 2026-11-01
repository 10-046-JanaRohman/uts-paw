import { Link } from 'react-router-dom'

export default function KotakKosong({ judul = 'Belum ada catatan', pesan = 'Coba ubah pencarian atau pilih kategori lain.', tampilkanTombol = false }) {
  return (
    <div className="empty-state">
      <span className="empty-symbol" aria-hidden="true">○</span>
      <h2>{judul}</h2>
      <p>{pesan}</p>
      {tampilkanTombol && <Link to="/tambah" className="button button-primary">Tambah latihan</Link>}
    </div>
  )
}
