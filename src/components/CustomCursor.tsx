import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Using springs for the smooth trailing effect
    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    // Outer trailing circle
    const outerX = useSpring(0, { stiffness: 200, damping: 30 });
    const outerY = useSpring(0, { stiffness: 200, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 4); // anchor center
            cursorY.set(e.clientY - 4);
            outerX.set(e.clientX - 20); // anchor center
            outerY.set(e.clientY - 20);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Expand cursor if hovering over interactive elements
            if (target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="hidden md:block select-none pointer-events-none z-[999999] relative">
            {/* Core dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-orange-500 rounded-full mix-blend-difference pointer-events-none"
                style={{ x: cursorX, y: cursorY }}
            />
            {/* Trailing ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-orange-500/50 rounded-full mix-blend-difference pointer-events-none flex items-center justify-center backdrop-blur-[2px]"
                style={{ x: outerX, y: outerY }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </div>
    );
};

export default CustomCursor;
