import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ParallaxSection from './components/ParallaxSection';
import DragCarousel from './components/DragCarousel';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-[#050505] selection:bg-orange-500/30 cursor-none">
            {/* The Awwwards fixed SVG noise grain overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            <CustomCursor />
            {/* Background Gradient */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/20 via-[#050505] to-[#050505] pointer-events-none" />

            <Navbar />
            <Hero />
            <ParallaxSection />
            <DragCarousel />
            <Features />
            <Footer />
        </div>
    );
}

export default App;
