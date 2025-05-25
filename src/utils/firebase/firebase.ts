import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDETa9zZX6bUUKBpQQdyCQGb5WZoNUp7aM",
  authDomain: "forms-app-c9a1d.firebaseapp.com",
  projectId: "forms-app-c9a1d",
  storageBucket: "forms-app-c9a1d.firebasestorage.app",
  messagingSenderId: "921533828559",
  appId: "1:921533828559:web:12b03d8639dfc1bf1796ba",
  measurementId: "G-W9PG0JCC91",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
