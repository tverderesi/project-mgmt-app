import { useQuery } from '@apollo/client';
import { FaCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import ClientInfo from '../components/ClientInfo';
import Spinner from '../components/Spinner';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong.</p>;
  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link
            to='/'
            className='btn btn-secondary btn-sm w-25 d-inline ms-auto mb-5'
          >
            Back
          </Link>
          <h1 className='fw-bold'>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h4 className='mt-3 fw-bold'>Project Status</h4>
          <p
            className='lead align-items-center d-flex'
            style={{
              color:
                data.project.status === 'Not Started'
                  ? 'red'
                  : data.project.status === 'In Progress'
                  ? '#efab00'
                  : 'green',
              fontWeight: '500',
            }}
          >
            <strong>
              <FaCircle
                size='.5em'
                className='me-2'
                style={{
                  marginBottom: '20%',
                }}
              />
            </strong>
            {data.project.status}
          </p>
          <ClientInfo client={data.project.client} />
        </div>
      )}
    </>
  );
}
