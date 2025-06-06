import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Toaster } from "sonner";
import {
  MainPage,
  FormSubmitPage,
  SignUpPage,
  FormEditorPage,
  ProfilePage,
  SignInPage,
  FormResponsePage,
} from "./pages";

function App() {
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/form/:id/edit" element={<FormEditorPage />} />
          <Route path="/form/:id" element={<FormSubmitPage />} />
          <Route path="/form/:id/responses" element={<FormResponsePage />} />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </HashRouter>
  );
}

export default App;
