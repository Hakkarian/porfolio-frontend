
import { FC } from 'react'
import ProjectList from '../../components/ProjectList';
import Pagination from '../../components/Pagination';
import { ProjectPageCss } from './ProjectPage.styled';


const ProjectPage: FC = () => {
  return (
    <ProjectPageCss>
      <ProjectList />
      <Pagination />
    </ProjectPageCss>
  );
}

export default ProjectPage