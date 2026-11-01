import { useEffect, useState } from 'react'

// Nilai pertama dibaca langsung saat hook dijalankan agar tetap tersedia setelah refresh.
export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci)
      return tersimpan === null ? nilaiAwal : JSON.parse(tersimpan)
    } catch {
      return nilaiAwal
    }
  })

  useEffect(() => {
    if (nilai === null) return
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai))
    } catch (kesalahan) {
      console.warn('Penyimpanan lokal tidak tersedia:', kesalahan)
    }
  }, [kunci, nilai])

  return [nilai, setNilai]
}
