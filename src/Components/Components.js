import React from 'react';
import {ImageBackground, Dimensions, View, StyleSheet} from 'react-native';
import {GradientView, SText, colors} from './styledComponents';
import {GoldStar, NoStar} from './icons';

const {height, width} = Dimensions.get('window');

export const Advert = ({img, header}) => (
  <ImageBackground
    source={img}
    style={{height: '100%', width: '100%'}}
    resizeMode="cover">
    <GradientView
      colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']}>
      <View style={{height: '20%', justifyContent: 'space-between'}}>
        <SText color={colors.primary} size="30px" weight="700">
          {header}
        </SText>
      </View>
    </GradientView>
  </ImageBackground>
);

export const Rating = ({size, rating}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={styles.starContainer}>
      {rating >= 1 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 2 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 3 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 4 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 5 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  starContainer: {marginLeft: 5, marginRight: 5},
});
