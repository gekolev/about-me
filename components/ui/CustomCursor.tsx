"use client";

import React, { useEffect, useRef } from "react";

const messages = [
  "It'll come, soon enough...",
  "There's time, breathe.",
  "Patience is key.",
  "Noodles!",
  "Can't time travel, sorry.",
  "Can't see the future, sorry.",
  "Come back later!",
  "Currently planning what to do this week.",
  "Might travel, might not.",
  "I wonder if...",
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

    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate(${e.clientX + 10}px, ${e.clientY + 15}px)`;
        }
      });
    };

    // Keep all existing hover functionality
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

    // Set up initial messages (keep existing logic)
    targets.forEach((target) => {
      const existingCursorValue = target.getAttribute("data-cursor");

      if (!existingCursorValue) {
        const weekTitle = target.textContent?.trim();
        const assignedMessage =
          weekTitle && isHardcodedKey(weekTitle)
            ? hardcodedMessages[weekTitle]
            : messages[Math.floor(Math.random() * messages.length)];

        target.setAttribute("data-cursor", assignedMessage);
      }

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

  return (
    <div 
      className="cursor pointer-events-none fixed left-0 top-0 z-50" 
      ref={cursorRef}
      style={{ willChange: 'transform' }}
    ></div>
  );
};

export default CustomCursor;
