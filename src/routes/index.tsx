import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mary's Hair Salon — Hair Styling, Colouring & Extensions in Southampton" },
      { name: "description", content: "Mary's Hair Salon on Shirley Road, Southampton. Expert hair cutting, colouring, balayage, treatments and premium human hair extensions. Call or WhatsApp to book." },
      { property: "og:title", content: "Mary's Hair Salon — Southampton" },
      { property: "og:description", content: "Professional hair styling, colouring, treatments and premium human hair extensions in Southampton." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/salon/images/hero.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // The site is a fully static bundle in /public/salon/ (ready for GitHub Pages).
  // Preview it here by loading the static index.html.
  useEffect(() => {
    window.location.replace("/salon/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#F8F2EC", fontFamily: "system-ui" }}>
      <p style={{ color: "#2B2B2B" }}>Loading Mary's Hair Salon…</p>
    </div>
  );
}
