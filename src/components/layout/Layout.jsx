import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
            {/* Main Content - Pushed up from bottom nav by padding */}
            <main className="mx-auto w-full max-w-md flex-1 pb-24">
                {children}
            </main>

            {/* Bottom Navigation */}
            <Navbar />
        </div>
    );
};

export default Layout;