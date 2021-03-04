import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  
  const pathname = window.location.pathname
  const path = pathname === '/'? 'home' : pathname.substr(1)
  
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
      user? (
        <div>
        <Menu pointing secondary color="teal">
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to='/'
          />

          
          <Menu.Menu position='right'>
            <Menu.Item
            name='Logout'
            onClick={logout}
            as={Link}
            to='login'
          />
          </Menu.Menu>
        </Menu>
      </div>
      ) : (
        <div>
        <Menu pointing secondary color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />

          
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to='/login'
            />
            <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='register'
          />
          </Menu.Menu>
        </Menu>
      </div>
      )
    )
}

export default MenuBar
