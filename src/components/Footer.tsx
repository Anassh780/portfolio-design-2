import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Dynamic Background Glow */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-[1920px] mx-auto px-8">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20">

                    {/* Brand & Vision */}
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2 mb-6 group cursor-pointer w-fit">
                            <div className="w-10 h-10 rounded-sm bg-white flex items-center justify-center text-black font-black text-2xl group-hover:scale-110 transition-transform duration-300">
                                L
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase">Logoipsum</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Redefining the automotive purchasing experience. We blend high-performance engineering with seamless digital curation. Discover your ultimate driving machine.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            {['In', 'X', 'Fb'].map((social, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                        <div>
                            <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[10px] opacity-40">Vehicles</h4>
                            <ul className="flex flex-col gap-4">
                                {['Inventory', 'New Arrivals', 'Pre-Owned', 'Build & Price'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 relative group">
                                            {link}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Experience</h4>
                            <ul className="flex flex-col gap-4">
                                {['Test Drive', 'Tuning', 'Track Days', 'Events'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 relative group">
                                            {link}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Support</h4>
                            <ul className="flex flex-col gap-4">
                                {['Contact', 'FAQ', 'Locations', 'Warranty'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 relative group">
                                            {link}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Massive Animated Wordmark */}
                <div className="w-full flex items-center justify-center py-12 border-t border-b border-white/5 mb-12 overflow-hidden">
                    <motion.h1
                        className="text-[15vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#222,#050505)] select-none"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}
                        whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        LOGOIPSUM
                    </motion.h1>
                </div>

                {/* Bottom copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em]">
                    <p>© {new Date().getFullYear()} Logoipsum Automotive. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
