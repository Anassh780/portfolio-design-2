import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const specifications = [
    {
        title: "Aerodynamics",
        description: "Active rear wing and dynamic front diffusers auto-adjust to maximize downforce and cornering stability at high speeds.",
        stat: "991 lbs",
        label: "Max Downforce",
        image: "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&q=80&w=1400",
    },
    {
        title: "Powertrain",
        description: "A twin-turbocharged flat-six engine engineered with titanium internals, revving to a stratospheric 9,000 RPM.",
        stat: "750 HP",
        label: "Total Output",
        image: "https://images.unsplash.com/photo-1544885896-1875155dfac5?auto=format&fit=crop&q=80&w=1400",
    },
    {
        title: "Interior",
        description: "Carbon fiber bucket seats and Alcantara-wrapped steering wheel provide tactile feedback and unyielding support.",
        stat: "2.1s",
        label: "0-60 MPH",
        image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1400",
    },
    {
        title: "Chassis",
        description: "A rigid carbon-composite monocoque ensures zero flex, translating steering input instantly to the tarmac.",
        stat: "1,450 kg",
        label: "Curb Weight",
        image: "https://images.unsplash.com/photo-1614028302061-ce107b7bce3f?auto=format&fit=crop&q=80&w=1400",
    },
];

// Each card: sticky, revealed by circular clip-path
const CircleCard = ({
    spec,
    index,
    total,
}: {
    spec: (typeof specifications)[0];
    index: number;
    total: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Circle reveal: grows from 0% to 150% as card scrolls into view
    const clipRadius = useTransform(
        scrollYProgress,
        [0, 0.35, 0.65],
        ['circle(0% at 50% 50%)', 'circle(75% at 50% 50%)', 'circle(150% at 50% 50%)']
    );

    // Card scales down slightly as you scroll past it (to peek next card)
    const scaleDown = useTransform(scrollYProgress, [0.7, 1], [1, 0.9]);
    const yPush = useTransform(scrollYProgress, [0.7, 1], ['0%', '-8%']);

    return (
        // Reserve 120vh per card so sticky has room to move
        <div ref={ref} className="relative h-[120vh]">
            {/* Sticky container — card pins while circle reveal plays */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ clipPath: clipRadius, scale: scaleDown, y: yPush }}
                    className="absolute inset-3 md:inset-6 rounded-3xl overflow-hidden"
                >
                    {/* Background image */}
                    <img
                        src={spec.image}
                        alt={spec.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

                    {/* Card index */}
                    <div className="absolute top-7 right-7">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/25">
                            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-3">
                            {spec.label}
                        </p>
                        <p className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none mb-4">
                            {spec.stat}
                        </p>
                        <div className="w-10 h-px bg-orange-500 mb-5" />
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-3">
                            {spec.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                            {spec.description}
                        </p>
                    </div>

                    {/* Orange accent line bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-transparent opacity-50" />
                </motion.div>
            </div>
        </div>
    );
};

const DragCarousel: React.FC = () => {
    return (
        <section className="relative bg-[#050505]">
            {/* Sticky section label */}
            <div className="sticky top-0 z-30 pointer-events-none h-0 overflow-visible">
                <div className="pt-8 pl-8 md:pl-16">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-orange-500/50">Engineering</p>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white/50 leading-none">
                        Technical Mastery
                    </h2>
                </div>
            </div>

            {/* One card per scroll segment */}
            {specifications.map((spec, index) => (
                <CircleCard
                    key={spec.title}
                    spec={spec}
                    index={index}
                    total={specifications.length}
                />
            ))}
        </section>
    );
};

export default DragCarousel;
