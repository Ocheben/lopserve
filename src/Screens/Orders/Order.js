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
import {Spinner, Toast} from 'native-base';
import {
  Content,
  ContentB,
  LogoImg,
  SText,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {
  KekeIcon,
  PhoneIcon,
  GasCylinder,
  PriceTagIcon,
} from '../../Components/icons';
import {Rating, GiveRating} from '../../Components/Components';
import NumberFormat from 'react-number-format';
import {APIS, requestJwt, toastDefault} from '../../_services';
import {getOrders} from '../../_store/actions/userActions';

const avatar = require('../../assets/img/avatar.png');
const {height, width} = Dimensions.get('window');

const statusColors = ['#ff1744', colors.primary, '#1b5e20'];
const statusMessages = ['Queued', 'In Progress', 'Delivered'];

const OrderItem = ({navigation, userInfo, dispatch, userData}) => {
  const {token} = userInfo;
  const {orders} = userData;
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rating, setRating] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const orderinfo = navigation.getParam('orderInfo');
  console.log(orderInfo);
  const makeCall = () => {
    let phoneNumber = '';
    const androidPrefix = 'tel:${';
    const iosPrefix = 'telprompt:${';

    if (Platform.OS === 'android') {
      phoneNumber = androidPrefix + '09025605555' + '}';
    } else {
      phoneNumber = iosPrefix + '09025605555' + '}';
    }

    Linking.openURL(phoneNumber);
  };

  const selectedOrder =
    orders.find(order => order.buyid === orderinfo.buyid) || {};
  const orderInfo = {
    ...selectedOrder,
    date: selectedOrder.dateordered || '',
    price: selectedOrder.price ? parseInt(selectedOrder.price, 10) : 0,
    size: selectedOrder.buyingsize ? selectedOrder.buyingsize + ' kg' : '',
    status:
      selectedOrder.orderstatus && selectedOrder.orderstatus !== null
        ? parseInt(selectedOrder.orderstatus, 10)
        : 0,
  };

  const confirmOrder = async () => {
    const {
      baseUrl,
      confirmOrders: {method, path},
    } = APIS;
    const url = baseUrl + path;
    const payload = {
      buyid: parseInt(orderInfo.buyid, 10),
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
      dispatch(getOrders(token));
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
      <Content flex={1}>
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
          {orderInfo.dealername || 'Lopserv'}
        </SText>
      </Content>
      <Content justify="space-between">
        <Rating size={35} rating={4} />
        <Content horizontal>
          <PhoneIcon color="#6d6e70" size={20} />
          <SText hmargin={5} color="#6d6e70" size="17px">
            {orderInfo.dealerphone || '09025605555'}
          </SText>
        </Content>
        <Content horizontal width="70%">
          <Content horizontal justify="center">
            <GasCylinder
              size="20px"
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <SText size="20px" color={colors.dark}>
              {orderInfo.size}
            </SText>
          </Content>
          <Content horizontal justify="center">
            <PriceTagIcon
              size="20px"
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <NumberFormat
              value={parseInt(orderInfo.totalprice || 0, 10)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'\u20A6'}
              renderText={value => (
                <SText size="20px" color={colors.dark}>
                  {value}
                </SText>
              )}
            />
          </Content>
        </Content>
        <SText
          size="25px"
          weight="700"
          bmargin={10}
          color={statusColors[orderInfo.status]}>
          {statusMessages[orderInfo.status]}
        </SText>
      </Content>
      <ContentB horizontal align="flex-end" justify="space-between">
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
          disabled={confirmed || orderInfo.status !== 1}>
          <SText size="20px" weight="700" color="#ffffff">
            CONFIRM
          </SText>
        </StyledButton>
      </ContentB>
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
              disabled={confirmed || orderInfo.status !== 1}
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

export default connect(mapStateToProps)(OrderItem);
