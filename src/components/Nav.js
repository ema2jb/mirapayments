import navStyles from './Nav.module.css'
import {Link} from 'react-router-dom'

const Nav = ()=> {
  return (
    <div className={navStyles.nav}>
        <ul className={navStyles.navList}>
              <Link className={navStyles.listItem} to="/">
                Task 1
              </Link>
              <Link className={navStyles.listItem} to="/chart">
                  Task 2
              </Link>
        </ul>
    </div>
  )
}

export default Nav