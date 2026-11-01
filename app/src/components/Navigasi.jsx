import { NavLink } from 'react-router-dom'

const menu = [
  { ke: '/', teks: 'Beranda', simbol: '◫', akhir: true },
  { ke: '/koleksi', teks: 'Koleksi latihan', simbol: '▤' },
  { ke: '/tambah', teks: 'Tambah latihan', simbol: '+' },
  { ke: '/statistik', teks: 'Statistik', simbol: '▥' },
  { ke: '/tentang', teks: 'Tentang', simbol: 'ⓘ' },
]

export default function Navigasi() {
  return (
    <nav className="navigation" aria-label="Navigasi utama">
      {menu.map(({ ke, teks, simbol, akhir }) => (
        <NavLink
          key={ke}
          to={ke}
          end={akhir}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <span className="nav-symbol" aria-hidden="true">{simbol}</span>
          <span>{teks}</span>
        </NavLink>
      ))}
    </nav>
  )
}
