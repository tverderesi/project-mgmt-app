export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className='col-md-4'>
      <div
        className='card mb-3'
        style={{
          backgroundColor: '#f3f3f3',
          boxShadow: '0px 0px 20px #00000010',
        }}
      >
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title fw-bold'>{project.name}</h5>
            <a
              href={`/projects/${project.id}`}
              className='btn btn-secondary'
            >
              View
            </a>
          </div>
          <p className='small fw-bold'>
            Status: {` `}
            <strong
              style={{
                color:
                  project.status === 'Not Started'
                    ? 'red'
                    : project.status === 'In Progress'
                    ? '#efab00'
                    : 'green',
                fontWeight: '500',
              }}
              className='fw-bold'
            >
              {project.status}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
