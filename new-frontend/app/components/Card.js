import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { Animated, Image, Text, StyleSheet, View } from 'react-native';
import Choice from './Choice';
import { ACTION_OFFSET } from '../utils/constants';
import { CARD } from '../utils/constants';

function Card({
  name,
  source,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          <Choice type="nope" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
     <View style={styles.image}></View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />
      <Text style={styles.name}>{name}</Text>

      {isFirst && renderChoice()}
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 45,
    },
    image: {
      width: CARD.WIDTH,
      height: CARD.HEIGHT -200,
      borderRadius: CARD.BORDER_RADIUS,
      backgroundColor: '#000'
    },
    gradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 160,
      borderRadius: CARD.BORDER_RADIUS,
    },
    name: {
      position: 'absolute',
      top: 200,
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
    },
    choiceContainer: {
      position: 'absolute',
      top: 100,
    },
    likeContainer: {
      left: 45,
      transform: [{ rotate: '-30deg' }],
    },
    nopeContainer: {
      right: 45,
      transform: [{ rotate: '30deg' }],
    },
  });
  

export default Card;