import React from "react";
import Stack from "../../../primitives/Stack/Stack";
import SelfPortraitVector from "../../../icons/SelfPortraitVector";
import styles from "./BioCard.module.css";

type Props = {};

const BioCard = (props: Props) => {
  return (
    <Stack horizontal responsive className={styles.Container}>
      <Stack horizontal centered>
        <SelfPortraitVector />
        <h3 title="The artist formerly known as Oscar">Ryosuke Hana</h3>
      </Stack>
      <Stack horizontal centered>
        <h4 data-mobile>SF, CA</h4>
        <h4 data-mobile>PlayStation</h4>
        <h4>San Francisco, CA</h4>
        <h4>Prev. at PlayStation</h4>
      </Stack>
    </Stack>
  );
};

export default BioCard;
