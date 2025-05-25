import { BackButton } from "@/components/BackButton";
import { ProfileFormChange } from "@/components/Profile/ProfileFormChange";
import { ProfilePassword } from "@/components/Profile/ProfilePasswordChange";
import { Title } from "@/components/Title";

const ProfilePage = () => {
  return (
    <div className="m-5">
      <BackButton />
      <Title className="mb-5 pt-5 pl-2" text="My Profile" />
      <div className="w-full flex gap-5 items-start ">
        <div className="w-1/2">
          <ProfileFormChange />
        </div>
        <div className="w-1/2">
          <ProfilePassword />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
