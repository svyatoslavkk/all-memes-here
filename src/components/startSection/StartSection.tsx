interface StartSectionProps {
  name: string;
}

export default function StartSection({name}: StartSectionProps) {
  return (
    <div className="flex-between">
      <h3>{name}</h3>
      <button className="transparent-button">
        <span className="small-text" style={{color: '#7f5539'}}>More</span>
      </button>
    </div>
  )
}
