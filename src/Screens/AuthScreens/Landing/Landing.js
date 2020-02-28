import React from 'react';
import {Dimensions, Linking, Platform, View, StyleSheet, StatusBar} from 'react-native';
import {DeckSwiper} from 'native-base';
import Carousel from 'react-native-carousel';
import {
  Content,
  LogoImg,
  SText,
  StyledButton,
  colors,
} from '../../../Components/styledComponents';
import {KekeIcon, PhoneIcon, GasCylinder} from '../../../Components/icons';
import {Rating} from '../../../Components/Components';

const logo = require('../../../assets/img/logo.png');
const {height, width} = Dimensions.get('window');

const slides = [
  {header: 'Buy Gas'},
  {header: 'We Pickup'},
  {header: 'We Deliver'},
];
const Landing = ({navigation}) => {
  return (
    <Content align="center" justify="space-between">
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <Content flex={1}>
        <LogoImg source={logo} width={width * 0.7} resizeMode="contain" />
      </Content>
      <Content flex={3} horizontal>
        <Carousel
          indicatorAtBottom={true}
          indicatorColor={colors.primary}
          delay={3000}
          indicatorOffset={0}
          inactiveIndicatorColor="#444444">
          <Content>
            <GasCylinder color={colors.primary} size={width * 0.4} />
            <SText color="#444444" size="32px" vmargin={10} weight="700">
              Buy Gas
            </SText>
            <SText align="center" width="60%" color="#444444" size="14px">
              Running out of gas? Request for cooking gas refill
            </SText>
          </Content>
          <Content>
            <GasCylinder color={colors.primary} size={width * 0.4} />
            <SText color="#444444" size="32px" vmargin={10} weight="700">
              We Pickup
            </SText>
            <SText align="center" width="60%" color="#444444" size="14px">
              A rider will arrive at your pickup address, pickup the cylinder,
              take it to the gas station and refill it
            </SText>
          </Content>
          <Content>
            <GasCylinder color={colors.primary} size={width * 0.4} />
            <SText color="#444444" size="32px" vmargin={10} weight="700">
              Delivered
            </SText>
            <SText align="center" width="60%" color="#444444" size="14px">
              The rider returns with the gas filled container
            </SText>
          </Content>
        </Carousel>
      </Content>
      <Content bmargin={30} flex={1} justify="space-around">
        <StyledButton
          bg={colors.primary}
          shadow
          width="85%"
          curved
          onPress={() => navigation.navigate('SignUp')}>
          <SText size="20px" color="#ffffff">
            Create Your Account
          </SText>
        </StyledButton>
        <View style={{flexDirection: 'row'}}>
          <SText size="15px" color="#777777" hmargin={5}>
            Already have an account?
          </SText>
          <StyledButton
            width="auto"
            height="auto"
            onPress={() => navigation.navigate('Login')}>
            <SText size="15px" weight="700" color={colors.primary}>
              Login
            </SText>
          </StyledButton>
        </View>
      </Content>
    </Content>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: width * 0.2,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default Landing;
