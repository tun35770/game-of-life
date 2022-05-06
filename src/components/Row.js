import React from 'react'
import Cell from './Cell.js'

const Row = ( {gameBoardRow, boardSize, onEnter, setMouseDown, setMouseUp} ) => {
  return ( 
    <tr className='board-row'>
            {gameBoardRow.map((cell) => {
            return <Cell cell={cell}
                key={cell.id}
                boardSize={boardSize}
                onEnter={onEnter}
                setMouseDown={setMouseDown}
                setMouseUp={setMouseUp}/>})
            }
    </tr>
  )
}

export default Row