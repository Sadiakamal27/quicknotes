"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {
  note: {
    id: string;
    content: string;
    created_at: string;
  };
};

function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";

  // Directly use note.content instead of local state
  const getDisplayText = () => {
    // Handle empty content explicitly
    if (!note.content.trim()) return "New Note";
    
    const firstLine = note.content
      .trim()
      .split('\n')
      .find(line => line.trim().length > 0);

    return firstLine 
      ? firstLine.substring(0, 40) 
      : "New Note";
  };

  return (
    <Link 
      href={`/?noteId=${note.id}`} 
      className={`flex-1 pr-6 ${note.id === noteId ? "text-primary font-medium" : "text-muted-foreground"}`}
    >
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex items-center">
          <span className="mr-2">{note.id === noteId && "→"}</span>
          <span className="truncate">
            {getDisplayText()}
          </span>
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          {new Date(note.created_at).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}

export default SelectNoteButton;