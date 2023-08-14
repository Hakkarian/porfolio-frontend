import styled from "@emotion/styled";
import { Button } from "../../shared";

export const ProjectListCss = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`


export const ProjectItemCss = styled.li`
  display: flex;
  justify-content: space-between;

  .project__image-reactions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
  }

  .project__info-wrap {
    position: relative;

    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .project__reactions {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }

  .project__reaction-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      padding: 0.5rem;

    

      border-radius: 2rem;

      border: 1px dashed #000;
    }
  }

  .project__reaction-wrap--button-blue {
    &:hover,
    &:focus {
      border: 1px solid blue;
      background-color: blue;
      color: #fff;
      border-radius: 0 1rem;
    }
  }

  .project__reaction-wrap--button-red {
    &:hover,
    &:focus {
      border: 1px solid red;
      background-color: red;
      color: #fff;
      border-radius: 1rem 0;
    }
  }

  .project__description-container {
    margin: 1rem 0;

    overflow: scroll;
    height: 100px;
    width: 60%;
  }

  .project__links-button {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .project__links {
    display: flex;
    gap: 1rem;
  }

  .project__input-comments {
    position: absolute;
    top: 100%;
  }

  .project__comments-wrap {
    overflow: scroll;
    height: 10rem;
    width: 100%;
  }
`;

export const TopCss = styled(Button)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  margin-top: -5rem;
  padding: 1rem;
  border: none;
  border-radius: 100%;
`