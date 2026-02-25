import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import MagneticButton from './MagneticButton';

const navItems = ['Home', 'Shop', 'Blog', 'About Us', 'Contact Us'];

const Navbar: React.FC = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'py-4 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="flex items-center justify-between px-8 max-w-[1920px] mx-auto">
                {/* Logo */}
                <MagneticButton>
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center text-black font-black text-xl group-hover:scale-110 transition-transform duration-300">
                            L
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase">Logoipsum</span>
                    </div>
                </MagneticButton>

                {/* Navigation Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                        >
                            <a
                                href="#"
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-orange-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                            >
                                {item}
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex items-center gap-6">
                    <MagneticButton>
                        <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
                            Sign In
                        </button>
                    </MagneticButton>
                    <MagneticButton>
                        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] relative overflow-hidden group">
                            <span className="absolute inset-0 w-full h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                <ShoppingCart size={14} />
                                Cart
                            </span>
                        </button>
                    </MagneticButton>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
