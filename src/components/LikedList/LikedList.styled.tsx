import styled from "@emotion/styled";
import { Button } from "../../shared";

export const NotLikeButton = styled(Button)`
  background: linear-gradient(
    90deg,
    #000 0%,
    transparent 35%,
    #000 100%
  );

  font-weight: 700;

  background-color: #790909;

  &:hover,
  &:focus {
    background-color: #000;
    color: #ff0000;
  }
`;