import React, {useState} from 'react';
import {View, Button, Text, Dimensions, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Toast, Spinner} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {onSignIn} from '../../../_services';
import {
  Content,
  SText,
  StyledButton,
  LogoImg,
  SNInput,
  colors,
} from '../../../Components/styledComponents';
import {Item, Input, Icon, Label} from 'native-base';
import {PersonIcon, LockIcon, AtIcon} from '../../../Components/icons';
import {APIS, request, toastDefault} from '../../../_services';
import {login} from '../../../_store/actions/authActions';
import {LostCoinIcon} from '../../../Components/Vectors';

const {height, width} = Dimensions.get('window');
const logo = require('../../../assets/img/logoblue.png');

const SignUp = props => {
  const {navigation, dispatch, userInfo} = props;
  const [loading, setLoading] = useState(false);
  const [rsaPin, setRsaPin] = useState('');
  const [email, setEmail] = useState('')
  const [sentRsa, setSentRsa] = useState(false);
  const signIn = async user => {
    await onSignIn(user);
    navigation.navigate('SignedIn');
  };

  const handleSubmit = async () => {
    // navigation.navigate('SignedIn');
    const {
      baseUrl,
      getCredentials: {method, path},
    } = APIS;
    console.log(path);
    const submitUrl = `${baseUrl}${path}`;

    setLoading(true);
    const response = await request(method, submitUrl, {rsa_pin: rsaPin});
    console.log(response, method, submitUrl);
    if (response.email) {
      setEmail(response.email);
      Toast.show({
        ...toastDefault,
        text: `Your log in credentials have been sent to ${response.email}`,
        type: 'success',
      });
      setSentRsa(true);
      setLoading(false);
    } else {
      Toast.show({
        ...toastDefault,
        text: 'Invalid RSA PIN',
        type: 'danger',
      });
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <Content flex={0.3} justify="space-evenly">
        <LogoImg source={logo} width={width * 0.3} resizeMode="contain" />
        {/* <LostCoinIcon size={width * 0.2} /> */}
        {!sentRsa ? (
          <SText size="18px" color="#777777">
            Enter your RSA PIN
          </SText>
        ) : (
          <SText size="18px" color="#777777">
            Login to your account
          </SText>
        )}
      </Content>
      {sentRsa ? (
        <>
          <Content flex={0.3} width="90%">
            <SText color="#444444" size="20px" align="center">
              Your Login credentials have been sent to
            </SText>
            <SText
              color="#444444"
              size={width * 0.06}
              weight="700"
              align="center">
              {email}
            </SText>
          </Content>
          <Content flex={0.3}>
            <StyledButton
              curved
              bg={colors.primary}
              width="90%"
              onPress={() => navigation.navigate('Login')}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="20px" color="#ffffff">
                  Login
                </SText>
              )}
            </StyledButton>
          </Content>
        </>
      ) : (
        <>
          <Content flex={0.3} width="90%">
            <Item style={{marginBottom: 15}}>
              <LockIcon color={colors.primary} size={30} />
              <SNInput
                floatingLabel
                placeholder="RSA PIN"
                keyboardType="numeric"
                style={{color: '#444444'}}
                onChangeText={text => setRsaPin(text)}
              />
            </Item>
          </Content>
          <Content flex={0.2} bmargin={30} justify="space-around">
            <StyledButton
              curved
              bg={colors.primary}
              width="90%"
              onPress={() => handleSubmit()}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="20px" color="#ffffff">
                  Sign Up
                </SText>
              )}
            </StyledButton>
            <View style={{ flexDirection: 'row'}}>
              <SText size="15px" color="#777777" hmargin={5}>
                Already have an account?
              </SText>
              <StyledButton
                width="auto"
                height="auto"
                onPress={() => navigation.navigate('Login')}>
                <SText size="15px" weight="700" color={colors.primary}>
                  Log In
                </SText>
              </StyledButton>
            </View>
          </Content>
        </>
      )}
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  // userData: state.userData,
});

export default connect(mapStateToProps)(SignUp);
