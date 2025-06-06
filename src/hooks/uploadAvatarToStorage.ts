import { storage } from "@/services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadAvatartToStorage = async (file: File, uid: string) => {
  const fileRef = ref(storage, `avatars/${uid}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};
