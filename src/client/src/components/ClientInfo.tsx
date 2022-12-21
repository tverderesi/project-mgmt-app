import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }: { client: any }) {
  return (
    <div>
      <h4 className='fw-bold'>Client Information</h4>
      <ul className='list-group mt-4'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' />
          <strong>Name:</strong> {client.name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon' />
          <strong>Email:</strong> {client.email}
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon' />
          <strong>Phone: </strong>
          {client.phone}
        </li>
      </ul>
    </div>
  );
}
