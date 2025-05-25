import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { MainPage } from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import NewFormPage from "./pages/NewFormPage";
import { Layout } from "./layouts/Layout";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/new" element={<NewFormPage />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  );
}

export default App;
