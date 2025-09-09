import React, { useState } from 'react';
import { getTeamLogo } from '../lib/logo-library';

// An array of user's favorite clubs for demonstration.
const favoriteClubs = ['man city', 'real madrid', 'juventus', 'psg', 'bayern munich', 'arsenal'];

// A reusable, styled toggle switch component.
const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void }> = ({ label, enabled, onChange }) => (
    <div className="flex justify-between items-center w-full">
        <span className="text-gray-700 font-medium">{label}</span>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                enabled ? 'bg-amber-500' : 'bg-gray-300'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);


const ProfilePage: React.FC = () => {
    // State for notification toggles.
    const [notifications, setNotifications] = useState({
        reminders: true,
        news: false,
    });
    
    return (
        <div className="pb-24 bg-gray-50">
             <header className="p-4 bg-white sticky top-0 z-10 text-center shadow-sm">
                 <h1 className="text-2xl font-bold">Fan <span className="text-amber-500">Zone</span></h1>
            </header>
            <main className="p-4 space-y-8">
                {/* Supporter Card with enhanced styling */}
                <section className="bg-gradient-to-br from-gray-800 to-black text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 w-40 h-40 opacity-10 transform rotate-12">
                       <img src={getTeamLogo('barcelona')} alt="Favorite club faded logo" className="object-contain" />
                    </div>
                    <div className="relative z-10 flex items-center space-x-4">
                        <img 
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                            alt="User Avatar" 
                            className="w-16 h-16 rounded-full border-4 border-amber-500 animate-pulse"
                        />
                        <div>
                            <h2 className="text-xl font-bold">Alex Morgan</h2>
                            <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">Gold Supporter</p>
                        </div>
                    </div>
                    <div className="relative z-10 mt-4 flex items-center space-x-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
                        <img src={getTeamLogo('barcelona')} alt="FC Barcelona" className="w-8 h-8"/>
                        <p className="font-semibold">Favorite Club: FC Barcelona</p>
                    </div>
                </section>

                {/* Favorite Clubs with more interactivity */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">My Favorite Clubs</h3>
                        <button className="flex items-center space-x-1 text-sm font-medium text-amber-500 hover:text-amber-600 transition-colors">
                            <span className="material-icons text-base">edit</span>
                            <span>Edit</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {favoriteClubs.map(club => (
                            <div key={club} className="bg-white p-3 rounded-xl flex items-center justify-center shadow-sm aspect-square transition-transform duration-200 hover:scale-110 hover:shadow-lg cursor-pointer">
                                <img src={getTeamLogo(club)} alt={club} className="w-10 h-10 object-contain"/>
                            </div>
                        ))}
                         <div className="bg-white p-3 rounded-xl flex items-center justify-center shadow-sm aspect-square cursor-pointer border-2 border-dashed border-gray-300 transition-all hover:border-amber-500 hover:bg-amber-50">
                            <span className="material-icons text-gray-400">add</span>
                        </div>
                    </div>
                </section>

                {/* Settings with added icons for clarity */}
                <section>
                    <h3 className="text-xl font-semibold mb-4">Settings</h3>
                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center space-x-3">
                            <span className="material-icons text-gray-500">notifications</span>
                            <ToggleSwitch
                                label="Match Reminders"
                                enabled={notifications.reminders}
                                onChange={(value) => setNotifications(prev => ({...prev, reminders: value}))}
                            />
                        </div>
                         <hr className="my-2"/>
                        <div className="flex items-center space-x-3">
                            <span className="material-icons text-gray-500">article</span>
                            <ToggleSwitch
                                label="News & Updates"
                                enabled={notifications.news}
                                onChange={(value) => setNotifications(prev => ({...prev, news: value}))}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;
