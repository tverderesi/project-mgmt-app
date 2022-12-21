import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <FaExclamationTriangle
        className='text-danger'
        size='5em'
      />
      <h1>404</h1>
      <p className='lead'>Page not found.</p>
      <Link
        to='/'
        className='btn btn-primary'
      >
        Go to Home
      </Link>
    </div>
  );
}
