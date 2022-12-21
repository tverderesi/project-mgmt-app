import { useQuery } from '@apollo/client';
import { FaArrowLeft, FaCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
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
            className='btn btn-light btn-sm d-flex align-items-center justify-content-center me-auto mb-5'
            style={{ width: '6rem' }}
          >
            <FaArrowLeft className='icon' />
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
          <div className='d-flex mt-5 w-100 justify-content-between'>
            <EditProjectForm project={data.project} />
            <DeleteProjectButton projectId={data.project.id} />
          </div>
        </div>
      )}
    </>
  );
}
