import { Route, Routes } from 'react-router-dom'
import { KoleksiProvider } from './context/KoleksiContext.jsx'
import Layout from './components/Layout.jsx'
import Beranda from './pages/Beranda.jsx'
import Koleksi from './pages/Koleksi.jsx'
import Detail from './pages/Detail.jsx'
import Tambah from './pages/Tambah.jsx'
import Statistik from './pages/Statistik.jsx'
import Tentang from './pages/Tentang.jsx'
import Halaman404 from './pages/Halaman404.jsx'

export default function App() {
  return (
    <KoleksiProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/koleksi/:id" element={<Detail />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<Halaman404 />} />
        </Routes>
      </Layout>
    </KoleksiProvider>
  )
}
