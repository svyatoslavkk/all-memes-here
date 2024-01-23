import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainPage from "./pages/MainPage/MainPage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
