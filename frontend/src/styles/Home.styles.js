export const MyHome = {
  main: {
    w: "100%",
    h: "100vh",
    direction: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  heading: {
    my: "2",
  },
  newBtnFlex: {
    w: "100%",
    justifyContent: "flex-start",
  },
  newBtn: {
    m: "8",
    borderRadius: "50%",
    fontSize: "32px",
    color: "orange",
    _hover: { bgColor: "black" },
  },
  loadFlex: {
    justifyContent: "center",
    alignItems: "center",
    w: "100%",
  },
  loadImg: {
    w: "200px",
  },
  emptyFlex: {
    justifyContent: "center",
    direction: "column",
    alignItems: "center",
    w: "100%",
  },
  emptyImg: {
    w: "300px",
  },
  emptyHeading: {
    fontSize: { base: "xl", sm: "2xl", md: "4xl" },
  },
  grid: {
    w: "100%",
    columns: { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
    spacing: 5,
  },
  errorFlex: {
    justifyContent: "center",
    direction: "column",
    alignItems: "center",
    w: "100%",
  },
  errHeading: {},
};
