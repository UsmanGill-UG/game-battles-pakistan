import React from 'react'
import './HomePage.css'
import { useSelector } from 'react-redux'
import bannerimage from '../Images/main.jpeg'

function HomePage() {
  const IsAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const messages = ['Welcome to our platform!', 'Join a team or create one!']

  const username = localStorage.getItem('user')

  return (
    <div>
      <div className='mt-3 card home-page-card'>
        <div className='row'>
          <div className='col'>
            <h1>
              Welcome to Gaming Platform
            </h1>
          </div>
          <div className='col'>
            <div className='image-container'>
              <img src={ bannerimage } />
            </div>
          </div>
        </div>
      </div>
      <h2>Home</h2>

      {messages.map((message, index) => (
        <p key={ index }>{ message }</p>
      ))}

      {IsAuthenticated && (
        <p> Welcome, { username }! </p>
      )}
    </div>
  )
}

export default HomePage
