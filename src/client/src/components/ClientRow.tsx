import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { REMOVE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
export default function ClientRow({
  client,
}: {
  client: { name: string; email: string; phone: string; id: string };
}) {
  const [removeClient] = useMutation(REMOVE_CLIENT, {
    variables: { id: client.id },

    //Method 1: Refetch all queries:
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

    //Method 2: Update Cache
    // update(cache, { data: { removeClient } }) {
    //   const { clients } = cache.readQuery<any>({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter(
    //         //@ts-ignore
    //         (client: any) => client.id !== removeClient.id
    //       ),
    //     },
    //   });
    // },
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
