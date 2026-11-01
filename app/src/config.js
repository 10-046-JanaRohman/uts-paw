// Ganti sesuai nama pengguna GitHub setelah membuat fork.
export const GITHUB_USERNAME = '10-046-JanaRohman'
export const REPO_URL = `https://github.com/10-046-JanaRohman/uts-paw`
export const DEPLOY_URL = `https://10-046-JanaRohman.github.io/uts-paw/`

export const KATEGORI = ['Kardio', 'Kekuatan', 'Kelenturan', 'Permainan']

export function formatTanggal(tanggal) {
  if (!tanggal) return '-'
  const tanggalLokal = new Date(`${tanggal}T00:00:00`)
  if (Number.isNaN(tanggalLokal.getTime())) return String(tanggal)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(tanggalLokal)
}

export function formatAngka(angka) {
  return new Intl.NumberFormat('id-ID').format(Number(angka) || 0)
}
