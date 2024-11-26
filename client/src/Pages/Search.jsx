import React, { useState } from "react";
import { getAllBatters, getAllBowlers } from "../api/match.appi";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("batter"); // "batter" or "bowler"
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      setHasSearched(true); // Show sections if a search is performed

      try {
        let fetchedResults;

        if (searchType === "batter") {
          // Search for batters
          fetchedResults = await getAllBatters();
        } else {
          // Search for bowlers (add logic if `getAllBowlers` is available)
          fetchedResults = await getAllBowlers();
        }

        const filteredResults = fetchedResults.data.filter((result) =>
          result.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
        setSearchTerm("");
        // console.log(`Filtered ${searchType}:`, filteredResults);
      } catch (error) {
        console.error("Error during search:", error);
      }
    } else {
      setHasSearched(false); // Hide sections if search is empty
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-col space-y-4 p-4">
        {/* Prompt to choose search type */}
        <div className="text-center text-lg text-gray-600 mb-4">
          Choose whether to search for a Batter or a Bowler:
        </div>

        {/* Search Type Selection Section */}
        <div className="flex w-full justify-between items-center pb-2 space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              searchType === "batter"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSearchType("batter")}
          >
            Batter
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              searchType === "bowler"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSearchType("bowler")}
          >
            Bowler
          </button>
        </div>
      </div>

      {/* Search Box Section */}
      <div className="flex w-full justify-center items-center border-b border-gray-300 pb-2">
        <div className="w-[40%] flex space-x-2 items-center justify-center">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Search for a ${searchType}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {!hasSearched && (
        <div className="flex h-80 justify-center items-center text-gray-500 text-lg">
          Start typing a {searchType}'s name to explore their stats!
        </div>
      )}

      {/* Results Section */}
      {hasSearched && (
        <div className="h-screen">
          {results.length > 0 ? (
            <ul className="list-disc ml-5">
              {results.map((result, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold text-lg">{result.name} Stats</h4>
                  {Object.keys(result.stats).map((year, yearIndex) => (
                    <Link
                      key={yearIndex}
                      to={`/${searchType}/${result._id}/stats/${year}`}
                    >
                      <div className="mt-2 flex w-full justify-between bg-slate-200 p-4 rounded-xl">
                        <h5 className="text-gray-800 font-medium">
                          {year} Year
                        </h5>
                        <span>View</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">Not Found!!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
