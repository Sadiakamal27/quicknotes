"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function DeleteNoteButton({ 
  noteId,
  deleteNoteLocally 
}: { 
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;
      
      deleteNoteLocally(noteId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="invisible text-red-500 group-hover/item:visible"
    >
      Delete
    </button>
  );
}