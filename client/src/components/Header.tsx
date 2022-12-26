import { Link } from 'react-router-dom';
//@ts-ignore
import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <Link
          to={'/'}
          className='navbar-brand'
        >
          <div className='d-flex'>
            <img
              src={logo}
              alt='GraphQL Logo'
            />
            <div>ProjectMGMT</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
