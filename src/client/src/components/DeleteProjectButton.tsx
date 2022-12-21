import { useMutation } from '@apollo/client';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function DeleteProjectButton({ projectId }: { projectId: any }) {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate('/');
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <>
      <button
        className='btn btn-danger btn-sm d-inline d-flex align-items-center justify-content-center'
        data-bs-toggle='modal'
        data-bs-target='#deleteModal'
        style={{ width: '8rem', fontWeight: '600' }}
      >
        <FaTrash className='icon' />
        Delete Project
      </button>
      <div
        className='modal fade'
        id='deleteModal'
        aria-labelledby='deleteModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='align-self-center align-items-center d-flex mt-4'>
              <FaExclamationTriangle
                className='text-danger'
                size='2.5em'
              />
              <span
                className='ms-3'
                style={{ fontSize: '2em', fontWeight: '700' }}
              >
                ATTENTION
              </span>
            </div>
            <div className='modal-body'>
              <p className='fs-5 mx-3'>
                This will <strong>DELETE</strong> the project. Are you sure you
                want to do it?
              </p>
              <div className='w-100 d-flex justify-content-center'>
                <button
                  type='button'
                  className='btn btn-light me-2 fw-bold'
                  data-bs-dismiss='modal'
                  style={{ backgroundColor: '#ededed' }}
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-danger fw-bold d-flex justify-content-center align-items-center'
                  onClick={deleteProject as any}
                  data-bs-toggle='modal'
                >
                  <FaTrash className='icon' />
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
