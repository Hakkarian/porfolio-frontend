
import { FC } from 'react'
import ProjectList from '../../components/ProjectList';
import Pagination from '../../components/Pagination';
import { ProjectPageCss } from './ProjectPage.styled';

// here we have a list with all projects, limited to 4 projects per page
// wrapped inside of the css container

const ProjectPage: FC = () => {
  return (
    <ProjectPageCss>
      <ProjectList />
      <Pagination />
    </ProjectPageCss>
  );
}

export default ProjectPage