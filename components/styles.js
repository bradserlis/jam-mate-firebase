import { StyleSheet, StatusBar, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const MODAL_HEIGHT = height / 3;
const CENTER = width / 2;

const styles = StyleSheet.create({
  topBuffer: {
    paddingTop: 50
  },
  titleMate: {
    fontSize: 120,
    paddingTop: 160,
    marginBottom: 50,
    fontFamily: "Avenir",
    color: "#007bff",
    fontWeight: "900",
    textShadowColor: "#111111",
    textShadowOffset: { width: 4, height: 15 },
    textShadowRadius: 15,
    position: "absolute",
    top: 45,
    left: -185
  },
  profileListText: {
    textAlign: "center",
    letterSpacing: 1.5
  },
  profileHeaderText: {
    fontFamily: "Copperplate",
    color: "white"
  },
  title: {
    fontSize: 80,
    paddingTop: 140,
    marginBottom: 50,
    fontFamily: "Avenir",
    color: "#007bff",
    fontWeight: "900",
    textShadowColor: "#111111",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 5,
    position: "absolute",
    top: -70,
    left: -200
  },
  notchCompensation: {
    marginTop: 0
  },
  addIconStyle: {
    padding: 7,
    marginBottom: 6,
    borderRadius: 10,
    borderColor: "dodgerblue",
    borderWidth: 1,
    flexDirection: "row",
    alignSelf: "center"
  },
  statements: {
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
    fontSize: 30
  },
  advice: {
    fontWeight: "bold",
    color: "rgba(250,250,240,.8)"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.25)",
    height: window.height,
    width: window.width,
    flex: 1
  },
  badgeList: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 5
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  modalViewContainer: {
    width: "100%",
    backgroundColor: "white",
    height: MODAL_HEIGHT,
    borderRadius: 5
  },
  modalSmallContainerView: {
    width: "100%",
    height: MODAL_HEIGHT / 3,
    alignItems: "center",
    justifyContent: "center"
  },
  modalTitleText: {
    color: "black",
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold"
  },
  modalSeparatorLine: {
    width: "100%",
    backgroundColor: "lightgray",
    position: "absolute",
    bottom: 0,
    height: 1
  }
});

export default styles;
