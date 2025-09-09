import React from 'react';

interface FilterBarProps {
    matchStatus: string;
    setMatchStatus: (status: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
}

// Generates an array of date objects for the next N days
const generateDates = (count = 30) => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const yyyy_mm_dd = date.toISOString().split('T')[0];
        let label = '';
        let day = '';

        if (i === 0) {
            label = 'Today';
            day = date.toLocaleDateString('en-US', { day: 'numeric' });
        } else if (i === 1) {
            label = 'Tomorrow';
            day = date.toLocaleDateString('en-US', { day: 'numeric' });
        } else {
            label = date.toLocaleDateString('en-US', { weekday: 'short' });
            day = date.toLocaleDateString('en-US', { day: 'numeric' });
        }

        dates.push({ fullDate: yyyy_mm_dd, label, day });
    }
    return dates;
};


const FilterBar: React.FC<FilterBarProps> = ({
    matchStatus,
    setMatchStatus,
    selectedDate,
    setSelectedDate
}) => {
    const dates = generateDates();
    const statusOptions = ['all', 'live', 'upcoming', 'finished'];

    return (
        <div className="mt-4 space-y-4">
            {/* Date Selector */}
            <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {dates.map(date => {
                    const isSelected = selectedDate === date.fullDate;
                    return (
                        <button
                            key={date.fullDate}
                            onClick={() => setSelectedDate(date.fullDate)}
                            className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out focus:outline-none ${
                                isSelected ? 'bg-amber-500 text-white shadow-lg scale-105' : 'bg-white text-gray-700'
                            }`}
                        >
                            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-500'}`}>{date.label}</span>
                            <span className="text-2xl font-bold">{date.day}</span>
                        </button>
                    );
                })}
            </div>

            {/* Status Filters */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
                {statusOptions.map(status => (
                    <button
                        key={status}
                        onClick={() => setMatchStatus(status)}
                        className={`w-full py-2 text-sm font-bold rounded-full capitalize transition-all duration-300 ease-in-out focus:outline-none ${
                            matchStatus === status
                                ? 'bg-white text-gray-800 shadow-md scale-105'
                                : 'text-gray-500 hover:bg-gray-200'
                        }`}
                        aria-pressed={matchStatus === status}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;