import React from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    matchStatus: string;
    setMatchStatus: (status: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
}

const Header: React.FC<HeaderProps> = (props) => {

  return (
    <header className="p-4 bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <button className="p-2">
          <span className="material-icons">apps</span>
        </button>
        <h1 className="text-2xl font-bold">Soccer<span className="text-amber-500">Nerds</span></h1>
        <button className="p-2">
          <span className="material-icons">notifications_none</span>
        </button>
      </div>
      <div className="mt-4">
        <SearchBar searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery} />
      </div>
      <FilterBar 
        matchStatus={props.matchStatus}
        setMatchStatus={props.setMatchStatus}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
      />
    </header>
  );
};

export default Header;