import { BackButton } from "@/components/BackButton";
import { ProfileFormChange, ProfilePassword } from "@/components/Profile";
import { Title } from "@/components/Title";

export const ProfilePage = () => {
  return (
    <div className="m-5">
      <BackButton />
      <Title className="mb-5 pt-5 pl-2 text-primary-text" text="My Profile" />
      <div className="w-full flex flex-row gap-5 items-start max-sm:flex max-sm:flex-col max-sm:gap-1">
        <ProfileFormChange />
        <ProfilePassword />
      </div>
    </div>
  );
};
