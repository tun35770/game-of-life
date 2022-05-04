import React from 'react'
import Row from './Row.js'
import { useState, useEffect} from 'react'

let mouseIsDown = false
let clickedCellAlive = false

const Board = () => {

  const [gameBoard, setGameBoard] = useState([[]])
  let boardSize = 16;

  useEffect(() => {
    initializeBoard()
  }, [])

  function initializeBoard(){
    let newBoard = [];
    for(let i = 0; i < boardSize; i++){
      let newRow = []
      for(let j = 0; j < boardSize; j++){
        const cell = {
          id: i * boardSize + j,
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

  function iterate(){
    //let grid = [...gameBoard]
    let next = gameBoard.map(row => {
    return row.map(cell => {
        return {
          id: cell.id,
          alive: cell.alive,
          row: cell.row,
          col: cell.col
        }
      })
    })

    for(let i = 0; i < gameBoard.length; i++){
      for(let j = 0; j < gameBoard[0].length; j++){
        let sum = 0;
        if(i !== 0 && gameBoard[i-1][j].alive)
          sum++
        if(j !== 0 && gameBoard[i][j-1].alive)
          sum++
        if(i !== 0 && j !== 0 && gameBoard[i-1][j-1].alive)
          sum++
        if(i !== gameBoard.length-1 && gameBoard[i+1][j].alive)
          sum++
        if(j !== gameBoard[0].length-1 && gameBoard[i][j+1].alive)
          sum++
        if(i !== gameBoard.length-1 && j !== gameBoard[0].length-1 && gameBoard[i+1][j+1].alive)
          sum++
        if(i !== 0 && j !== gameBoard[0].length-1 && gameBoard[i-1][j+1].alive)
          sum++
        if(i !== gameBoard.length-1 && j !== 0 && gameBoard[i+1][j-1].alive)
          sum++
    
        if(gameBoard[i][j].alive){
          if(sum < 2 || sum > 3)
            next[i][j].alive = false;
          else
            next[i][j].alive = true;
        }
        else{
          if(sum === 3)
            next[i][j].alive = true
          else
            next[i][j].alive = false
        } //else
      } //inner loop
    } //outer loop

    setGameBoard(next)
  } //iterate()

  function clear(){
    initializeBoard()
  }

  let rowKey = 0;

  return (
      <>
        <table className='board-table'>
          <tbody>
            {gameBoard.map(row => 
              <Row gameBoardRow={row} key={rowKey++} onEnter={setActive}
                    setMouseDown={setMouseDown} setMouseUp={setMouseUp}/>
            )}
          </tbody>
        </table>

        <div className='button-container'>
          <button className='button-next' onClick={() => iterate()}>Next Iteration</button>
          <button className='button-clear' onClick={() => clear()}>Clear</button>
        </div>
      </> 
  )
}

export default Board