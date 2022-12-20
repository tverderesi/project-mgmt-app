//@ts-ignore
import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <a
          href='/'
          className='navbar-brand'
        >
          <div className='d-flex'>
            <img
              src={logo}
              alt='GraphQL Logo'
            />
            <div>ProjectMGMT</div>
          </div>
        </a>
      </div>
    </nav>
  );
}
