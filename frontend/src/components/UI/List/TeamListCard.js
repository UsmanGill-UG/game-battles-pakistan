import { useState } from 'react'
import DropdownMenu from '../DropDown/DropdownMenu'
import dropdown from '../../../Images/drarrow.png'

function TeamListCard({ title, button, team, cardlayout }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <div className='mt-1 card bg-dark text-white'>
      <div className='card-body'>
        <div className={ cardlayout }>
          <h5 className='mx-auto my-auto'>{ title }</h5>
          { button }
          <div onClick={ toggleMenu } className='mx-auto my-auto'>
            <img 
              src={ dropdown } 
              alt='Toggle menu' 
              className={ isMenuVisible ? 'rotate-180' : 'rotatate-arrow-default-pos' }
            />
          </div>
          <DropdownMenu
            team={ team }
            isMenuVisible={ isMenuVisible }
          >
            <h5 className='align'>Owner</h5>
            <p>{ team.owner.username }</p>
            <h5>Members List</h5>
            { team.members.map((member) => <p key={ team.member }> { member.username } </p>)}
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default TeamListCard
