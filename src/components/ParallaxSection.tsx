import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const yTextLayer1 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const yTextLayer2 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">

            {/* Background Parallax Layer */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-20"
            >
                {/* Abstract gradient simulating a showroom lighting setup */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/40 via-[#050505] to-[#050505]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-8 flex flex-col items-center justify-center h-screen pointer-events-none sticky top-0">

                <motion.h2
                    className="text-[10vw] xl:text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#333,#050505)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0"
                    style={{ y: yTextLayer1, WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
                >
                    AERODYNAMIC
                </motion.h2>

                <motion.div
                    style={{ y: yTextLayer2 }}
                    className="relative z-10 text-center max-w-3xl mt-24"
                >
                    <h3 className="text-4xl md:text-6xl font-bold mb-6">Designed by the <span className="text-orange-500 italic">Wind</span></h3>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                        Every curve and angle is sculpted to slice through the air with minimal resistance.
                        The result is not just striking aesthetics, but unparalleled efficiency and driving dynamics.
                    </p>

                    <button className="mt-12 px-8 py-4 border border-white/20 hover:border-orange-500 rounded-full font-bold uppercase tracking-widest text-sm transition-colors duration-500 pointer-events-auto">
                        View Specs
                    </button>
                </motion.div>

            </div>

            {/* Dark gradient fade for smooth transitions between sections */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />

        </section>
    );
};

export default ParallaxSection;
