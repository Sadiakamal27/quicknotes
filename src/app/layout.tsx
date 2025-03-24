import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
export const metadata: Metadata = {
  title: "Notes App",
  description: "The quick and simplest notes-taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
<div className="flex min-h-screen w-full flex-col">
<Header />

           <main className="flex flex-1 px-4 pt-10 xl:px-8 " >{children}</main>
            </div>
            </SidebarProvider>
          <Toaster />
          </ThemeProvider>
         
          
      </body>
    </html>
  );
}
