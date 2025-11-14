import React, { useEffect, useRef, useState } from 'react';

export default function Carousel({ images = [], interval = 5000, children }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer.current);
  }, [images, interval]);

  const prev = () => {
    clearInterval(timer.current);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    clearInterval(timer.current);
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <section className="relative w-full min-h-[72vh] md:min-h-[78vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        {images && images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `linear-gradient(rgba(65,90,119,0.45), rgba(65,90,119,0.45)), url('${src}')`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="w-full">{children}</div>
      </div>

      {/* controls */}
      <button aria-label="Previous slide" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded bg-black/30 text-white hover:bg-black/50">
        ‹
      </button>
      <button aria-label="Next slide" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded bg-black/30 text-white hover:bg-black/50">
        ›
      </button>

      {/* indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images && images.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(timer.current); setIndex(i); }}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
