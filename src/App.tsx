import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { MainPage } from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import FormEditorPage from "./pages/FormEditorPage";
import { Layout } from "./layouts/Layout";
import { Toaster } from "sonner";
import { FormIdPage } from "./pages/FormIdPage";
import { FormResponsesPage } from "./pages/FormResponsesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/form/:id/edit" element={<FormEditorPage />} />
          <Route path="/form/:id" element={<FormIdPage />} />
          <Route path="/form/:id/responses" element={<FormResponsesPage />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  );
}

export default App;
