import React from 'react'
import Row from './Row.js'
import { useState, useEffect} from 'react'

let mouseIsDown = false
let clickedCellAlive = false

const Board = () => {

  const [gameBoard, setGameBoard] = useState([[]])
  

  useEffect(() => {
    initializeBoard()
  }, [])

  function initializeBoard(){
    let newBoard = [];
    for(let i = 0; i < 10; i++){
      let newRow = []
      for(let j = 0; j < 10; j++){
        const cell = {
          id: i * 10 + j,
          alive: false,
          row: i,
          col: j
        }
        newRow.push(cell)
      }
      newBoard.push(newRow)
    }

    setGameBoard(newBoard)
  }

  function setActive(id){
    //setStocks(stocks.map(stock => stock.id === id ? {...stock, autoUpdate: !stock.autoUpdate} : stock))
    if(mouseIsDown){
      setGameBoard(gameBoard.map(row => 
        row.map(cell => 
          cell.id === id && cell.alive === clickedCellAlive ? {...cell, alive: !cell.alive} : cell
        )
      ))
    }
  }

  function setMouseDown(status){
    mouseIsDown = true
    clickedCellAlive = status
  }
  function setMouseUp(status){
    mouseIsDown = false
    clickedCellAlive = status
  }

  let rowKey = 0;

  return (
    <div className='board-container'>
      <table className='board-table'>
        <tbody>
          {gameBoard.map(row => 
            <Row gameBoardRow={row} key={rowKey++} onEnter={setActive}
                  setMouseDown={setMouseDown} setMouseUp={setMouseUp}/>
          )}
        </tbody>
      </table>
    </div>
    
  )
}

export default Board