import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllBatters, getAllBowlers } from "../api/match.appi";

const BatterYearStats = () => {
  const location = useLocation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState("");

  let a = location.pathname.split("/");
  const playerId = a[2];
  const year = a[4];
  const isBowler = a.includes("bowler");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        let fetchedStats;
        if (isBowler) {
          fetchedStats = await getAllBowlers(playerId, year);
        } else {
          fetchedStats = await getAllBatters(playerId, year);
        }

        const playerStats = fetchedStats.data.filter(
          (stat) => stat._id === playerId
        );

        setStats(playerStats[0]?.stats[year]);
        // console.log(stats);
        setPlayerName(playerStats[0]?.name || "Player"); // Update to use player's name
      } catch (error) {
        setError("Error fetching stats");
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [playerId, year, isBowler]);

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="text-center text-gray-500">
        No stats available for this year.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">
        {playerName} Stats ({year})
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(stats).map((matchKey, index) => {
          const match = stats[matchKey];
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h4 className="font-semibold text-lg text-gray-700 mb-2">
                Match at {match.venue}
              </h4>
              <p className="text-gray-600">
                <strong>Team:</strong> {match.team}
              </p>
              <p className="text-gray-600">
                <strong>Against:</strong> {match.against_team}
              </p>

              <div className="mt-2">
                <strong>
                  Played with {isBowler === false ? "Bowlers" : "Batters"}:
                </strong>
                {!isBowler && (
                  <div>
                    <ul className="list-disc pl-5 mt-1 text-gray-600">
                      {match.playWithBowlers.map((bowler, idx) => (
                        <li key={idx}>{bowler}</li>
                      ))}
                    </ul>
                    <div>Runs: {match.runs}</div>
                    <div>Bowls: {match.bowl}</div>
                    <div>Venue: {match.venue}</div>
                  </div>
                )}
                {isBowler && (
                  <div>
                    <ul className="list-disc pl-5 mt-1 text-gray-600">
                      {match.playWithBatters.map((batter, idx) => (
                        <li key={idx}>{batter}</li>
                      ))}
                    </ul>
                    <div>Give Runs: {match.givesRun}</div>
                    <div>Wicket: {match.wicket}</div>
                    <div>Venue: {match.venue}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BatterYearStats;
