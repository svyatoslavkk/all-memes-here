interface StartSectionProps {
  name: string;
}

export default function StartSection({name}: StartSectionProps) {
  return (
    <div className="start-section">
      <h3>{name}</h3>
    </div>
  )
}
