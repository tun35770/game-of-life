import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Board from './components/Board';
import HowToPlay from './components/HowToPlay.js'

function App() {

  const Home = () => {
    return (
      <div className='board-container'>
        <Board />
      </div>
    )
  }

  return (
      <Router>
        <Routes>
          <Route path='/How-To-Play' element={<HowToPlay />} />
          <Route path='/game-of-life' element={<Home />} />
        </Routes>
      </Router> 
    
  );
}

export default App;