import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { app, database } from '../firebase/firebaseConfig';

const UserContext = createContext<{
  user: any;
  fireData: any[];
  fetchData: () => Promise<void>;
} | undefined>(undefined);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [fireData, setFireData] = useState<any[]>([]);
  const [fetchPosts, setFetchPosts] = useState([]);
  const collectionRef = collection(database, 'Users Data');
  const postCollectionRef = collection(database, 'Posts Data');

  const fetchData = async () => {
    try {
      const response = await getDocs(collectionRef);
      setFireData(response.docs.map((data) => ({ ...data.data(), id: data.id })));
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const getPostsData = async () => {
    try {
      const postsDocSnapshot = await getDocs(postCollectionRef);
      const postsDoc = postsDocSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const postsArray = postsDoc[0].posts;
      setFetchPosts(postsArray);
    } catch (error) {
      console.error('Error getting posts document:', error);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (token) {
      fetchData();

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
    <UserContext.Provider value={{ user, fireData, fetchData, fetchPosts }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};