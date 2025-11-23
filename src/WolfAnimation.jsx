import React from "react";
import Lottie from "lottie-react";

import veryHungryAnim from "./animations/very_hungry.json";
import hungryAnim from "./animations/hungry.json";
import almostAnim from "./animations/almost.json";
import strongAnim from "./animations/strong.json";

const WolfAnimation = ({ state }) => {
  let animationData = strongAnim;

  switch (state) {
    case "very_hungry":
      animationData = veryHungryAnim;
      break;

    case "hungry":
      animationData = hungryAnim;
      break;

    case "almost_full":
      animationData = almostAnim;
      break;

    case "full_strong":
      animationData = strongAnim;
      break;

    default:
      animationData = strongAnim;
  }

  return (
    <div style={styles.container}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={styles.animation}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: "100%",
    maxWidth: "420px",
  },
};

export default WolfAnimation;
