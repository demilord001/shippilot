import "./globals.css"; import { ClerkProvider } from "@clerk/nextjs"; import type { Metadata } from "next";
export const metadata: Metadata={title:"ShipPilot.ai — Ship with confidence",description:"AI-powered project delivery manager for builders and teams."};
const configured=Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
export default function RootLayout({children}:{children:React.ReactNode}){const body=<html lang="en"><body>{children}</body></html>;return configured?<ClerkProvider>{body}</ClerkProvider>:body}




