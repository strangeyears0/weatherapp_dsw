import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark neobrutalist-border-t">
            <div className="mx-auto flex h-20 max-w-md items-center justify-around">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-1 w-1/3 transition-colors ${isActive ? 'text-primary dark:text-neobrutal-accent' : 'text-black/50 dark:text-white/50'}`
                    }
                >
                    <span className="material-symbols-outlined text-3xl">home</span>
                    <span className="text-xs font-bold">Główna</span>
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-1 w-1/3 transition-colors ${isActive ? 'text-primary dark:text-neobrutal-accent' : 'text-black/50 dark:text-white/50'}`
                    }
                >
                    <span className="material-symbols-outlined text-3xl">search</span>
                    <span className="text-xs font-bold">Szukaj</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-1 w-1/3 transition-colors ${isActive ? 'text-primary dark:text-neobrutal-accent' : 'text-black/50 dark:text-white/50'}`
                    }
                >
                    <span className="material-symbols-outlined text-3xl">settings</span>
                    <span className="text-xs font-bold">Ustawienia</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
