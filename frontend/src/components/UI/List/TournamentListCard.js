import { useState } from 'react'
import DropdownMenu from '../DropDown/DropdownMenu'
import dropdown from '../../../Images/drarrow.png'

function ListCard({ title, button, tournament, cardlayout }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <div className='mt-1 card bg-dark text-white'>
      <div className='card-body'>
        <div className={ cardlayout }>
          <h5 className='mx-auto my-auto'>{ title }</h5>
          {button}
          <div onClick={ toggleMenu } className='mx-auto my-auto'>
            <img 
              src={ dropdown } 
              alt='Toggle menu' 
              className={ isMenuVisible ? 'rotate-180' : 'rotatate-arrow-default-pos' }
            />
          </div>
          <DropdownMenu
            tournament={ tournament }
            isMenuVisible={ isMenuVisible }
          >
            <h6>Teams Registered</h6>
            {tournament.teams_registered.map((team) => 
              <p key={ tournament.teams_registered.id }>{ team.name }</p>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default ListCard
