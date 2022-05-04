import React from 'react'
import Cell from './Cell.js'

const Row = ( {gameBoardRow, onEnter, setMouseDown, setMouseUp} ) => {
  return ( 
    <tr className='board-row'>
            {gameBoardRow.map((cell) => {
            return <Cell cell={cell}
            key={cell.id}
                onEnter={onEnter}
                setMouseDown={setMouseDown}
                setMouseUp={setMouseUp}/>})
            }
    </tr>
  )
}

export default Row