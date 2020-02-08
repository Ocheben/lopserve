import React, {useState, useEffect} from 'react';
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
import {Spinner, Item, Picker, Icon, CheckBox, Body} from 'native-base';

const {height, width} = Dimensions.get('window');
const logo = require('../../assets/img/logo.png');

const Home = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const [cylinder, setCylinder] = useState('');
  const [buyCylinder, setBuyCylinder] = useState(false);
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
      <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
      <Content
        width="100%"
        bg={colors.primary}
        flex={4}
        // blRadius={20}
        // brRadius={20}
      />
      <Content align="flex-start" width="80%" flex={4}>
        <Content align="flex-start">
          <SText color="#444444" align="left" size="15px">
            Refill your Gas
          </SText>
        </Content>
        <Item picker>
          {/* <Label>Preferred Response</Label> */}
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select Cylinder"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={cylinder}
            onValueChange={value => setCylinder(value)}>
            <Picker.Item label="Select Cylinder" value={null} />
            <Picker.Item label="4kg" value="4" />
            <Picker.Item label="8kg" value="8" />
            <Picker.Item label="12kg" value="12" />
          </Picker>
        </Item>
        <Content horizontal justify="center">
          <CheckBox
            checked={buyCylinder}
            onPress={() => setBuyCylinder(prev => !prev)}
            color={colors.primary}
          />
          <SText color="#444444" size="18px" hmargin={20}>
            Buy Cylinder
          </SText>
        </Content>
      </Content>
      <Content justify="flex-end" flex={2.5}>
        <StyledButton
          bg={colors.primary}
          width="100%"
          onPress={() =>
            navigation.navigate('RequestGas', {cylinderSize: cylinder})
          }>
          <SText size="20px" color="#ffffff">
            Next
          </SText>
        </StyledButton>
      </Content>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Home);
