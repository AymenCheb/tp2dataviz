/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".
  const canvas = d3.select('.legend').append('svg').attr('width', 600).attr('height', 50)
  // Draw squares
  canvas.selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', function (d, i) {
      return i * 100
    })
    .attr('y', 15)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', player => color(player))
    .style('stroke', 'black')

  canvas.selectAll('text')
    .data(data)
    .join('text')
    .style('font', '15px arial')
    .attr('x', function (d, i) {
      return i * 100 + 25
    })
    .attr('y', 30)
    .text(function (d) {
      return d
    })
}
