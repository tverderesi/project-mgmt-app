import { FaTrash } from 'react-icons/fa';

export default function ClientRow({
  client,
}: {
  client: { name: string; email: string; phone: string };
}) {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm'>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
