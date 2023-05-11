
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  const acts = []
  data.forEach(act => {
    acts.push(act.Act)
  })
  scale.domain(acts).range([0, width])
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
  let maxLineCounts = 0
  data.forEach(act => {
    act.Players.forEach(player => {
      if (player.Count > maxLineCounts) maxLineCounts = player.Count
    })
  })
  scale.domain([maxLineCounts, 0]).range([0, height])
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
    .selectAll('.group')
    .data(data)
    .enter()
    .append('g')
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
    .selectAll('.bar')
    .data(players)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', player => xSubgroup(player))
    .attr('y', () => height) // Adjust the y position as needed
    .attr('width', xSubgroup.bandwidth()) // Adjust the bar width based on the x scale
    .attr('height', 0) // Initial height of 0
    .style('fill', player => color(player)) // Use color scale as needed
    .on('mouseover', tip.show) // Show tooltip on mouseover
    .on('mouseout', tip.hide) // Hide tooltip on mouseout
}
