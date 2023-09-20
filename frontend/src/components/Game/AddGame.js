import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGame, uploadGameImage,  } from '../../store/gamesSlice'
import { EMPTY_GAME } from '../../constants'
import { resetUploadStatus, resetCreateStatus } from '../../store/gamesSlice'
import { SUCCEEDED, LOADING } from '../../constants'

function AddGame() {
  const dispatch = useDispatch()
  const createStatus = useSelector(state => state.games.createStatus)
  const uploadStatus = useSelector(state => state.games.uploadStatus)
  const imagePath = useSelector(state => state.games.imagePath)
  const [selectedGame, setSelectedGame] = useState(null)
  const [games, setGames] = useState([EMPTY_GAME])
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (createStatus === SUCCEEDED) {
      setGames([EMPTY_GAME])
      resetCreateStatus()
    }
  }, [createStatus])

  useEffect(() => {
    if (uploadStatus === LOADING) {
      setIsDisabled(true)
    }
    else if (uploadStatus === SUCCEEDED) {
      updateGame(selectedGame, { image_path: imagePath })
      setSelectedGame(null)
      dispatch(resetUploadStatus())
      setIsDisabled(false)
    }
  }, [uploadStatus])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createGame({ games }))
  }

  const addNewGame = () => {
    setGames([...games, EMPTY_GAME])
  }

  const updateGame = (gameIndex, updatedGame) => {
    const newGames = [...games]
    newGames[gameIndex] = { ...newGames[gameIndex], ...updatedGame }
    setGames(newGames)
  }

  return (
    <div>
      <form 
        id='gameForm'  
        onSubmit={ handleSubmit } 
        className='mx-auto text-center' 
        encType='multipart/form-data'
      >
          <div id='formsContainer'>
            {games.map((game, index) => (
              <div key={ index } className='form-group' id='game-form'>
                <label>
                  <input
                    type='text'
                    value={ game.name }
                    onChange={ e => {
                      updateGame(index, { name: e.target.value }) 
                    }}
                    required
                    className='me-5 mt-4 form-control'
                    placeholder='Game Name'
                  />
                </label>
                <label className='px-2'>
                  <input
                    type='file'
                    onChange={ e => {
                      setSelectedGame(index)
                      dispatch(uploadGameImage(e.target.files[0]))
                    }}
                    required
                    className='mt-2 form-control'
                    accept='image/*'
                    disabled={ isDisabled }
                  />
                </label>
              </div>
            ))}
          </div>
          <div className='py-3 form-group text-center'>
            <button 
              type='button' 
              onClick={ addNewGame } 
              className={ `btn btn-secondary ${ isDisabled ? 'disabled-input' : '' }` }
              disabled={ isDisabled }
            >
              Add
            </button>
            <button type='submit' className='btn btn-primary'> Create </button>
          </div>
      </form>
    </div>
  )
}

export default AddGame
