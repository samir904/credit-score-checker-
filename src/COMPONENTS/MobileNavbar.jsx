// src/components/MobileNavbar.jsx

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, FileText, User, PieChart } from 'lucide-react';

function MobileNavbar() {
    const location = useLocation();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const navItems = isAuthenticated ? [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/dashboard', icon: PieChart, label: 'Dashboard' },
        { path: '/my-applications', icon: FileText, label: 'Applications' },
        { path: '/profile', icon: User, label: 'Profile' }
    ] : [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/about', icon: FileText, label: 'About' },
        { path: '/how-it-works', icon: PieChart, label: 'How It Works' },
        { path: '/login', icon: User, label: 'Login' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg z-50">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                                active
                                    ? 'text-teal-600 dark:text-teal-400'
                                    : 'text-slate-500 dark:text-slate-400'
                            }`}
                        >
                            <Icon className={`w-6 h-6 mb-1 ${active ? 'scale-110' : ''} transition-transform`} />
                            <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>
                                {item.label}
                            </span>
                            {active && (
                                <div className="absolute bottom-0 w-12 h-1 bg-teal-600 dark:bg-teal-400 rounded-t-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default MobileNavbar;
