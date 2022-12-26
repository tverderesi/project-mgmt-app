import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function EditProjectForm({ project }: { project: any }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !status || !description) {
      return alert('You must fill in all fields!');
    }

    updateProject();
  };

  return (
    <>
      <button
        className='btn btn-secondary btn-sm d-inline d-flex align-items-center justify-content-center'
        data-bs-toggle='modal'
        data-bs-target='#AddProjectModal'
        style={{ width: '8rem' }}
      >
        <FaPencilAlt className='icon' />
        Edit Project
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
                className='modal-title fs-5 d-flex align-items-center justify-content-center'
                id='AddProjectModalLabel'
                style={{ fontWeight: '600' }}
              >
                <FaPencilAlt className='icon' />
                Edit Project
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
                    defaultValue='Select New Status'
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
  );
}
