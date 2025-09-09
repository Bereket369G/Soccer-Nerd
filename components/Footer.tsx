import React from 'react';

interface FooterProps {
    activeView: 'home' | 'stats' | 'profile';
    onNavigate: (view: 'home' | 'profile') => void;
}

const Footer: React.FC<FooterProps> = ({ activeView, onNavigate }) => {
    // The 'stats' icon has been removed as per the user's request to simplify the navigation.
    const navItems: { icon: string; view: 'home' | 'profile'; isAction: boolean; }[] = [
        { icon: 'home', view: 'home', isAction: true },
        { icon: 'person_outline', view: 'profile', isAction: true },
    ];

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] max-w-sm mx-auto rounded-t-3xl z-30">
            <nav className="flex justify-around items-center p-4">
                {navItems.map((item) => {
                    const isActive = item.view === activeView;
                    return (
                        <button 
                            key={item.view} 
                            onClick={() => item.isAction && onNavigate(item.view)}
                            className={`flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-amber-500' : 'text-gray-400'} ${item.isAction ? 'cursor-pointer' : 'cursor-default'}`}
                            aria-label={item.view}
                            disabled={!item.isAction}
                        >
                            <span className="material-icons">{item.icon}</span>
                        </button>
                    );
                })}
            </nav>
        </footer>
    );
};

export default Footer;