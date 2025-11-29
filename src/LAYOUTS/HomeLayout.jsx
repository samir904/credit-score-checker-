// src/layouts/HomeLayout.jsx

import { Outlet } from 'react-router-dom';
import Navbar from '../COMPONENTS/Navbar.jsx';
import MobileNavbar from '../COMPONENTS/MobileNavbar.jsx';
import Footer from '../COMPONENTS/Footer.jsx';

function HomeLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Desktop Navbar - Hidden on mobile */}
            <Navbar />

            {/* Main Content */}
            <main className="pb-20 md:pb-0">
                <Outlet />
            </main>
{/* Footer - Hidden on mobile, shown on desktop */}
            <Footer />

            {/* Mobile Bottom Navbar - Hidden on desktop */}
            <MobileNavbar />
        </div>
    );
}

export default HomeLayout;
