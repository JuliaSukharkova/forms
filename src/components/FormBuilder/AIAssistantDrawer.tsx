import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import type { FormSettings } from "@/types/type";
import { generateFormWithGemini } from "@/services/lib/generateFormWithGemini";
import { Loader, Sparkle } from "lucide-react";
import { cn } from "@/services/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  onFormGenerated: (form: FormSettings) => void;
  title: string;
  descriptionOne: string;
  descriptionSecond: string;
  aiButtonSave: string;
  aiButtonLoading: string;
  aiButtonClose: string;
};

export function AIAssistantDrawer({
  open,
  onClose,
  onFormGenerated,
  title,
  descriptionOne,
  descriptionSecond,
  aiButtonClose,
  aiButtonLoading,
  aiButtonSave,
}: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await generateFormWithGemini(input);
      onFormGenerated(result);
      onClose();
      setInput("");
    } catch (e) {
      console.error(e);
      setError("Something went wrong while generating the form.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setInput("");
      setError("");
    }
  }, [open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200",
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed w-[400px] h-[400px] bottom-16 max-md:bottom-8 right-0 z-50 flex flex-col justify-between bg-muted border border-primary/20 rounded-md p-5 transition-all duration-300 shadow-xl will-change-transform transform-gpu",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        )}
      >
        <div>
          <div className="flex flex-col justify-center items-center mb-5">
            <div className="flex justify-center items-center gap-1">
              <Sparkle className="stroke-primary w-4 h-4" />
              <h2 className="text-lg font-medium text-primary">{title}</h2>
            </div>
            <p className="text-muted-foreground text-center">
              {descriptionOne}
              <br />
              {descriptionSecond}
            </p>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here the description of the form..."
            rows={5}
          />
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button
            disabled={loading || !input}
            onClick={handleGenerate}
            className={cn(
              "flex-1",
              loading || !input ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2" />
                {aiButtonLoading}
              </>
            ) : (
              aiButtonSave
            )}
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={onClose}
          >
            {aiButtonClose}
          </Button>
        </div>
      </div>
    </>
  );
}
