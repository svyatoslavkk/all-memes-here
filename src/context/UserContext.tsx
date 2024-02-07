import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { app, database } from "../firebase/firebaseConfig";
import { User } from "../types/types";

interface PostData {
  id: string;
  posts: any;
}

const UserContext = createContext<
  | {
      user: User;
      users: User[];
      fireData: any[];
      loading: boolean;
      fetchData: () => Promise<void>;
      fetchPosts: any[];
      getPostsData: () => Promise<void>;
    }
  | undefined
>(undefined);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fireData, setFireData] = useState<any[]>([]);
  const [fetchPosts, setFetchPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const collectionRef = collection(database, "Users Data");
  const postCollectionRef = collection(database, "Posts Data");

  const getUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collectionRef);
      const userList = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as User,
      );
      setUsers(userList);
    } catch (error) {
      console.error("Error getting users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(
        response.docs.map((data) => ({ ...data.data(), id: data.id })),
      );
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const getPostsData = async () => {
    try {
      const postsDocSnapshot = await getDocs(postCollectionRef);
      const postsDoc = postsDocSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostData[];
      const postsArray = postsDoc[0].posts.reverse();
      setFetchPosts(postsArray);
    } catch (error) {
      console.error("Error getting posts document:", error);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      getUsers();
      fetchData();
      getPostsData();

      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        fireData,
        loading,
        fetchData,
        fetchPosts,
        getPostsData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
