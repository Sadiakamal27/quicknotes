"use client";

import useNote from "@/hooks/useNote";
import { notes } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  note: notes;
};

function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectedNoteText } = useNote();
  const [localNoteText, setLocalNoteText] = useState(note.content || "");

  useEffect(() => {
    if (noteId === note.id) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, noteId, note.id]);

  // Only show "New Note" if there's truly no content
  const displayText = (localNoteText || selectedNoteText || "").trim() 
    ? (localNoteText || selectedNoteText).substring(0, 20) 
    : "";

  return (
    <Link 
      href={`/?noteId=${note.id}`} 
      className={`flex-1 pr-6 ${note.id === noteId ? "text-blue-500" : ""}`}
    >
      <div className="w-full overflow-hidden">
        <span className="mr-2">{note.id === noteId && "→"}</span>
        {displayText ? (
          <span className="truncate">{displayText}</span>
        ) : null}
      </div>
    </Link>
  );
}

export default SelectNoteButton;