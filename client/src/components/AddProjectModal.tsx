import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';


export default function AddProjectModal() {
  //States for Handling Form Data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  //Get Clients for Select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  //Mutation for Submitting
  const [addProject]: any = useMutation(ADD_PROJECT, {
    variables: { name, status, description, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery<any>({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (name === '' || description === '') {
      return alert('Please fill in all the fields!');
    }

    addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-toggle='modal'
            data-bs-target='#AddProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              Add Project
            </div>
          </button>
          <div
            className='modal fade'
            id='AddProjectModal'
            aria-labelledby='AddProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1
                    className='modal-title fs-5'
                    id='AddProjectModalLabel'
                  >
                    New Project
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        id='projectName'
                        value={name}
                        onChange={(e: any) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        className='form-control'
                        id='projectDescription'
                        value={description}
                        onChange={(e: any) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        className='form-select'
                        id='projectStatus'
                        value={status}
                        onChange={(e: any) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option
                          value='new'
                          style={{ color: 'black' }}
                        >
                          Not Started
                        </option>
                        <option
                          value='progress'
                          style={{ color: 'black' }}
                        >
                          In Progress
                        </option>
                        <option
                          value='completed'
                          style={{ color: 'black' }}
                        >
                          Completed
                        </option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        className='form-select'
                        id='projectClientId'
                        value={clientId}
                        onChange={(e: any) => {
                          setClientId(e.target.value);
                        }}
                      >
                        <option style={{ color: 'black' }}>
                          Select Client
                        </option>
                        {data.clients.map((client: any) => {
                          return (
                            <option
                              key={client.id}
                              value={client.id}
                              style={{ color: 'black' }}
                            >
                              {client.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
           
                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-secondary'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
