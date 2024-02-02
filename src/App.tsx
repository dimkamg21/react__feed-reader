import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { AuthProvider } from "./components/Auth/AuthContext";
// import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { Header } from "./components/Header/Header.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";

export const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<Header />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        {/*<Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
