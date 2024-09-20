"use client";
import { useEffect } from "react";
import gsap from "gsap";
import barba from "@barba/core";

const Transition = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize Barba.js
    barba.init({
      transitions: [
        {
          name: "fade",
          leave(data: { current: { container: gsap.TweenTarget; }; }) {
            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
          enter(data: { next: { container: gsap.TweenTarget; }; }) {
            return gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
        },
      ],
    });

    // Cleanup Barba.js when the component is unmounted
    return () => {
      barba.destroy();
    };
  }, []);

  return (
    // This is the Barba wrapper
    <div data-barba="wrapper">
      {/* Each page is wrapped in a container */}
      <div data-barba="container">
        {children}
      </div>
    </div>
  );
};

export default Transition;
