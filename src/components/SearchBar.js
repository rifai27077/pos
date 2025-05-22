import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full p-3 pl-10 pr-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Cari Produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900">
                <FaSearch />
            </span>
        </div>
    );
};

export default SearchBar;
