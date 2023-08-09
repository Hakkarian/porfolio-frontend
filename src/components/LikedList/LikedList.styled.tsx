import styled from "@emotion/styled";
import { Button } from "../../shared";

export const NotLikeButton = styled(Button)`
  background: linear-gradient(
    90deg,
    transparent 0%,
    #790909 35%,
    rgba(2, 0, 36, 1) 100%
  );

  font-weight: 700;

  background-color: yellow;

  &:hover,
  &:focus {
    background-color: #000;
    color: #ff0000;
  }
`;