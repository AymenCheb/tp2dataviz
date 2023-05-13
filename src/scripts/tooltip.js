/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */

  // The current implementation does what is shown in the screenshot from lab statement. It does NOT do what is asked above since it doesn't correspond
  const name = d.target.__data__.Player
  const count = d.target.__data__.Count
  const tooltip = d3.create('div')

  tooltip.append('p')
    .style('font-family', 'Grenze Gotish')
    .style('font-size', '24px')
    .style('font-weight', 'normal')
    .text(name)

  tooltip.append('p')
    .style('font-weight', 'bold')
    .text(count + ' lines')

  return tooltip.node().outerHTML
}
