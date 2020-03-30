import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NumberFormat from 'react-number-format';
import RNPaystack from 'react-native-paystack';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import {WebView} from 'react-native-webview';
import {List, ListItem, Icon, Spinner, Item, Toast} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {APIS, request, toastDefault} from '../../_services';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
  LogoImg,
} from '../../Components/styledComponents';
import {NextIcon} from '../../Components/icons';
import {RsaIcon} from '../../Components/Vectors';

const {height, width} = Dimensions.get('window');
const paystackLogo = require('../../assets/img/paystack.png');

const Pay = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {email} = userInfo;
  const inputs = navigation.getParam('inputs') || {};
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [cardValid, setCardValid] = useState();
  // const [cardNumber, setCardNumber] = useState(null);
  // const [expiry, setExpiry] = useState(null);
  // const [cvc, setCvc] = useState(null);
  console.log(inputs);

  const chargeCard = () => {
    const {number, expiry, cvc} = cardDetails;
    console.log(expiry.split('/'));
    setLoading(true);
    RNPaystack.chargeCard({
      cardNumber: number,
      expiryMonth: expiry.split('/')[0],
      expiryYear: expiry.split('/')[1],
      cvc,
      email,
      amountInKobo: parseInt(inputs.total, 10) * 100,
    })
      .then(response => {
        console.log(response);
        setLoading(false);
        Toast.show({
          ...toastDefault,
          text: 'Payment Succesfull',
          type: 'success',
        }); // card charged successfully, get reference here
        setTimeout(() => navigation.navigate('Rider'), 2000);
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          ...toastDefault,
          text: 'Unable to complete payment',
          type: 'danger',
        });
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      });
  };
  const checkDetails = e => {
    const validCard = Object.values(e.status).every(val => val === 'valid');
    console.log(validCard);
    if (validCard) {
      setCardDetails(e.values);
    }
    setCardValid(validCard);
    return;
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View style={{height: height * 0.7, justifyContent: 'center'}}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />
          <View
            style={{
              alignItems: 'center',
              height: height * 0.6,
            }}>
            <Content justify="center" vmargin={10} flex={1}>
              <NumberFormat
                value={parseInt(inputs.total, 10)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'\u20A6'}
                renderText={value => (
                  <SText color="#444444" size="48px" weight="600">
                    {value}
                  </SText>
                )}
              />
              <SText color="#444444" size="48px" />
            </Content>
            <Content width="90%" vmargin={10} flex={1} align="flex-start">
              <SText color="#777777" size="12px">
                Enter Card Information
              </SText>
              <Item>
                <LiteCreditCardInput onChange={checkDetails} />
              </Item>
            </Content>
            <Content align="center" vmargin={10} flex={1} justify="center">
              <LogoImg
                source={paystackLogo}
                width={width * 0.8}
                height={90}
                resizeMode="contain"
                style={{alignSelf: 'center'}}
              />
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0} justify="flex-end">
          <StyledButton
            bg="#00AEEF"
            width="100%"
            onPress={chargeCard}
            disabled={!cardValid}>
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" weight="700" color="#ffffff">
                PAY
              </SText>
            )}
          </StyledButton>
        </Content>
      </KeyboardAwareScrollView>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Pay);
