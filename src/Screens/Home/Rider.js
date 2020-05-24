import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Linking,
  Platform,
  View,
  StyleSheet,
  BackHandler,
  StatusBar,
  Modal,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Spinner, Toast} from 'native-base';
import {
  Content,
  ContentB,
  LogoImg,
  SText,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {KekeIcon, PhoneIcon} from '../../Components/icons';
import {Rating, GiveRating} from '../../Components/Components';
import {APIS, requestJwt, toastDefault} from '../../_services';

const avatar = require('../../assets/img/avatar.png');
const {height, width} = Dimensions.get('window');

const Rider = ({navigation, userInfo}) => {
  const {token} = userInfo;
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rating, setRating] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const vendorInfo = navigation.getParam('vendorInfo') || {};
  useEffect(() => {
    // messageListener();
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  // const messageListener = () => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         navigation.navigate('Rider', {orderInfo: remoteMessage.data});
  //       }
  //     });
  //   messaging().onMessage(message => {
  //     console.log(JSON.stringify(message), message);
  //   });
  // };

  const makeCall = () => {
    let phoneNumber = '';
    const androidPrefix = 'tel:${';
    const iosPrefix = 'telprompt:${';

    if (Platform.OS === 'android') {
      phoneNumber = androidPrefix + vendorInfo.dealerphone + '}';
    } else {
      phoneNumber = iosPrefix + vendorInfo.dealerphone + '}';
    }

    Linking.openURL(phoneNumber);
  };

  const confirmOrder = async () => {
    const {
      baseUrl,
      confirmOrders: {method, path},
    } = APIS;
    const url = baseUrl + path;
    const payload = {
      buyid: parseInt(vendorInfo.buyid, 10),
      rating: parseInt(rating, 10),
    };
    setLoading(true);
    const response = await requestJwt(method, url, payload, token);
    console.log(payload, url, token, method);
    console.log(response);
    if (response.meta && response.meta.info === 'Request successful') {
      Toast.show({
        ...toastDefault,
        text: 'Delivery Confirmed',
        type: 'success',
      });
      setConfirmed(true);
      setOpenRating(false);
    } else {
      Toast.show({
        ...toastDefault,
        text: response.meta.message,
        type: 'danger',
      });
    }
    setLoading(false);
  };
  return (
    <Content align="center" justify="space-between">
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Content flex={2}>
        <View style={styles.avatarContainer}>
          <LogoImg
            source={avatar}
            width={width * 0.4}
            height={width * 0.4}
            resizeMode="contain"
            style={{alignSelf: 'center'}}
          />
        </View>
        <SText size="32px" color="#333333" weight="700">
          {vendorInfo.dealername}
        </SText>
      </Content>
      {/* <Content flex={1} horizontal>
        <Content align="center" flex={1} height="100%" justify="space-between">
          <SText color="#6d6e70" size="17px">
            Vehicle type
          </SText>
          <Content justify="space-around">
            <KekeIcon size="60px" />
          </Content>
        </Content>
        <Content height="100%" justify="space-between">
          <SText color="#6d6e70" size="17px">
            License Number
          </SText>
          <Content justify="space-around">
            <SText color="#444444" size="24px" weight="700">
              KUJ 989 AG
            </SText>
          </Content>
        </Content>
      </Content> */}
      <Content justify="space-between">
        <Rating size={35} rating={Math.round(vendorInfo.rating)} />
        <Content horizontal>
          <PhoneIcon color="#6d6e70" size={20} />
          <SText hmargin={5} color="#6d6e70" size="17px">
            {vendorInfo.dealerphone}
          </SText>
        </Content>
      </Content>
      <Content horizontal align="flex-end" justify="space-between">
        <StyledButton
          bg={colors.primary}
          width="50%"
          onPress={() => makeCall()}>
          <SText size="20px" weight="700" color="#ffffff">
            CALL
          </SText>
        </StyledButton>
        <StyledButton
          bg="#00a651"
          width="50%"
          onPress={() => setOpenRating(true)}
          disabled={confirmed}>
          <SText size="20px" weight="700" color="#ffffff">
            CONFIRM
          </SText>
        </StyledButton>
      </Content>
      <Modal animationType="slide" transparent visible={openRating}>
        <Content bg="#00000022" onPress={() => setOpenRating(false)}>
          <ContentB bg="#ffffff" height={height * 0.4} width="70%" borderR={5}>
            <SText color="#444444" bmargin={20} size="17px">
              Rate Vendor
            </SText>
            <GiveRating size={35} rating={rating} rate={setRating} />
            <StyledButton
              bg="#00a651"
              width="50%"
              disabled={confirmed}
              curved
              height={50}
              tmargin={35}
              onPress={confirmOrder}
              shadow>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="18px" weight="700" color="#ffffff">
                  CONFIRM
                </SText>
              )}
            </StyledButton>
            <StyledButton
              width="auto"
              height="auto"
              tmargin={20}
              onPress={() => setOpenRating(false)}>
              <SText size="15px" weight="700" color={colors.dark}>
                Cancel
              </SText>
            </StyledButton>
          </ContentB>
        </Content>
      </Modal>
    </Content>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: width * 0.2,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Rider);
