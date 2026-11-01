import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import dataAwal from '../public/data/koleksi.json'
import identitas from '../mahasiswa.json'

function bukaHalaman(path) {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(dataAwal), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })))
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('Ruang Gerak', () => {
  test('beranda memiliki satu judul utama dan ringkasan latihan', async () => {
    bukaHalaman('/')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    await screen.findByText(dataAwal.at(-1).judul)
    expect(screen.getByText(/Sampai saat ini ada/).closest('p')).toHaveTextContent('12 sesi dalam 4 kategori')
  })

  test('koleksi menampilkan data yang diambil melalui fetch', async () => {
    bukaHalaman('/koleksi')
    for (const item of dataAwal) {
      expect(await screen.findByText(item.judul)).toBeInTheDocument()
    }
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('data/koleksi.json'))
  })

  test('kolom pencarian menyisakan judul yang cocok', async () => {
    const pengguna = userEvent.setup()
    bukaHalaman('/koleksi')
    await screen.findByText(dataAwal[0].judul)
    await pengguna.type(screen.getByRole('searchbox'), 'Joging Pagi')
    expect(screen.getByText(dataAwal[0].judul)).toBeInTheDocument()
    expect(screen.queryByText(dataAwal[2].judul)).not.toBeInTheDocument()
  })

  test('filter kategori membatasi kartu yang tampil', async () => {
    const pengguna = userEvent.setup()
    bukaHalaman('/koleksi')
    await screen.findByText(dataAwal[0].judul)
    await pengguna.selectOptions(screen.getByLabelText(/Filter kategori/i), 'Kelenturan')
    expect(screen.getByText(dataAwal[4].judul)).toBeInTheDocument()
    expect(screen.queryByText(dataAwal[0].judul)).not.toBeInTheDocument()
  })

  test('judul kosong menampilkan error dari JavaScript', async () => {
    const pengguna = userEvent.setup()
    bukaHalaman('/tambah')
    await pengguna.click(screen.getByRole('button', { name: /Simpan/i }))
    expect(screen.getByRole('alert')).toHaveTextContent('Judul latihan wajib diisi')
  })

  test('latihan baru masuk ke localStorage lalu tampil di koleksi', async () => {
    const pengguna = userEvent.setup()
    bukaHalaman('/tambah')
    await pengguna.type(screen.getByLabelText(/^Judul/i), 'Lari Pemanasan Lapangan Selatan')
    await pengguna.click(screen.getByRole('button', { name: /Simpan/i }))
    await waitFor(() => expect(localStorage.getItem('uts-paw:k7')).toContain('Lari Pemanasan Lapangan Selatan'))
    expect(await screen.findByText('Lari Pemanasan Lapangan Selatan')).toBeInTheDocument()
  })

  test('id tidak dikenal menampilkan informasi tidak ditemukan', async () => {
    bukaHalaman('/koleksi/bukan-id-valid')
    expect(await screen.findByText(/Latihan tidak ditemukan/)).toBeInTheDocument()
    expect(screen.queryByText('404')).not.toBeInTheDocument()
  })

  test('menghapus latihan meminta konfirmasi dan kembali ke daftar', async () => {
    const pengguna = userEvent.setup()
    const konfirmasi = vi.spyOn(window, 'confirm').mockReturnValue(true)
    bukaHalaman(`/koleksi/${dataAwal[0].id}`)
    await screen.findByRole('heading', { name: dataAwal[0].judul })
    await pengguna.click(screen.getByRole('button', { name: /Hapus/i }))
    expect(konfirmasi).toHaveBeenCalled()
    await screen.findByRole('searchbox')
    expect(screen.queryByText(dataAwal[0].judul)).not.toBeInTheDocument()
  })

  test('tabel statistik menampilkan total dan kategori', async () => {
    bukaHalaman('/statistik')
    const tabel = screen.getByRole('table')
    await within(tabel).findByText('Kardio')
    expect(within(tabel).getByText('Total')).toBeInTheDocument()
    expect(within(tabel).getByText('Permainan')).toBeInTheDocument()
  })

  test('halaman tentang menampilkan identitas mahasiswa', () => {
    bukaHalaman('/tentang')
    expect(screen.getByText(identitas.nama)).toBeInTheDocument()
    expect(screen.getByText(identitas.nim)).toBeInTheDocument()
    expect(screen.getByText(identitas.tema)).toBeInTheDocument()
  })

  test('rute lain menampilkan 404 dan link kembali', () => {
    bukaHalaman('/alamat-aneh')
    expect(screen.getByRole('heading', { name: /404/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^Kembali ke beranda/i })).toHaveAttribute('href', '/')
  })
})
