import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, StyleSheet, Button } from 'react-native';

import Card from '../components/Card';
import Footer from '../components/Footer';
import { ACTION_OFFSET, CARD } from '../utils/constants';

const petsArray = [
    {//1 blues
      name: "To Know you is to Love You - B.B King",
      genero: "Blues",
      source: "https://pixabay.com/illustrations/moon-moonlight-night-full-moon-4919501/",
    },
    {//2 blues
      name: "Tell Mama - Etta James",
      genero: "Blues",
      source: "../../assets/images/blues2ettajames_dorightwoman.png",
    },
    {//3 pop
      name: "Shivers - Ed Sheeran",
      genero: "Pop",
      source: "../../assets/images/pop2ed.png",
    },
    {//4
      name: "Symphonien No.s 5 & 7 - Bethoven",
      genero: "Clasica",
      source: "../../assets/images/clasica1betoven.png",
    },
    {//5
      name: "Somebody Loan Me a Dime - Fenton Robinson",
      genero: "Blues",
      source: "../../assets/images/blues3fentonRobinson.png",
    },
    {//6
      name: "Country Roads - John Denver",
      source: "../../assets/images/country2johndenvercountryroads.png",
    },
    {//7
      name: "3u96 - Club Bizarre",
      source: "../../assets/images/house3u96clubbizarre.png",
    },
    {//8
      name: "La campanella in G-Sharp Minor- Lang Lang",
      source: "../../assets/images/clasica2lang.png",
    },
    {//9
      name: "La Noche de Anoche - Bad Bunny",
      source: "../../assets/images/latino4badbunny.png",
    },
    {//10
      name: "Back in Black - ACDC",
      source: "../../assets/images/rack2acdc.png",
    },
    {//11
      name: "I Like it - Tim McGrawil",
      source: "../../assets/images/country3timmcgrawilikeit.png",
    },
    {//12
      name: "Dream a Little Dream of Me - Ella Fitzgerald",
      source: "../../assets/images/jazz1ellafit.png",
    },
    {//13
      name: "For the Greater Good of God - Iron Maiden",
      source: "../../assets/images/metal1ironmaiden.png",
    },
    {//14
      name: "Go Easy on Me - Adele",
      source: "../../assets/images/pop1adele.png",
    },
    {//15
      name: "Up and Down - VengaBoys",
      source: "../../assets/images/house1vengaboysupanddown.png",
    },
    {//16
      name: "Solitude - Billie Holiday",
      source: "../../assets/images/jazz3billie.png",
    },
    {//17
      name: "Another Night - Real MCoy",
      source: "../../assets/images/house2realmcoyanother night.png",
    },
    {//18
      name: "Blues Walk - Loud Donalson",
      source: "../../assets/images/jazz2loudonalson.png",
    },
    {//19
      name: "Pelele - Morad",
      source: "../../assets/images/latino2morad.png",
    },
    {//20
        name: "Take on Me - Wham!",
        source: "../../assets/images/disco1wham.png",
    },
    {//21
        name: "Promises - Megadeth",
        source: "../../assets/images/metal2promisesmegadeth.png",
    },
    {//22
        name: "Stayin Alive - Beegees",
        source: "../../assets/images/disco2beegees.png",
    },
    {//23
      name: "Todo a su Tiempo - Marc Anthony",
      source: "../../assets/images/salsa2marc.png",
    },
    {//24
       name: "Everlong - Foo Fighters",
       source: "../../assets/images/rock3foo.png",
     },
    {//25
      name: "Hold On - Justin Bieber",
      source: "../../assets/images/pop3justin.png",
    },
    {//26
      name: "Mahler Symphony No.5 - Daniel Barenboim",
      source: "../../assets/images/clasica3mahler.png",
    },
    {//27
      name: "Girls just wanna Have Fun - Cindy Lauper",
      source: "../../assets/images/dance3lauper.png",
    },
    {//28
      name: "I Want Out - Helloween",
      source: "../../assets/images/metal3halloween.png",
    },
    {//29
      name: "I Want Out - Helloween",
      source: "../../assets/images/rock1nirvana.png",
    },  
    {//30
      name: "La Vida es un Carnaval- Celia Cruz",
      source: "../../assets/images/salsa1celiacruz.png",
    }, 
    {//31
      name: "Cayó la Noche - Justin Quiles",
      source: "../../assets/images/latino1quiles.png",
    }, 
    {//32
      name: "Para que volver - Eddie Maldonado",
      source: "../../assets/images/salsa3eddiemaldonado.png",
    },   
    {//33
      name: "Song One Country - Alan Jackson",
      source: "../../assets/images/country1alanjacksongonecountry.png",
    },   
    
  ];

function Main({navigation}) {
  const [pets, setPets] = useState([]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!pets.length) {
      setPets(petsArray);
    }
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setPets((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <>
    <View style={styles.container}>
      {pets
        .map(({ name, source }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={index}
              name={name}
              source={source}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}

      <Footer handleChoice={handleChoice} />
    </View>
    <Button title='GO SEARCH' onPress={() => navigation.navigate("SEARCH")}/>

    </>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
      alignItems: 'center',
    },
  });

  export default Main;