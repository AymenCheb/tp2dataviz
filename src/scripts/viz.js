
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  scale.domain(data.map(act => act.Act)).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  const maxLineCount = d3.max(data, act => d3.max(act.Players, p => p.Count))
  scale.domain([0, maxLineCount]).range([height, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  // Select the graph container
  d3.select('#graph-g')
    .selectAll('g.group')
    .data(data)
    .join('g')
    .attr('class', 'group')
    .attr('transform', act => `translate(${x(act.Act)}, 0)`)
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  d3.select('#graph-g')
    .selectAll('.group')
    .selectAll('rect')
    .data(act => players.map(name => ({ // Retrieves the data bound to each group to find the line count for each player
      Player: name, 
      Count: act.Players.find(p => p.Player === name)?.Count || 0
    })))
    .join('rect')
    .attr('x', player => xSubgroup(player.Player)) // Position the bars horizontally in a group
    .attr('y', player => y(player.Count)) // Position the bars vertically
    .attr('width', xSubgroup.bandwidth()) // Set the width of the bars to the width of each band in the xSubgroup scale
    .attr('height', player => height - y(player.Count)) // Set the height of the bars
    .attr('fill', player => color(player.Player)) // Set the appropriate color depending on the player
    .on('mouseover', tip.show) // Show tooltip on mouseover
    .on('mouseout', tip.hide) // Hide tooltip on mouseout
}
