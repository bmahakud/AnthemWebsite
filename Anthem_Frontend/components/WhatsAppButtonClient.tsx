"use client";
// Thin client-only wrapper so the root Server Layout can safely include
// WhatsAppButton without triggering SSR hook errors.
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
});

export default function WhatsAppButtonClient() {
  return <WhatsAppButton />;
}
