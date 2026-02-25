import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
    scene: string;
    className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <ErrorBoundary>
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center bg-transparent">
                        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    </div>
                }
            >
                <Spline
                    scene={scene}
                    className={className}
                />
            </Suspense>
        </ErrorBoundary>
    );
}
