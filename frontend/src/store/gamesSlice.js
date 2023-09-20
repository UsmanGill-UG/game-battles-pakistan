import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import getConfig from '../utils'
import {FAILED, LOADING, SUCCEEDED} from '../constants'
import {GAMES_ADD_URL, GAMES_FETCH_URL, GAMES_UPLOAD_IMAGE_URL} from '../urls'

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const response = await axios.get(GAMES_FETCH_URL, getConfig())
    return response.data
  },
)

export const createGame = createAsyncThunk(
  'games/AddGame',
  async (gameData) => {
    const response = await axios.post(GAMES_ADD_URL, gameData, getConfig())
    return response.data
  },
)

export const uploadGameImage = createAsyncThunk(
  'games/uploadGameImage',
  async (image) => {
    const formData = new FormData()
    formData.append('image', image)
    const response = await axios.post
    ( GAMES_UPLOAD_IMAGE_URL, 
      formData, 
      getConfig({'Content-Type': 'multipart/form-data'}))
    return response.data
  },
)

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    imagePath: null,
    fetchStatus: 'idle',
    createStatus: 'idle',
    uploadStatus: 'idle',
  },
  reducers: {
    resetUploadStatus(state) {
      state.uploadStatus = 'idle'
    },
    resetCreateStatus(state) {
      state.createStatus = 'idle'
    },
    resetFetchStatus(state) {
      state.fetchStatus = 'idle'
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGames.pending, state => {
        state.fetchStatus = LOADING
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.fetchStatus = SUCCEEDED
        state.games = action.payload
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.fetchStatus = FAILED
      })
      .addCase(createGame.pending, state => {
        state.createStatus = LOADING
      })
      .addCase(createGame.fulfilled, state => {
        state.createStatus = SUCCEEDED
      })
      .addCase(createGame.rejected, (state, action) => {
        state.createStatus = FAILED
        alert(`Game Creation Failed! ${ action.error.message }`)
      })
      .addCase(uploadGameImage.pending, state => {
        state.uploadStatus = LOADING
      })
      .addCase(uploadGameImage.fulfilled, (state, action) => {
        state.uploadStatus = SUCCEEDED
        // image_path returns '/media/<image_name>' from django
        // '/media/' is stripped from the image path as django adds it automatically when accessing image
        state.imagePath = action.payload.image_path.replace('/media/', '')
      })
      .addCase(uploadGameImage.rejected, (state, action) => {
        state.uploadStatus = FAILED
        alert(`Uploading Failed! ${ action.error.message }`)
      })
  },
})

export const { resetUploadStatus, resetCreateStatus, resetFetchStatus } = gamesSlice.actions
export default gamesSlice.reducer
