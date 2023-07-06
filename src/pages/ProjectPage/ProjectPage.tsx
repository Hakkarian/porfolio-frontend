
import { FC } from 'react'
import ProjectList from '../../components/ProjectList';
import Pagination from '../../components/Pagination';


const ProjectPage: FC = () => {
  return (
    <div>
      <ProjectList />
      <Pagination />
    </div>
  );
}

export default ProjectPage