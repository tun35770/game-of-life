import Board from './components/Board';

function App() {
  return (
    <div className='app-container'>
      <h1>Game of Life</h1>
      <div className='board-container'>
        <Board />
      </div>
    </div>
  );
}

export default App;
