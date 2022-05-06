import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer.js'

const HowToPlay = () => {
  return (
    <div className='howtoplay-container'>
        <Link to='/'><span>Back to Game</span></Link>
        <h1>How it Works</h1>

        <div className='howtoplay-explanation-container'>
            <div className='text-image-inline'>
                <h2>Click and drag to make cells alive, then press play!</h2>
                <img src={require('../images/game.png')} alt='Game'/> <br/><br/><br/><br/>
            </div>

            <h2>Buttons</h2>
            <img src={require('../images/game_buttons.png')} alt='Game Buttons'/>
            <p>Play: Runs the simulation</p>
            <p>Pause: Pauses. Yep.</p>
            <p>Step: Advances the game by one iteration</p>
            <p>Clear: Clears the board</p>   <br/><br/><br/>

            <h2>Adjust the game speed with the slider at the bottom</h2>
            <img src={require('../images/slider.png')} alt='Slider' />   <br/><br/><br/><br/>

            <h2>You can change the size of the board with the buttons at the top</h2>
            <img src={require('../images/size_buttons.png')} alt='Size Buttons' />  <br/><br/><br/><br/><br/>
        </div>

        <div className='howtoplay-rule-container'>
            <div className='text-image-inline'>
            <p>If a cell has 2 or 3 live neighbors, it will live :)</p> 
            <img src={require('../images/lives.png')} alt='Living cell' />
            <p>(All of these cells will live, as they each have 3 live neighbors)</p>
            </div>

            <div className='text-image-inline'>
            <p>If a cell has 1 or 0 live neighbors, it will die from isolation :(</p> 
            <img src={require('../images/isolation.png')} alt='Isolated cell' />
            <p>(These cells will die, as they each have 1 live neighbor)</p>
            </div>

            <div className='text-image-inline'>
            <p>If a cell has 4 or more live neighbors, it will die from overcrowding :(</p> 
            <img src={require('../images/overcrowding.png')} alt='Overcrowded cell' />
            <p>(The center cell will die, as it has 4 live neighbors)</p>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default HowToPlay