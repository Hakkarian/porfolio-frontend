import {FC} from 'react'
import { AboutCss, FooterCss, HeroCss, HomeCss } from './HomePage.styled'

const HomePage: FC = () => {
  return (
    <HomeCss>
      <HeroCss><div><h1>Don't be shy.</h1>
      <h2>Check my portfolio.</h2></div></HeroCss>
      <AboutCss></AboutCss>
      <FooterCss></FooterCss>
  </HomeCss>
  )
}

export default HomePage