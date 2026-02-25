import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const features = [
    {
        title: "Aerodynamics",
        description: "Sculpted for the wind. The active aerodynamics system continuously adapts to reduce drag and increase downforce when you need it most.",
        stats: "0.32 Cd",
        label: "DRAG COEFFICIENT"
    },
    {
        title: "Performance",
        description: "Pure electric power delivered instantly. Our advanced dual-motor setup provides relentless acceleration and perfect torque distribution.",
        stats: "2.1s",
        label: "0-60 MPH"
    },
    {
        title: "Intelligence",
        description: "A supercomputer on wheels. The neural processing unit analyzes millions of data points per second to ensure perfect safety and comfort.",
        stats: "500+",
        label: "SENSORS"
    }
];

// Reusable 3D Tilt Card Component
const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    const x = useSpring(0, { stiffness: 400, damping: 30 });
    const y = useSpring(0, { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct * 20); // max rotation 20deg
        y.set(yPct * -20); // inverted y for natural feel
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
            className="w-full"
        >
            <motion.div
                style={{ rotateX: y, rotateY: x }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative w-full rounded-3xl bg-neutral-900/50 border border-white/10 p-8 md:p-12 overflow-hidden flex flex-col justify-between h-[400px] hover:border-orange-500/30 transition-colors cursor-crosshair transform-gpu"
            >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">{feature.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                        {feature.description}
                    </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                    <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                        {feature.stats}
                    </span>
                    <span className="text-[10px] font-black tracking-[0.3em] text-gray-500/50 uppercase">
                        {feature.label}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Features = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative w-full py-20 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-8 max-w-[1920px]">

                {/* Section Header */}
                <motion.div
                    style={{ y: yTitle, opacity: opacityTitle }}
                    className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.9] tracking-tighter mix-blend-difference">
                        ENGINEERED<br />FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">PERFECTION</span>
                    </h2>
                    <p className="max-w-xs text-gray-400 font-medium">
                        Every detail meticulously crafted to deliver an unparalleled driving experience.
                    </p>
                </motion.div>

                {/* Grid of Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard key={feature.title} feature={feature} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
