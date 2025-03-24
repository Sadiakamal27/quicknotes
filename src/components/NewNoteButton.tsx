"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import { createNoteAction } from "@/actions/notes";

// Define the expected return type of createNoteAction
type CreateNoteResult = {
  id: string;
  errorMessage?: string;
} | {
  errorMessage: string;
  id?: never;
};

function NewNoteButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const uuid = uuidv4(); // Generate UUID
      const result = await createNoteAction() as unknown as CreateNoteResult; // Cast result to CreateNoteResult
      
      if ("id" in result) {
        router.push(`/?noteId=${result.id}`);
        router.refresh();
      } else {
        console.error("Creation failed:", result.errorMessage);
        alert(`Failed to create note: ${result.errorMessage || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Critical error:", error);
      alert("A critical error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;