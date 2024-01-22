import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
