// src/components/Toast.jsx

import { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

function Toast({ message, type = 'success', duration = 5000, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const config = {
        success: {
            bg: 'bg-green-100 dark:bg-green-900/20',
            border: 'border-green-300 dark:border-green-700',
            icon: CheckCircle,
            iconColor: 'text-green-600',
            text: 'text-green-800 dark:text-green-300'
        },
        error: {
            bg: 'bg-red-100 dark:bg-red-900/20',
            border: 'border-red-300 dark:border-red-700',
            icon: XCircle,
            iconColor: 'text-red-600',
            text: 'text-red-800 dark:text-red-300'
        },
        warning: {
            bg: 'bg-yellow-100 dark:bg-yellow-900/20',
            border: 'border-yellow-300 dark:border-yellow-700',
            icon: AlertCircle,
            iconColor: 'text-yellow-600',
            text: 'text-yellow-800 dark:text-yellow-300'
        },
        info: {
            bg: 'bg-blue-100 dark:bg-blue-900/20',
            border: 'border-blue-300 dark:border-blue-700',
            icon: Info,
            iconColor: 'text-blue-600',
            text: 'text-blue-800 dark:text-blue-300'
        }
    };

    const current = config[type] || config.success;
    const IconComponent = current.icon;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-bottom">
            <div className={`${current.bg} border ${current.border} rounded-lg p-4 flex items-start gap-3`}>
                <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${current.iconColor}`} />
                <p className={`flex-1 ${current.text}`}>{message}</p>
                <button
                    onClick={onClose}
                    className={`p-1 hover:bg-white/20 rounded ${current.text}`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default Toast;


// ============================================
// ROUTING SETUP
// ============================================

// Add this to your Router configuration (src/App.jsx or src/routes/index.js)

/*
import ApplicationDetail from './pages/ApplicationDetail';

// In your Routes component:
<Route path="/applications/:id" element={<ApplicationDetail />} />
<Route path="/applications/:id/edit" element={<EditApplication />} /> // For future implementation
*/
