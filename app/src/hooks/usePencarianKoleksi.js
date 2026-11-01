import { useMemo, useState } from 'react'

export default function usePencarianKoleksi(daftar) {
  const [pencarian, setPencarian] = useState('')
  const [kategori, setKategori] = useState('Semua kategori')

  const semuaKategori = useMemo(
    () => ['Semua kategori', ...new Set(daftar.map((item) => item.kategori))],
    [daftar],
  )

  const hasil = useMemo(() => {
    const kataKunci = pencarian.trim().toLocaleLowerCase('id-ID')
    return daftar.filter((item) => {
      const cocokJudul = item.judul.toLocaleLowerCase('id-ID').includes(kataKunci)
      const cocokKategori = kategori === 'Semua kategori' || item.kategori === kategori
      return cocokJudul && cocokKategori
    })
  }, [daftar, pencarian, kategori])

  return {
    pencarian,
    setPencarian,
    kategori,
    setKategori,
    semuaKategori,
    hasil,
  }
}
