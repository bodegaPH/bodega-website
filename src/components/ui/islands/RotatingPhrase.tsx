import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const PHRASES = [
  'inventory & supply',
  'stock & workflows',
  'orders & fulfillment',
  'assets & tracking',
];

export default function RotatingPhrase() {
  const phraseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let phraseIndex = 0;
    let currentText = PHRASES[0];
    let phase: 'hold' | 'erase' | 'decode' = 'hold';

    const loop = () => {
      const el = phraseRef.current;
      if (!el) return;

      if (phase === 'hold') {
        timeout = setTimeout(() => {
          phase = 'erase';
          loop();
        }, 3000);
      } else if (phase === 'erase') {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          el.textContent = currentText;
          timeout = setTimeout(loop, 45);
        } else {
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          phase = 'decode';
          loop();
        }
      } else if (phase === 'decode') {
        const target = PHRASES[phraseIndex];
        if (currentText.length < target.length) {
          currentText = target.slice(0, currentText.length + 1);
          el.textContent = currentText;
          timeout = setTimeout(loop, 45);
        } else {
          phase = 'hold';
          loop();
        }
      }
    };

    // Initial state setup
    if (phraseRef.current) {
        phraseRef.current.textContent = PHRASES[0];
    }
    
    // Start the loop
    timeout = setTimeout(loop, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
      <span ref={phraseRef}></span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
        className="text-indigo-400 not-italic"
      >|</motion.span>
    </span>
  );
}
