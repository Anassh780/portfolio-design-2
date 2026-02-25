import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 600], [0, -100]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 600], [1, 1.06]);

    const letterVariants = {
        hidden: { opacity: 0, y: 80, filter: "blur(20px)" },
        visible: (i: number) => ({
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }
        })
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col z-0">

            {/* NEW ERA — premium outlined, perfectly contained */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                style={{ y: yText, opacity: opacityText, scale }}
            >
                <div className="w-full text-center px-0 overflow-hidden">
                    {"NEW ERA".split("").map((letter, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className={`
                                inline-block font-black leading-none
                                text-transparent
                                ${letter === ' ' ? 'w-[6vw]' : ''}
                            `}
                            style={{
                                fontSize: 'clamp(70px, 20vw, 320px)',
                                WebkitTextStroke: '2px rgba(255,255,255,0.22)',
                                textShadow: '0 0 120px rgba(255,255,255,0.04)',
                                letterSpacing: '-0.01em',
                                background: 'linear-gradient(to bottom, #bbb 0%, #444 55%, transparent 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                            }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Ground fade */}
            <div className="absolute bottom-0 left-0 right-0 h-[55vh] bg-gradient-to-t from-black via-black/75 to-transparent z-[1] pointer-events-none" />

            {/* Foreground UI - pinned to bottom */}
            <div className="absolute bottom-0 w-full z-[10] pb-10 md:pb-14">
                <div className="container mx-auto px-8 flex flex-col md:flex-row items-end justify-between gap-6">

                    {/* Left */}
                    <motion.div
                        className="flex flex-col gap-5 max-w-xs pointer-events-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        <div className="relative pl-4 border-l border-orange-500/60">
                            <motion.div
                                className="absolute left-0 top-0 w-[2px] h-full bg-orange-500 origin-top rounded-full"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                            />
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Choose from thousands of certified cars you can trust, transparently priced, because buying a car should feel{' '}
                                <span className="text-white font-black uppercase text-[10px] tracking-wider">exciting</span>.
                            </p>
                        </div>

                        <MagneticButton>
                            <button className="flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500 group relative overflow-hidden">
                                <span className="absolute inset-0 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full z-0" />
                                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                                    EXPLORE INVENTORY
                                    <span className="bg-black/10 p-1.5 rounded-full">
                                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </span>
                            </button>
                        </MagneticButton>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        className="text-right pointer-events-auto"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-[76px] font-black leading-[0.85] uppercase tracking-tighter text-white">
                            FIND THE PERFECT<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                                DREAM CAR
                            </span>
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[20]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            >
                <span className="text-[9px] uppercase tracking-[0.35em] text-gray-600 font-black">Scroll</span>
                <div className="w-px h-10 bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                        className="w-full h-1/2 bg-orange-500 absolute top-0 rounded-full"
                        animate={{ y: [0, 40, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
