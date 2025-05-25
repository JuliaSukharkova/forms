import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/utils/firebase/firebase";


export const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);
  return user;
};
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import { useEffect, useState } from "react";

// export const useAuthUser = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, setUser);
//     return unsubscribe;
//   }, []);

//   return user;
// };