import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const HeaderCss = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  background-color: rgba(255, 255, 255, 0.01);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 1rem;
  border: 1ox solid rgba(255, 255, 255, 0.3);
`;

export const Nav = styled.nav`
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 5rem;

  @media screen and (max-width: 41.625rem) {
    display: none;
  };
`;

export const NavLinkCss = styled(NavLink)`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transition: color 250ms ease-in-out;


  &::after {
    display: inline-block;
    content: " ";
    width: 100%;
    height: 2px;
    background-color: #212121;
    border-radius: 3px;

    transform: scaleX(0);

    transition: transform 300ms ease-in-out;
  }

  &:hover,
  &:focus, 
  &.active {
    color: $

    &::after {
      transform: scaleX(1);
    }
  }
`;

export const UserWrap = styled.div`
  @media screen and (max-width: 41.625rem) {
    padding-left: 1rem;
  }
  padding-right: 1rem;
  display: flex;
  gap: 5rem;
  
  transition: background-color 250ms ease-in-out;

  p {
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    transition: color 250ms ease-in-out;

    &::after {
      display: inline-block;
      content: " ";
      width: 100%;
      height: 2px;
      background-color: #212121;
      border-radius: 3px;

      transform: scaleX(0);

      transition: transform 300ms ease-in-out;
    }

    &:hover,
    &:focus {
      color: #212121;

      &::after {
        transform: scaleX(1);
      }
    }
  }
  .header__button--transparent-bg {
    &:hover,
    &:focus {
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
      border-radius: 0.125rem 1rem;
    }
  }
`;

export const AvatarUsername = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.25rem;

  .header__avatar > img {
    width: 40;
    height: 40;

    border: 1px dashed #000;
    border-radius: 1rem 0.5rem;

    transition: border 250ms ease-in-out, border-radius 250ms ease-in-out;

    &:hover,
    &:focus {
      border: 1px dashed #fff;
      border-radius: 0.5rem 1rem;
    }
  }
`;