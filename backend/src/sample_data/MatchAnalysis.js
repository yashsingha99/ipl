const matchData = require("./matchesData.json");
const { Router } = require("express");
const router = Router();

const { Batsman, Bowler, Match } = require("../models/match.model");

router.get("/", async (req, res) => {
  try {
    let filteredData = {};
    let bowlers = [];
    let batsmans = [];
    for (let i = 0; i < matchData.length; i++) {
      let year = matchData[i].date.substring(0, 4);
      let matchId = matchData[i].mid;

      if (!batsmans.includes(matchData[i].batsman)) {
        batsmans.push(matchData[i].batsman);
      }
      if (!bowlers.includes(matchData[i].bowler)) {
        bowlers.push(matchData[i].bowler);
      }

      if (!filteredData[year]) {
        filteredData[year] = {};
      }

      if (!filteredData[year][matchId]) {
        filteredData[year][matchId] = [];
      }

      filteredData[year][matchId].push(matchData[i]);
    }

    let playersOfbatsman = {};
    let playersOfBowler = {};

    for (let batsman of batsmans) {
      if (!playersOfbatsman[batsman]) {
        playersOfbatsman[batsman] = {};
      }
    }
    for (let bowler of bowlers) {
      if (!playersOfBowler[bowler]) {
        playersOfBowler[bowler] = {};
      }
    }

    for (let year of Object.keys(filteredData)) {
      
      const yearData = filteredData.year;
      for (let matchId of Object.keys(yearData)) {
        let matchArray = yearData.matchId;
        let prev = 0;
        let prevWicket = 0;
        for (let bowls of matchArray) {
          if (!playersOfbatsman[bowls.batsman][year]) {
            playersOfbatsman[bowls.batsman][year] = {};
            playersOfBowler[bowls.bowler][year] = {};
          }
          if (!playersOfbatsman[bowls.batsman][year][matchId]) {
            playersOfbatsman[bowls.batsman][year][matchId] = {};
            playersOfbatsman[bowls.batsman][year][matchId].bowl = 0;
            playersOfbatsman[bowls.batsman][year][matchId].runs = 0;
            playersOfbatsman[bowls.batsman][year][matchId].venue = bowls.venue;
            playersOfbatsman[bowls.batsman][year][matchId].team =
              bowls.bat_team;
            playersOfbatsman[bowls.batsman][year][matchId].against_team =
              bowls.bowl_team;
            playersOfbatsman[bowls.batsman][year][matchId].playWithBowlers = {};
          }
          playersOfbatsman[bowls.batsman][year][matchId].bowl += 1;
          playersOfbatsman[bowls.batsman][year][matchId].runs += Number(
            bowls.runs - prev
          );
          if (
            !playersOfbatsman[bowls.batsman][year][matchId][
              playWithBowlers
            ].includes(bowls.bowler)
          ) {
            playersOfbatsman[bowls.batsman][year][matchId][
              playWithBowlers
            ].push(bowls.bowler);
          }

          if (!playersOfBowler[bowls.bowler][year][matchId]) {
            playersOfBowler[bowls.bowler][year][matchId] = {};
            playersOfBowler[bowls.bowler][year][matchId].team = bowls.bowl_team;
            playersOfBowler[bowls.bowler][year][matchId].against_team =
              bowls.bat_team;
            playersOfBowler[bowls.bowler][year][matchId].venue = bowls.venue;
            playersOfBowler[bowls.bowler][year][matchId].wicket = 0;
            playersOfBowler[bowls.bowler][year][matchId].givesRun = 0;
            playersOfBowler[bowls.bowler][year][matchId].playWithBatters = {};
          }
          playersOfBowler[bowls.bowler][year][matchId].givesRun += Number(
            bowls.runs - prev
          );
          playersOfBowler[bowls.bowler][year][matchId].givesRun += Number(
            bowls.wickets - prevWicket
          );
          if (
            !playersOfBowler[bowls.bowler][year][matchId][
              playWithBatters
            ].includes(bowls.batsman)
          ) {
            playersOfBowler[bowls.bowler][year][matchId][playWithBatters].push(
              bowls.batsman
            );
          }
          prev = bowls.runs;
          prevWicket = bowls.wickets;
        }
      }
    }

    // Save to MongoDB
    await Batsman.deleteMany({});
    await Batsman.insertMany(playersOfbatsman);

    await Bowler.deleteMany({});
    await Bowler.insertMany(playersOfBowler);

    res.status(200).json({ message: "Data processed and stored successfully." });
  } catch (error) {
    console.error("Error processing matches:", error);
    res.status(500).json({ error: "An error occurred while processing data." });
  }
});

module.exports = router;
