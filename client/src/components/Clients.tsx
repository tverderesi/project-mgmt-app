import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>error</p>;
  return (
    <>
      {!loading && !error && (
        <>
          <h2 className='text-center w-full fw-bold'>My Clients</h2>
          <table className='table table-hover mt-3'>
            <thead className=''>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client: any) => (
                <ClientRow
                  key={client.id}
                  client={client}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
