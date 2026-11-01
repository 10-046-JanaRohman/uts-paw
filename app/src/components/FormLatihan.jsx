import { useState } from 'react'
import { KATEGORI } from '../config.js'

function tanggalHariIni() {
  const hari = new Date()
  const tahun = hari.getFullYear()
  const bulan = String(hari.getMonth() + 1).padStart(2, '0')
  const tanggal = String(hari.getDate()).padStart(2, '0')
  return `${tahun}-${bulan}-${tanggal}`
}

export default function FormLatihan({ onSimpan }) {
  const [form, setForm] = useState({
    judul: '',
    kategori: KATEGORI[0],
    tanggal: tanggalHariIni(),
    durasi: '30',
    kalori: '150',
  })
  const [error, setError] = useState('')

  function ubahForm(event) {
    const { name, value } = event.target
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }))
    if (name === 'judul') setError('')
  }

  function simpan(event) {
    event.preventDefault()
    if (!form.judul.trim()) {
      setError('Judul latihan wajib diisi sebelum disimpan.')
      return
    }
    if (Number(form.durasi) < 0 || Number(form.kalori) < 0) {
      setError('Durasi dan kalori tidak boleh bernilai negatif.')
      return
    }
    const itemBaru = {
      id: `lat-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      judul: form.judul.trim(),
      kategori: form.kategori,
      tanggal: form.tanggal || tanggalHariIni(),
      durasi: Number(form.durasi) || 0,
      kalori: Number(form.kalori) || 0,
    }
    onSimpan(itemBaru)
  }

  return (
    <form className="entry-form" onSubmit={simpan} noValidate>
      <div className="form-field field-full">
        <label htmlFor="judul">Judul <span className="required-mark">*</span></label>
        <input
          id="judul"
          name="judul"
          type="text"
          value={form.judul}
          onChange={ubahForm}
          placeholder="Contoh: Lari santai setelah kuliah"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'pesan-error' : undefined}
        />
        <small>Gunakan nama yang mudah kamu ingat.</small>
      </div>
      <div className="form-field">
        <label htmlFor="kategori">Kategori</label>
        <select id="kategori" name="kategori" value={form.kategori} onChange={ubahForm}>
          {KATEGORI.map((kategori) => <option key={kategori} value={kategori}>{kategori}</option>)}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="tanggal">Tanggal</label>
        <input id="tanggal" name="tanggal" type="date" value={form.tanggal} onChange={ubahForm} />
      </div>
      <div className="form-field">
        <label htmlFor="durasi">Durasi</label>
        <div className="input-unit"><input id="durasi" name="durasi" type="number" min="0" value={form.durasi} onChange={ubahForm} /><span>menit</span></div>
      </div>
      <div className="form-field">
        <label htmlFor="kalori">Kalori Terbakar</label>
        <div className="input-unit"><input id="kalori" name="kalori" type="number" min="0" value={form.kalori} onChange={ubahForm} /><span>kkal</span></div>
      </div>
      {error && <p id="pesan-error" role="alert" className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="button button-primary button-save">Simpan <span aria-hidden="true">↗</span></button>
        <p>Catatan akan tersimpan di perangkat ini.</p>
      </div>
    </form>
  )
}
