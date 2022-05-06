
const Cell = ( { cell, boardSize, onEnter, setMouseDown, setMouseUp} ) => {

  function getCellClasses(){
    let cell_classes = 'board-cell'
    cell_classes += (boardSize === 10 ? ' board-cell-small' :
               boardSize === 16 ? ' board-cell-medium' :
               boardSize === 24 ? ' board-cell-large' :
               ' board-cell-xlarge');

    cell_classes += (cell.alive ? ' active' : '')
    return cell_classes
  }

  return (
    <td className = {getCellClasses()}
        onMouseEnter = {(e) => {e.preventDefault();
                                onEnter(cell.id)}}
        onMouseDown={(e) => {e.preventDefault();
                            setMouseDown(cell.alive);
                            onEnter(cell.id)}}
        onMouseUp={(e) => {e.preventDefault();
                          setMouseUp(cell.alive)}}></td>
  )
}

export default Cell