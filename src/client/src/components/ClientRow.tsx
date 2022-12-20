import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { REMOVE_CLIENT } from '../mutations/clientMutations';
export default function ClientRow({
  client,
}: {
  client: { name: string; email: string; phone: string; id: string };
}) {
  const [removeClient] = useMutation(REMOVE_CLIENT, {
    variables: { id: client.id },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          onClick={removeClient as any}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
