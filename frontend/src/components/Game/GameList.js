import React, { useEffect } from 'react'
import './game.css'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../constants'
import { fetchGames } from '../../store/gamesSlice'

function GameList() {
  const dispatch = useDispatch()
  const games = useSelector((state) => state.games.games)

  useEffect(() => {
    dispatch(fetchGames())
  }, [])

  return (
    <div className='container py-5'>
      <h2 className='text-center'>Games</h2>
      <div className='game-card-layout'>
        {games.length === 0 ? (
          <p>No games to display</p>
        ) : (
          games.games.map((game, index) => (
            <div key={ index } className='card' id='game-card'>
              <img 
                className='card-img-top' 
                src={ `${ BASE_URL }media/${ game.image_path }` } 
                alt={ game.name } 
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GameList
