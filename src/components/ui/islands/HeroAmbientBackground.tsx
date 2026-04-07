import { useEffect, useRef } from "react";

function CanvasMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const CELL_SIZE = 80;

    const staticColors = [
      '99, 102, 241', // indigo-500
      '79, 70, 229',  // indigo-600
      '67, 56, 202'   // indigo-700
    ];

    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let cells: any[] = [];
    const initCells = (w: number, h: number) => {
      cells = [];
      const cols = Math.ceil(w / CELL_SIZE);
      const rows = Math.ceil(h / CELL_SIZE);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Spatial seed: stable by coordinate, not by linear index
          // This means blocks don't jump when cols/rows change on resize
          const seed = col * 10000 + row;
          const isFilled = pseudoRandom(seed + 42) > 0.82;
          const isNode = isFilled && pseudoRandom(seed + 600) > 0.90;

          const pulseDelay = pseudoRandom(seed + 200) * 4000;
          const pulseDuration = isNode
            ? (0.5 + pseudoRandom(seed) * 1.5) * 1000
            : (3 + pseudoRandom(seed + 400) * 4) * 1000;

          const baseOpacity = isNode
            ? 0.25 + pseudoRandom(seed) * 0.25
            : (isFilled ? 0.04 + pseudoRandom(seed) * 0.06 : 0);

          const colorIndex = Math.floor(pseudoRandom(seed + 300) * 3);

          cells.push({
            baseOpacity,
            isPulsing: isFilled,
            pulseDelay,
            pulseDuration,
            isNode,
            color: staticColors[colorIndex],
            // 1px inset: block sits cleanly inside the CSS grid lines
            x: col * CELL_SIZE + 1,
            y: row * CELL_SIZE + 1,
            w: CELL_SIZE - 2,
            h: CELL_SIZE - 2,
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Handle high-DPI displays — reset transform first to prevent accumulation
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initCells(width, height);
    };

    window.addEventListener('resize', resize);
    resize();

    let startTime = performance.now();

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      cells.forEach(cell => {
        if (!cell.isPulsing) return;

        const elapsed = time - startTime;
        let progress = ((elapsed + cell.pulseDelay) % cell.pulseDuration) / cell.pulseDuration;
        const pulse = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
        
        const currentOpacity = cell.baseOpacity * (0.4 + pulse * 0.6);

        // Reset shadow for every cell to be safe, but only apply to nodes
        ctx.shadowBlur = 0;
        
        if (cell.isNode) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = `rgba(${cell.color}, ${cell.baseOpacity * 0.8})`;
        }

        ctx.fillStyle = `rgba(${cell.color}, ${currentOpacity})`;
        ctx.fillRect(cell.x, cell.y, cell.w, cell.h);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      style={{
        maskImage: 'radial-gradient(ellipse 120% 120% at 50% 50%, #000 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 120% 120% at 50% 50%, #000 40%, transparent 80%)'
      }}
    />
  );
}

export default function HeroAmbientBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-100">
      {/* Base Grid Lines - Moved to z-10 to sit on top of pulses */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0',
          maskImage: 'radial-gradient(ellipse 120% 120% at 50% 50%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 120% 120% at 50% 50%, #000 20%, transparent 80%)'
        }}
      />
      
      {/* High-Performance Canvas Matrix - Set to z-0 */}
      <CanvasMatrix />
      
      <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_80px_rgba(9,9,11,0.7)]" />
    </div>
  );
}
