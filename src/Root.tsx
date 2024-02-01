import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { AuthProvider } from "./components/Auth/AuthContext";

// import { CardsPage } from './components/PersonalAccount/CardsPage/CardsPage';
// import { Header } from './components/PersonalAccount/Header/Header';
// import { CardProvider } from "./components/PersonalAccount/CardContext/CardContext";
// import { TransactionPage } from './components/PersonalAccount/TransactionPage/Transaction';
// import { PageNotFound } from './components/PersonalAccount/PageNotFound/PageNotFound';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./App.css";

import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";

export const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
            {/* <Route index element={<CardsPage />} />
              <Route path="transfer" element={<TransactionPage />} />
              <Route path="mobile-top-up" element={<TransactionPage />} />
              <Route path="*" element={<PageNotFound />} /> */}
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
