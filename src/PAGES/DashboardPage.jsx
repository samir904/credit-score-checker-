// src/pages/DashboardPage.jsx

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FilePlus, TrendingUp, FileText } from 'lucide-react';

function DashboardPage() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome{user ? `, ${user.fullName}` : ''}!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your applications, check your credit scores, and apply for new loans instantly.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                <Link to="/apply"
                    className="block rounded-xl shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition p-8 text-white text-center">
                    <FilePlus className="mx-auto w-8 h-8 mb-3" />
                    <div className="font-bold text-lg mb-1">New Application</div>
                    <div className="text-teal-50">Apply for a new loan and get instant scoring</div>
                </Link>

                <Link to="/my-applications"
                    className="block rounded-xl shadow-lg bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 transition p-8 text-center">
                    <FileText className="mx-auto w-8 h-8 mb-3 text-teal-500" />
                    <div className="font-bold text-lg mb-1">My Applications</div>
                    <div className="text-slate-600 dark:text-slate-300">View all your past and current applications</div>
                </Link>

                <Link to="/score-history"
                    className="block rounded-xl shadow-lg bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 transition p-8 text-center">
                    <TrendingUp className="mx-auto w-8 h-8 mb-3 text-teal-500" />
                    <div className="font-bold text-lg mb-1">Score History</div>
                    <div className="text-slate-600 dark:text-slate-300">Analyze your credit journey over time</div>
                </Link>
            </div>
        </div>
    );
}

export default DashboardPage;
