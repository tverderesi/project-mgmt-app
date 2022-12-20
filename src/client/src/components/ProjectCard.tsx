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
            <h5 className='card-title'>{project.name}</h5>
            <a
              href={`/projects/${project.id}`}
              className='btn btn-secondary'
            >
              View
            </a>
          </div>
          <p className='small'>
            Status: <strong> {project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
