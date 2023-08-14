import styled from "@emotion/styled";

export const FormCss = styled.section`
  padding: 3.25rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7rem;

  background-color: #313131;

  .form__avatar {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    button {
      padding: 0.2rem 0.5rem;
      border: 1px solid transparent;
      background: linear-gradient(
        90deg,
        #ff0000 0%,
        transparent 35%,
        #ff0000 100%
      );
      background-color: #000;
      color: #fff;
      border-radius: 20px;
      &:hover,
      &:focus {
        background-color: #98f4f4;
      }
    }
  }
  .form__info {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    row-gap: 1rem;

    label {
      display: flex;
      gap: 1rem;
      align-items: baseline;

      &:nth-child(2) {
        padding-right: 1rem;
      }

      button {
        padding: 0.2rem 0.5rem;
        border: 1px solid transparent;
        background-color: #000;
        color: #fff;
        border-radius: 20px;

        &:hover,
        &:focus {
          background-color: #fff;
          color: #000;
          border: 1px solid black;
        }
      }

      input {
        padding: 0.2rem 0.5rem;

        border: 1px solid black;

        border-radius: 20px;
      }
    }
  }
`;