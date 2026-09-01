import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/store-provider";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { AgeGate } from "@/components/age-gate";
import { Footer } from "@/components/footer";
export const metadata: Metadata = { title: "NOCTURNE — Premium Hookah Market", description: "Premium hookah, shisha and accessories. Worldwide shipping.", openGraph: { title: "NOCTURNE Hookah Market", description: "A premium hookah experience." } };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><StoreProvider><AgeGate/><Header/>{children}<CartDrawer/><Footer/></StoreProvider></body></html>; }
