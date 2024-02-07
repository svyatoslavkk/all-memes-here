import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import MenuBar from "../components/menuBar/MenuBar";
import ToCreatePost from "../components/toCreatePost/ToCreatePost";

export default function RootLayout() {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
  };

  const handleCreatePostClose = () => {
    setShowCreatePost(false);
  };

  return (
    <>
      <Header handleCreatePostClick={handleCreatePostClick} />
      <Outlet />
      <MenuBar handleCreatePostClick={handleCreatePostClick} />
      {showCreatePost && (
        <ToCreatePost handleCreatePostClose={handleCreatePostClose} />
      )}
    </>
  );
}
