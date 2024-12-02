"use client";

import { gsap } from "gsap";

export const staggerIn = (container: HTMLElement | null) => {
  if (!container) return;

  const elements = container.querySelectorAll(".animated-item");
  gsap.fromTo(
    elements,
    { opacity: 0, y: -15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power1.InOut",
    }
  );
};
