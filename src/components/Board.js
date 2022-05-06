import React from 'react'
import Row from './Row.js'
import { useState, useEffect, useLayoutEffect, useRef} from 'react'
import Footer from './Footer.js'

let mouseIsDown = false
let clickedCellAlive = false
let playInterval;
let delayValues = [1000,500,250,100,50,10]
const Board = () => {

  const [gameBoard, setGameBoard] = useState([[]])
  const gameBoardRef = useRef({})
  gameBoardRef.current = gameBoard
  const [playDelay, setPlayDelay] = useState(250)
  const [gameState, setGameState] = useState('stopped')
  const [boardSize, setBoardSize] = useState(16)

  useEffect(() => {
    initializeBoard()
  }, [])

  useEffect(() => {
    let interval = playInterval
    pause()
    if(interval)
      play()
  }, [playDelay])

  useLayoutEffect(() => {
    initializeBoard()
  }, [boardSize])

  //sets up board with all cells not alive
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

  //sets cell with cell.id===id as alive
  function setAlive(id){
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

  //plays simulation 
  function play(){
    if(!playInterval){
      playInterval = setInterval(step, playDelay);
      setGameState('playing')
    }
  }

  //pauses simulation
  function pause(){
    if(playInterval){
      clearInterval(playInterval)
      playInterval = null
      setGameState('paused')
    }
  }

  //steps through game one iteration
  function step(){
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
      stop()
    }
  } //step()

  //resets board
  function clear(){
    pause()
    initializeBoard()
    setGameState('stopped')
  }

  //stops playInterval without needing to clear board
  function stop(){
    pause()
    setGameState('stopped')
  }

  //returns true if no cells are alive
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

  function onDelayChange(e){
    e.preventDefault()
    setPlayDelay(delayValues[e.target.value]);
  }

  let rowKey = 0;

  return (
      <>
        <h1>Game of Life</h1>

        <div className='size-container'>
          <button className='button button-size' onClick={() => setBoardSize(10)}>10x10</button>
          <button className='button button-size' onClick={() => setBoardSize(16)}>16x16</button>
          <button className='button button-size' onClick={() => setBoardSize(24)}>24x24</button>
          <button className='button button-size' onClick={() => setBoardSize(36)}>36x36</button>
        </div>

        <table className='board-table' onMouseEnter={setMouseUp}>
          <tbody>
            {gameBoardRef.current.map(row => 
              <Row gameBoardRow={row} key={rowKey++} boardSize={boardSize} onEnter={setAlive}
                    setMouseDown={setMouseDown} setMouseUp={setMouseUp}/>
            )}
          </tbody>
        </table>

        <div className='button-container'>
          <button className={'button button-play' + (gameState==='playing' ? ' button-active' : '')} onClick={() => play()}>Play</button>
          <button className={'button button-pause' + (gameState ==='paused' ? ' button-active' : '')} onClick={() => pause()}>Pause</button>
          <button className='button button-step' onClick={() => step()}>Step</button>
          <button className='button button-clear' onClick={() => clear()}>Clear</button> 
        </div>

        <div className='slider-container'>
          <p>Game Speed: {1000/playDelay} steps/sec (Delay in ms: {playDelay})</p>
          <input type="range" min="0" max="5" defaultValue="2" className="slider slider-delay" onChange={((e) => onDelayChange(e))} onClick={(e)=>e.preventDefault()}/>
        </div>

        <Footer />
      </> 
  )
}

export default Board