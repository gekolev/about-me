"use client"; 
import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

interface LenisScrollProps {
  children: ReactNode;
}

const LenisScroll = ({ children }: LenisScrollProps) => {
    useEffect(() => {
      const lenis = new Lenis({
        smoothWheel: true, // Enables smooth scrolling for wheel events
        syncTouch: true,   // Mimic touch device scroll
        gestureOrientation: 'vertical', // Gesture scroll orientation
        duration: 1,       // Duration of scroll animation in seconds
        lerp: 0.1,         // Linear interpolation intensity (smooth scrolling)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing function
      });
  
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => {
        lenis.destroy(); // Clean up when the component unmounts
      };
    }, []);
  
    return <>{children}</>;
  };
export default LenisScroll;
