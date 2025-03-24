"use client";

import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Note = {
  id: string;
  content: string;
  created_at: string;
};

function SidebarGroupContent() {
  const [searchText, setSearchText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const supabase = createClientComponentClient();

  // Fetch initial notes and setup realtime
  useEffect(() => {
    const fetchInitialNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setNotes(data);
      if (error) console.error("Error fetching notes:", error);
    };

    fetchInitialNotes();

    // Realtime subscription
    const channel = supabase
      .channel("realtime-notes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setNotes(prev => [payload.new as Note, ...prev]);
              break;
              case "UPDATE":
                setNotes(prev => prev.map(existingNote => 
                  existingNote.id === payload.new.id ? 
                  { ...existingNote, ...payload.new } : // Merge updates
                  existingNote
                ));
                break;
              break;
            case "DELETE":
              setNotes(prev => prev.filter(note => 
                note.id !== payload.old.id
              ));
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Search functionality
  const fuse = useMemo(() => new Fuse(notes, {
    keys: ["content"],
    threshold: 0.4,
  }), [notes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map(result => result.item)
    : notes;

  // Handle local deletion
  const deleteNoteLocally = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center p-4">
        <SearchIcon className="absolute left-6 size-4" />
        <Input
          className="bg-muted pl-10"
          placeholder="Search notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="px-2">
        {filteredNotes.map(note => (
          <SidebarMenuItem key={note.id} className="group/item hover:bg-accent">
            <SelectNoteButton note={note} />
            <DeleteNoteButton 
              noteId={note.id} 
              deleteNoteLocally={deleteNoteLocally} 
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupContent;