import { animate } from "motion/react";

export const smoothScrollTo = (targetY) => {
  animate(window.scrollY, targetY, {
    duration: 1.2, // ⬅ slower (was 0.8)
    ease: [0.16, 1, 0.3, 1], // ⬅ smooth, heavy ease-out
    onUpdate: (latest) => window.scrollTo(0, latest),
  });
};
