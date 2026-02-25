import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading sequence
        const interval = setInterval(() => {
            setProgress((prev) => {
                const step = Math.random() * 15;
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 400); // Hold at 100 for a beat
                    return 100;
                }
                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden cursor-none"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* The massive loading counter */}
                    <div className="relative font-black text-[15vw] leading-none tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#fff,#444)]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.05)' }}>
                        {Math.floor(progress)}
                        <span className="text-[5vw] absolute top-4 -right-12">%</span>
                    </div>

                    <div className="absolute bottom-12 w-full flex justify-between px-12 text-sm uppercase tracking-widest text-gray-500 font-medium">
                        <span>Logoipsum Engine</span>
                        <span>Initializing Experience ...</span>
                    </div>

                    {/* Progress Bar Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-75 ease-out" style={{ width: `${progress}%` }} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
