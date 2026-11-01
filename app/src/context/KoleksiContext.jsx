import { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

export const VERSI_SKEMA = 'k7.2'
const KoleksiContext = createContext(null)

export function KoleksiProvider({ children }) {
  const [items, setItems] = useLocalStorage('uts-paw:k7', null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let aktif = true

    async function muatKoleksiAwalK7() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!response.ok) throw new Error('Berkas catatan latihan tidak dapat dibuka.')
        const dataAwal = await response.json()
        if (!Array.isArray(dataAwal)) throw new Error('Format data latihan tidak sesuai.')
        if (aktif) setItems((sebelumnya) => sebelumnya ?? dataAwal)
      } catch (kesalahan) {
        if (aktif) setError(kesalahan.message || 'Data latihan gagal dimuat.')
      } finally {
        if (aktif) setLoading(false)
      }
    }

    muatKoleksiAwalK7()
    return () => { aktif = false }
  }, [setItems])

  function tambahItem(item) {
    setItems((sebelumnya) => [...(sebelumnya ?? []), item])
  }

  function hapusItem(id) {
    setItems((sebelumnya) => (sebelumnya ?? []).filter((item) => String(item.id) !== String(id)))
  }

  const daftar = Array.isArray(items) ? items : []
  const totalDurasi = daftar.reduce((jumlah, item) => jumlah + Number(item.durasi || 0), 0)
  const totalKalori = daftar.reduce((jumlah, item) => jumlah + Number(item.kalori || 0), 0)
  const jumlahKategori = new Set(daftar.map((item) => item.kategori)).size

  return (
    <KoleksiContext.Provider value={{
      items: daftar,
      loading,
      error,
      tambahItem,
      hapusItem,
      totalDurasi,
      totalKalori,
      jumlahKategori,
    }}>
      {children}
    </KoleksiContext.Provider>
  )
}

export function useKoleksi() {
  const konteks = useContext(KoleksiContext)
  if (!konteks) throw new Error('useKoleksi harus digunakan di dalam KoleksiProvider.')
  return konteks
}
