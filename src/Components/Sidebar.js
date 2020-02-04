/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, Dimensions, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {onSignOut} from '../_services';
import {BlockView, SText, LogoImg, colors, Content} from './styledComponents';
import {
  DashboardIcon,
  ContributionIcon,
  RequestIcon,
  EnquiryIcon,
  PersonIcon,
  CalculatorIcon,
  LocationIcon,
  LogoutIcon,
} from './icons';

const avatar = require('../assets/img/avatar.png');

const {height, width} = Dimensions.get('window');

const Sidebar = props => {
  // const [userInfo, setUserInfo] = useState({});
  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await AsyncStorage.getItem('user');
  //     setUserInfo(JSON.parse(user).user);
  //   };
  //   getUser();
  // }, []);
  const {navigation, userData} = props;
  const {
    dashboard: {
      user: {name},
    },
  } = userData;
  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };
  return (
    <View style={{backgroundColor: colors.primary, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: height * 0.1,
          marginBottom: height * 0.05,
          marginLeft: width / 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: width * 0.075,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}>
          <LogoImg
            source={avatar}
            width={width * 0.15}
            height={width * 0.15}
            resizeMode="contain"
          />
        </View>
        <BlockView hmargin={width / 30}>
          <SText color="#ffffff" size="27px" weight="600">
            {name}
          </SText>
        </BlockView>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <DashboardIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Dashboard
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Contribution')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <ContributionIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Contributions
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <RequestIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Requests
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Enquiry')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <EnquiryIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Enquiries
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <PersonIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Profile
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Pencalc')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <CalculatorIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Pension Calculator
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Locations')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <LocationIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Office Locations
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <LogoutIcon
                size="30px"
                color="#ffffff"
                style={{marginRight: 10}}
              />
              <SText color="#ffffff" size="22px" fontWeight="400">
                Logout
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Sidebar);
