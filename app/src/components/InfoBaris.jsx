export default function InfoBaris({ label, nilai }) {
  return (
    <div className="info-row">
      <dt>{label}</dt>
      <dd>{nilai}</dd>
    </div>
  )
}
