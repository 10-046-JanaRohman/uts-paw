import mahasiswa from '../../mahasiswa.json'
import { DEPLOY_URL, REPO_URL, GITHUB_USERNAME } from '../config.js'
import InfoBaris from '../components/InfoBaris.jsx'

export default function Tentang() {
  return (
    <section className="page-section about-page">
      <div className="page-intro"><div><p className="eyebrow eyebrow-muted">DI BALIK APLIKASI</p><h1>Tentang<span className="heading-dot">.</span></h1><p>Proyek aplikasi web yang dibuat untuk mencatat dan melihat riwayat latihan olahraga.</p></div></div>
      <div className="about-grid">
        <div className="about-feature"><span className="about-mark">RG<span>✳</span></span><p>CATAT. LIHAT. LANJUTKAN.</p><h2>Ruang kecil untuk kebiasaan yang bertumbuh.</h2></div>
        <div className="detail-panel"><div className="panel-heading"><h2>Identitas pembuat</h2><span>INFORMASI / 01</span></div><dl className="info-list"><InfoBaris label="Nama" nilai={mahasiswa.nama} /><InfoBaris label="NIM" nilai={mahasiswa.nim} /><InfoBaris label="Kelas" nilai={mahasiswa.kelas} /><InfoBaris label="Tema" nilai={mahasiswa.tema} /><InfoBaris label="Mata kuliah" nilai="Pengembangan Aplikasi Web" /></dl>
          <div className="about-links">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="button button-primary">Repositori GitHub ↗</a>
            <a href={DEPLOY_URL} target="_blank" rel="noreferrer" className="text-link">Lihat situs ↗</a>
          </div>
          {GITHUB_USERNAME === 'GANTI_USERNAME_GITHUB' && <p className="config-notice">.</p>}
        </div>
      </div>
    </section>
  )
}
