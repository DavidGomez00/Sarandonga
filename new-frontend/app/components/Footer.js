import React from 'react';
import { View, StyleSheet } from 'react-native';

import RoundButton from './RoundButton';
import { COLORS } from '../utils/constants';

function Footer({ handleChoice }) {
  return (
    <View style={styles.container}>
      <RoundButton
        name="times"
        size={40}
        color={COLORS.nope}
        onPress={() => handleChoice(-1)}
      />
      <RoundButton
        name="heart"
        size={34}
        color={COLORS.like}
        onPress={() => handleChoice(1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 15,
        width: 170,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: -1,
      },
});

export default Footer;
