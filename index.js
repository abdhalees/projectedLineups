const data = require('./player-data.json')
const { fanDuelLineups, draftKingLineups } = require('./helpers')

const lineups = (min, max, platform, limit) => {
  if (platform === 'fanDuel') {
    const fanDuelData = data.map(({ PlayerID, FanDuelPosition, FanDuelSalary, FantasyPointsFanDuel }) => {
      return { PlayerID, FanDuelPosition, FanDuelSalary, FantasyPointsFanDuel }
    }).filter(({ FanDuelPosition, FantasyPointsFanDuel }) => FanDuelPosition !== null)
    return fanDuelLineups(fanDuelData, min, max, limit)
  } else if (platform === 'draftKing') {
    const draftKingData = data.map(({ PlayerID, DraftKingsPosition, DraftKingsSalary, FantasyPointsDraftKings }) => {
      return { PlayerID, DraftKingsPosition, DraftKingsSalary, FantasyPointsDraftKings }
    }).filter(({ FanDuelPosition, FantasyPointsFanDuel }) => FanDuelPosition !== null)
    return draftKingLineups(draftKingData, min, max, limit)
  }
}

console.log(lineups(0, 1000000, 'fanDuel', 3))
