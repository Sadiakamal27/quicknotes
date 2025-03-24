import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import prisma from "@/db/prisma";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

async function HomePage({ searchParams }: Props) {
  const noteId = Array.isArray(searchParams.noteId)
    ? searchParams.noteId[0]
    : searchParams.noteId || "";

  let note = null;
  try {
    note = noteId
      ? await prisma.notes.findFirst({
          where: { id: noteId },
        })
      : null;
  } catch (error) {
    console.error("Database error:", error);
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-5">
      <div className="flex w-full max-w-4xl justify-left gap-2">
        <NewNoteButton />
      </div>
      <NoteTextInput
        noteId={noteId}
        startingNoteText={note?.content || ""}
      />
    </div>
  );
}

export default HomePage;