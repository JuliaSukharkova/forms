import { updateProfile, type User } from "firebase/auth";

export const updateUserProfile = async (
  user: User,
  displayName: string,
  photoURL: string | undefined
) => {
  return updateProfile(user, { displayName, photoURL });
};
