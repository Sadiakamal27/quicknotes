"use server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "@/lib/utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// In notes.tsx
export async function createNoteAction() {
  try {
    const newId = uuidv4();
    console.log("Creating note with ID:", newId);
    
    const { data, error } = await supabase
      .from("notes")
      .insert([{ 
        id: newId,
        content: "New note..." 
      }])
      .select();

    if (error) throw error;
    return { id: data![0].id };
  } catch (error) {
    return handleError(error);
  }
}

// UPDATE NOTE (unchanged, using Prisma or Supabase)
export async function updateNoteAction(noteId: string, content: string) {
  try {
    console.log("Attempting update:", { noteId, content }); // Debug log
    
    const { error } = await supabase
      .from("notes")
      .update({ content })
      .eq("id", noteId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return handleError(error);
  }
}

// DELETE NOTE (unchanged, using Prisma or Supabase)
export const deleteNoteAction = async (noteId: string) => {
  try {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      throw new Error(error.message);
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};