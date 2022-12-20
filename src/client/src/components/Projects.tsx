import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong.</p>;
  return (
    <>
      <h2 className='text-center w-full fw-bold'>My Projects</h2>

      {data.projects.length > 0 ? (
        <div className='row mt-3 mb-5'>
          {data.projects.map((project: any) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
              />
            );
          })}
        </div>
      ) : (
        <p>No Projects.</p>
      )}
    </>
  );
}
