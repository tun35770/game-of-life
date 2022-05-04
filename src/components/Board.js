import React from 'react'
import Row from './Row.js'
import { useState, useEffect, useRef} from 'react'

let mouseIsDown = false
let clickedCellAlive = false
let playDelay = 1000;
let playInterval;

const Board = () => {

  const [gameBoard, setGameBoard] = useState([[]])
  const gameBoardRef = useRef({})
  gameBoardRef.current = gameBoard
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
      setGameBoard(gameBoardRef.current.map(row => 
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

  function play(){
    if(!playInterval)
      playInterval = setInterval(iterate, playDelay);
  }

  function pause(){
    if(playInterval){
      clearInterval(playInterval)
      playInterval = null
    }
  }

  function iterate(){
    let next = gameBoardRef.current.map(row => {
    return row.map(cell => {
        return {
          id: cell.id,
          alive: cell.alive,
          row: cell.row,
          col: cell.col
        }
      })
    })

    for(let i = 0; i < gameBoardRef.current.length; i++){
      for(let j = 0; j < gameBoardRef.current[0].length; j++){
        let sum = 0;
        if(i !== 0 && gameBoardRef.current[i-1][j].alive)
          sum++
        if(j !== 0 && gameBoardRef.current[i][j-1].alive)
          sum++
        if(i !== 0 && j !== 0 && gameBoardRef.current[i-1][j-1].alive)
          sum++
        if(i !== gameBoardRef.current.length-1 && gameBoardRef.current[i+1][j].alive)
          sum++
        if(j !== gameBoardRef.current[0].length-1 && gameBoardRef.current[i][j+1].alive)
          sum++
        if(i !== gameBoardRef.current.length-1 && j !== gameBoardRef.current[0].length-1 && gameBoardRef.current[i+1][j+1].alive)
          sum++
        if(i !== 0 && j !== gameBoardRef.current[0].length-1 && gameBoardRef.current[i-1][j+1].alive)
          sum++
        if(i !== gameBoardRef.current.length-1 && j !== 0 && gameBoardRef.current[i+1][j-1].alive)
          sum++
    
        if(gameBoardRef.current[i][j].alive){
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

    //stop play interval if board becomes empty
    if(checkBoardEmpty()){
      pause()
    }
  } //iterate()

  function clear(){
    pause()
    initializeBoard()
  }

  function checkBoardEmpty(){
    let flag = true;

    gameBoardRef.current.forEach(row => {
      row.forEach(cell => {
        if(cell.alive) {
          flag=false; 
          return;
        }
      })
      if(!flag)
        return
    })
    return flag
  }

  let rowKey = 0;

  return (
      <>
        <table className='board-table'>
          <tbody>
            {gameBoardRef.current.map(row => 
              <Row gameBoardRow={row} key={rowKey++} onEnter={setActive}
                    setMouseDown={setMouseDown} setMouseUp={setMouseUp}/>
            )}
          </tbody>
        </table>

        <div className='button-container'>
          <button className='button button-play' onClick={() => play()}>Play</button>
          <button className='button button-pause' onClick={() => pause()}>Pause</button>
          <button className='button button-next' onClick={() => iterate()}>Next Iteration</button>
          <button className='button button-clear' onClick={() => clear()}>Clear</button> 
        </div>
      </> 
  )
}

export default Board