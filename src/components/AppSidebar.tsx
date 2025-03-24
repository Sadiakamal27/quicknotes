"use client"; // Ensure this is at the top

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import SidebarGroupContent from "@/components/SidebarGroupContent"; // Ensure the path is correct
import { useEffect, useState } from "react";

function AppSidebar() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetch notes from the API
        fetch("/api/notes")
            .then((response) => response.json())
            .then((data) => setNotes(data))
            .catch((error) => console.error("Failed to fetch notes:", error));
    }, []);

    return (
        <Sidebar>
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 mt-2 text-lg">
                        Your Notes {/* Render the label */}
                    </SidebarGroupLabel>
                    <SidebarGroupContent notes={notes} noteId={""} deleteNoteLocally={function (noteId: string): void {
                        throw new Error("Function not implemented.");
                    } } createNewNote={function (): Promise<string> {
                        throw new Error("Function not implemented.");
                    } } /> {/* Use the custom component */}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {/* Add footer content if needed */}
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;