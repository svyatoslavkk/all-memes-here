import { Link } from "react-router-dom";

interface StartSectionProps {
  name: string;
  link?: string;
}

export default function StartSection({ name, link }: StartSectionProps) {
  return (
    <div className="flex-between">
      <h3>{name}</h3>
      {link && (
        <Link
          to={link}
          className="transparent-button"
          style={{ textDecoration: "none" }}
        >
          <span className="small-text" style={{ color: "#7f5539" }}>
            More
          </span>
        </Link>
      )}
    </div>
  );
}
