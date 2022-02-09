import { Link } from 'react-router-dom';
import Landing from './Landing.js';
import About from './About.js'

function Navigation() {
  return(
    <nav>
      <div className="nav-wrapper">
        <ul className="left">
          <li>
            <Link to={"/"}>
              <a className="">Home</a>
            </Link>
          </li>
          <li>
            <Link to={"/about"}>
              <a className="">About</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    // <nav>
    //   <ol>
    //     <li>
    //       <p>Hello</p>
    //     </li>
    //   </ol>
    // </nav>
  )
}

export default Navigation;
