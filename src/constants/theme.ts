interface ITheme {
    [key: string]: { [key: string]: string }
}

let theme: ITheme;

theme = {
  colors: {
    red: "red",
  },
  background: {
    red: "#da1e37",
  },
  shadow: {
    default: "rgb(38, 57, 77) 0px 20px 30px -10px",
  },
};

export default theme