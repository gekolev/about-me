"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const messages = [
  "Hello, there!",
  "You're awesome!",
  "Keep exploring!",
  "Have a great day!",
  "Stay curious!",
  "Click me!",
  "Random fact!",
  "What's next?",
  "Try me!",
  "Discover more!",
];

// Hardcoded values for specific weeks
const hardcodedMessages = {
  Week6: "On a ski trip",
  Week10: "Special event!",
};

const isHardcodedKey = (
  key: string
): key is keyof typeof hardcodedMessages => key in hardcodedMessages;

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const targets = document.querySelectorAll("[data-cursor]");
    const xTo = gsap.quickTo(cursor, "x", { ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { ease: "power3" });

    // Keep existing data-cursor values
    targets.forEach((target) => {
      const existingCursorValue = target.getAttribute("data-cursor");

      if (!existingCursorValue) {
        const weekTitle = target.textContent?.trim();

        // Assign a message if no existing data-cursor is present
        const assignedMessage =
          weekTitle && isHardcodedKey(weekTitle)
            ? hardcodedMessages[weekTitle]
            : messages[Math.floor(Math.random() * messages.length)];

        target.setAttribute("data-cursor", assignedMessage);
      }
    });

    const updateCursorPosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xTo(clientX);
      yTo(clientY);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute("data-cursor");

      if (text) {
        cursor.innerHTML = `<p>${text}</p>`;
        cursor.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
