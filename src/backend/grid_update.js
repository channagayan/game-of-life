/**
 * Receives a 2d grid and returns updated 2d grid after performing an iteration
 * @param grid
 */


export default function updateGrid(theGrid) {
    if (!theGrid) {
        console.error("grid must not be null")
        return;
    }
    let gridWidth = theGrid.length;
    let gridHeight = theGrid[0].length;

    let mirrorGrid = new Array(gridWidth).fill(0).map(() => new Array(gridHeight).fill(0))

    console.log(gridHeight, gridWidth)
    for (var j = 1; j < gridHeight - 1; j++) { //iterate through rows
        for (var k = 1; k < gridWidth - 1; k++) { //iterate through columns
            var totalCells = 0;
//add up the total values for the surrounding cells
            totalCells += theGrid[j - 1][k - 1]; //top left
            totalCells += theGrid[j - 1][k]; //top center
            totalCells += theGrid[j - 1][k + 1]; //top right
            totalCells += theGrid[j][k - 1]; //middle left
            totalCells += theGrid[j][k + 1]; //middle right
            totalCells += theGrid[j + 1][k - 1]; //bottom left
            totalCells += theGrid[j + 1][k]; //bottom center
            totalCells += theGrid[j + 1][k + 1]; //bottom right
//apply the rules to each cell
            if (theGrid[j][k] === 0) {
                switch (totalCells) {
                    case 3:
                        mirrorGrid[j][k] = 1; //if cell is dead and has 3 neighbours, switch it on
                        break;
                    default:
                        mirrorGrid[j][k] = 0; //otherwise leave it dead
                }
            } else if (theGrid[j][k] === 1) { //apply rules to living cell
                switch (totalCells) {
                    case 0:
                    case 1:
                        mirrorGrid[j][k] = 0; //die of lonelines
                        break;
                    case 2:
                    case 3:
                        mirrorGrid[j][k] = 1; //carry on living
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        mirrorGrid[j][k] = 0; //die of overcrowding
                        break;
                    default:
                        mirrorGrid[j][k] = 0; //
                }
            }
        }
    }

    return mirrorGrid;
}