import styled from '@emotion/styled';

export const ContainerCss = styled.div`
  @media screen and (min-width: 20rem) and (max-width: 41.625rem) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media screen and (min-width: 41.626rem) and (max-width: 120rem) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  @media screen and (min-width: 120rem) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;

  background-color: #000;
  color: #fff;

  border: 1px solid #212121;
  border-radius: 0.125rem;

  transition: background-color 250ms linear, color 250ms linear, border 250ms ease-in-out,
    border-radius 250ms ease-in-out;

  &:hover,
  &:focus {
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
    border-radius: 0.125rem 1rem;
  }
`;