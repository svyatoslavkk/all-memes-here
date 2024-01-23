import MenuBar from "../../components/menuBar/MenuBar"
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { User } from "../../types/types";

export default function Profile() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, 'Users Data');
  const { user, fireData, fetchData } = useUserContext();

  const getUsers = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      setUsers(userList);
    } catch (error) {
      console.error('Error getting users:', error);
    } finally {
      setLoading(false);
    }
  };

  const myData = users
  .filter((data) => data.uid === user?.uid)[0];
  console.log("myData", myData);

  useEffect(() => {
    getUsers();
  }, []);

  const fakeImg = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d9359ae0-065b-4756-bfed-02ad0e0f73f8/dg1t181-2b042eec-17cc-4d17-841b-31c194c091e0.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5MzU5YWUwLTA2NWItNDc1Ni1iZmVkLTAyYWQwZTBmNzNmOFwvZGcxdDE4MS0yYjA0MmVlYy0xN2NjLTRkMTctODQxYi0zMWMxOTRjMDkxZTAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hvmrnKtJN42DTXfSG4w82Xz1Y6tWofYGL3LLccckYHY';

  return (
    <section className="profile">
      <h2>Profile</h2>
      <div>
        {fireData && fireData
        .filter((data: User) => data.uid === user?.uid)
        .map((data: User) => (
          <img src={data.avatar ? data.avatar : fakeImg} className="big-circle-img" alt="" />
        ))}
        <div className="text3">
          {fireData && fireData
            .filter((data: User) => data.uid === user?.uid)
            .map((data: User) => (
              <h3 className="big-header">{data.fullName ? data.fullName : "NONE"}</h3>
            ))}
          {fireData && fireData
            .filter((data: User) => data.uid === user?.uid)
            .map((data: User) => (
              <span className="mid-text">@{data.userName ? data.userName : 'NONE'}</span>
            ))}
        </div>
        <div className="profile-buttons">
          <button className="favorite-section-button">
            <h3 className="mid-header">Favorites</h3>
          </button>
        </div>
        
      </div>
      <MenuBar />
    </section>
  )
}