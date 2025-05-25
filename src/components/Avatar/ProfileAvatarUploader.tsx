import { cn } from "@/lib/utils";
import { CircleCheck, Loader, PencilLine, UploadCloud } from "lucide-react";

interface IAvatar {
  photo: string | undefined;
  onUploadClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  fileInputRef: React.Ref<HTMLInputElement>;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  loading: boolean;
  hasChanges: boolean;
}

const ProfileAvatarUploader = ({
  photo,
  onUploadClick,
  onFileChange,
  fileInputRef,
  change,
  setChange,
  handleSubmit,
  loading,
  hasChanges,
}: IAvatar) => (
  <div className="relative flex items-center justify-center">
    <div className="relative w-40 h-40">
      <img
        className="rounded-full object-cover w-full h-full"
        src={photo}
        alt="User avatar"
      />

      {change && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full hover:bg-transparent hover:border border-dashed border-primary/30 hover:shadow-[var(--shadow)] transition cursor-pointer">
          <button onClick={onUploadClick}>
            <UploadCloud className="w-5 h-5 stroke-primary" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      )}
    </div>

    <div className="absolute top-0 right-0">
      {!change ? (
        <button className="cursor-pointer" onClick={() => setChange(true)}>
          <PencilLine className="w-6 h-6 stroke-primary hover:stroke-primary-bright" />
        </button>
      ) : loading ? (
        <Loader className="animate-spin stroke-primary w-10 h-10" />
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!hasChanges || loading}
          className={cn(
            "transition-colors",
            hasChanges ? "cursor-pointer" : "cursor-not-allowed"
          )}
        >
          <CircleCheck
            className={cn(
              hasChanges ? "stroke-primary" : "stroke-muted-light",
              "w-10 h-10"
            )}
          />
        </button>
      )}
    </div>
  </div>
);

export default ProfileAvatarUploader;
