import React, { FC } from 'react';
import { ContCss } from './DarkMode.styled';
import { AppProps } from '../App/AppBar';

const DarkMode: FC<AppProps> = ({toggleTheme}) => {

  return (
    <ContCss className="content">
      <input type="checkbox" id="btn" onChange={toggleTheme} />
      <label htmlFor="btn">
        <span className="track"></span>
        <span className="thumb">
          <span className="eye"></span>
        </span>
      </label>
    </ContCss>
  );
}

export default DarkMode;