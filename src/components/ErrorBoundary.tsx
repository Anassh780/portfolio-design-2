import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/50 rounded-3xl border border-red-500/20 p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                        <span className="text-red-500 text-2xl font-black">!</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">3D Asset Unavailable</h2>
                    <p className="text-gray-400 text-sm max-w-sm">
                        The Spline 3D model could not be loaded. It may be set to private or the URL has expired.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
