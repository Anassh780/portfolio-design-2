import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticProps {
    children: React.ReactNode;
    className?: string;
}

const MagneticButton: React.FC<MagneticProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Physics spring configuration for the magnetic pull
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate the center of the element
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Apply a fraction of the distance (magnetic strength)
        x.set(middleX * 0.3);
        y.set(middleY * 0.3);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Snap back to original position
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={`relative inline-flex items-center justify-center cursor-none w-fit ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
