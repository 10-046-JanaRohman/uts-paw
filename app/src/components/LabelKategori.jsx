const kelasKategori = {
  Kardio: 'pill-kardio',
  Kekuatan: 'pill-kekuatan',
  Kelenturan: 'pill-kelenturan',
  Permainan: 'pill-permainan',
}

export default function LabelKategori({ kategori }) {
  return <span className={`category-pill ${kelasKategori[kategori] || 'pill-default'}`}>{kategori}</span>
}
