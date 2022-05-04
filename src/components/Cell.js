
const Cell = ( { cell, onEnter, setMouseDown, setMouseUp} ) => {

  return (
    <td className = {'board-cell' + (cell.alive ? ' active' : '')}
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