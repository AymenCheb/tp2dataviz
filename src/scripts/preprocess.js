
/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  // TODO: Clean the player name data
  const cleanedData = data.map(entry => {
    const name = entry.Player
    const words = name.split(' ')

    const capitalizedWords = words.map(word => {
      // Convert the first character of each word to uppercase and the rest to lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })

    const cleanedName = capitalizedWords.join(' ')

    return { ...entry, Player: cleanedName }
  })
  return cleanedData
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  const lineCounts = {}

  data.forEach(entry => {
    const player = entry.Player
    lineCounts[player] = (lineCounts[player] || 0) + 1
  })

  const playerArray = Object.keys(lineCounts).map(player => ({
    name: player,
    lines: lineCounts[player]
  }))

  playerArray.sort((a, b) => b.lines - a.lines)

  const topPlayers = playerArray.slice(0, 5).map(player => player.name)
  return topPlayers
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  // TODO : Generate the data structure as defined above
  const summarized = []
  let currentActKey = data[0].Act
  let currentAct = { Act: currentActKey, Players: [] }
  data.forEach(entry => {
    if (currentActKey !== entry.Act) {
      summarized.push(currentAct)
      currentActKey = entry.Act
      currentAct = { Act: currentActKey, Players: [] }
    }
    const player = currentAct.Players.find(p => p.Player === entry.Player)
    player ? player.Count++ : currentAct.Players.push({ Player: entry.Player, Count: 1 })
  })
  summarized.push(currentAct)
  return summarized
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  const result = data.map(act => {
    const simplifiedAct = { Act: act.Act, Players: [] }
    const other = { Player: 'Other', Count: 0 }
    act.Players.forEach(player => {
      if (top.find(p => p === player.Player)) {
        simplifiedAct.Players.push(player)
      } else other.Count += player.Count
    })
    simplifiedAct.Players.push(other)
    return simplifiedAct
  })
  return result
}
