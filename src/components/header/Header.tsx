import logo from "../../assets/logo.png";
import { User } from "../../types/types";
import { useUserContext } from "../../context/UserContext";

export default function Header() {
  const { user, fireData } = useUserContext();

  const fakeImg =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d9359ae0-065b-4756-bfed-02ad0e0f73f8/dg1t181-2b042eec-17cc-4d17-841b-31c194c091e0.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5MzU5YWUwLTA2NWItNDc1Ni1iZmVkLTAyYWQwZTBmNzNmOFwvZGcxdDE4MS0yYjA0MmVlYy0xN2NjLTRkMTctODQxYi0zMWMxOTRjMDkxZTAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hvmrnKtJN42DTXfSG4w82Xz1Y6tWofYGL3LLccckYHY";

  return (
    <header className="header flex-between">
      <div className="flex-content" style={{ zIndex: 9999 }}>
        {fireData &&
          fireData
            .filter((data: User) => data.uid === user?.uid)
            .map((data: User) => (
              <div key={data.uid} className="img-section">
                <img
                  src={data.avatar ? data.avatar : fakeImg}
                  className="circle-img"
                  alt=""
                />
                <span className="online-sign"></span>
              </div>
            ))}
        <div className="text3">
          {fireData &&
            fireData
              .filter((data: User) => data.uid === user?.uid)
              .map((data: User) => (
                <h3 key={data.uid} className="mid-header">
                  {data.fullName ? data.fullName : "NONE"}
                </h3>
              ))}
          {fireData &&
            fireData
              .filter((data: User) => data.uid === user?.uid)
              .map((data: User) => (
                <span key={data.uid} className="mid-text">
                  @{data.userName ? data.userName : "NONE"}
                </span>
              ))}
        </div>
      </div>
      <img src={logo} className="circle-img" alt="Logo" />
    </header>
  );
}
