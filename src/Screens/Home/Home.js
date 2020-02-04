import React, {useEffect} from 'react';
import {
  View,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import {onSignOut} from '../../_services';
import {getDash} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  StyledButton,
  colors,
  LogoImg,
} from '../../Components/styledComponents';
import {MenuIcon} from '../../Components/icons';
import {formatDate} from '../../_helpers';
import {Spinner} from 'native-base';

const {height, width} = Dimensions.get('window');
const logo = require('../../assets/img/logo.png');

const Home = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {
    loading,
    dashboard: {user, totalContributionsThisYear, lastContribution},
  } = userData;
  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  useEffect(() => {
    dispatch(getDash(userInfo.access_token));
  }, []);

  return (
    <Content bg="#ffffff">
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Content
        width="100%"
        bg={colors.primary}
        flex={4}
        blRadius={20}
        brRadius={20}>
        {/* <Content
          justify="space-between"
          hpadding={12}
          align="center"
          bg={colors.primary}
          horizontal>
          <TouchableOpacity
            style={{width: 40}}
            onPress={() => navigation.openDrawer()}>
            <MenuIcon color="#ffffff" size={20} />
          </TouchableOpacity>
          <LogoImg
            source={logo}
            width={width * 0.3}
            resizeMode="contain"
            style={{alignSelf: 'center'}}
          />
          <View style={{width: 40}} />
        </Content> */}
        <Content flex={2} align="center" justify="center">
          <Content horizontal>
            <SText size="25px" color="#ffffff">
              Hello{' '}
            </SText>
            <SText size="25px" weight="700" color="#ffffff">
              {user && user.name}
              {/* Joe Jackson */}
            </SText>
          </Content>
          <Content horizontal>
            {loading !== 'dashboard' && (
              <>
                <SText size="20px" color="#ffffff">
                  RSA:
                </SText>
                <SText size="20px" weight="600" color="#ffffff">
                  {'  '}
                  {user && user.rsa_account.rsa_pin}
                  {/* 97642398383024 */}
                </SText>
              </>
            )}
          </Content>
        </Content>
      </Content>
      <Content justify="space-evenly" flex={6}>
        <Content
          bg="#ffffff"
          shadow
          flex={0.4}
          borderR={10}
          width="90%"
          align="flex-start"
          hpadding={width / 20}
          justify="space-around">
          <SText size="20px" color={colors.dark}>
            Total Contribution
          </SText>
          {loading === 'dashboard' ? (
            <Spinner color={colors.primary} />
          ) : (
            <NumberFormat
              value={parseInt(totalContributionsThisYear, 10)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'\u20A6'}
              renderText={value => (
                <SText size="30px" weight="600" color={colors.dark}>
                  {value}
                </SText>
              )}
            />
          )}
        </Content>
        <Content
          bg="#ffffff"
          shadow
          flex={0.4}
          borderR={10}
          width="90%"
          align="flex-start"
          hpadding={width / 20}
          justify="space-around">
          <SText size="20px" color={colors.dark}>
            Last Contribution
            {lastContribution.period &&
              ` (${formatDate(lastContribution.period)})`}
          </SText>
          {loading === 'dashboard' ? (
            <Spinner color={colors.primary} />
          ) : (
            <NumberFormat
              value={
                parseInt(lastContribution.ee, 10) +
                parseInt(lastContribution.er, 10)
              }
              displayType={'text'}
              thousandSeparator={true}
              prefix={'\u20A6'}
              renderText={value => (
                <SText size="30px" weight="600" color={colors.dark}>
                  {value}
                </SText>
              )}
            />
          )}
        </Content>
      </Content>
      <Content
        align="flex-start"
        justify="space-around"
        hpadding={width / 20}
        flex={2.5}>
        <SText size="17px" color="#999999">
          Quick Links
        </SText>
        <Content flex={0.5} horizontal justify="space-between">
          <StyledButton
            bg={colors.primary}
            height={height / 20}
            curved
            onPress={() =>
              navigation.navigate('Fund', {
                url: 'https://premiumpension.com/view-history/?id=13',
              })
            }
            width="45%">
            <SText size="20px" color="#ffffff">
              Fund I
            </SText>
          </StyledButton>
          <StyledButton
            bg={colors.primary}
            height={height / 20}
            curved
            onPress={() =>
              navigation.navigate('Fund', {
                url: 'https://premiumpension.com/view-history/?id=13',
              })
            }
            width="45%">
            <SText size="20px" color="#ffffff">
              Fund II
            </SText>
          </StyledButton>
        </Content>
        <Content flex={0.5} horizontal justify="space-between">
          <StyledButton
            bg={colors.primary}
            height={height / 20}
            curved
            onPress={() =>
              navigation.navigate('Fund', {
                url: 'https://premiumpension.com/view-history/?id=14',
              })
            }
            width="45%">
            <SText size="20px" color="#ffffff">
              Fund III
            </SText>
          </StyledButton>
          <StyledButton
            bg={colors.primary}
            height={height / 20}
            curved
            onPress={() =>
              navigation.navigate('Fund', {
                url: 'https://premiumpension.com/view-history/?id=2',
              })
            }
            width="45%">
            <SText size="20px" color="#ffffff">
              Fund IV
            </SText>
          </StyledButton>
        </Content>
      </Content>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Home);
