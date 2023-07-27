import styled from "@emotion/styled";

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
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .project__reactions {
        display: flex;
        gap: 1rem;
    }

    .project__reaction-wrap {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .project__links {
        display: flex;
        gap: 1rem;
    }

    .project__comments-wrap {
        overflow: scroll;
        height: 10rem;
        width: 100%;
    }
`