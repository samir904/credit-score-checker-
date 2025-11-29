// src/PAGES/NotFound.jsx

import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <AlertTriangle className="w-20 h-20 text-yellow-600 dark:text-yellow-500" />
                </div>

                {/* 404 Text */}
                <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-2">404</h1>
                
                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Sorry, the page you are looking for doesn't exist. It might have been moved or deleted.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound