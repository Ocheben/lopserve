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
import {messageListener} from '../../_services/firebase';
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
import {Advert} from '../../Components/Components';

const {height, width} = Dimensions.get('window');
const ad = require('../../assets/img/ad.jpg');

const Home = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const [cylinder, setCylinder] = useState(null);
  const [buyCylinder, setBuyCylinder] = useState(false);
  const cylinderList = [...Array(51).keys()].slice(1);
  const {
    loading,
    dashboard: {user, totalContributionsThisYear, lastContribution},
  } = userData;
  const {cylinders, token} = userInfo;

  useEffect(() => {
    messageListener(navigation, dispatch, token);
  }, [navigation]);
  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  return (
    <Content bg="#ffffff">
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Content width="100%" bg={colors.primary} flex={4}>
        <Advert img={ad} header="AD" />
      </Content>
      <Content align="flex-start" width="80%" flex={4}>
        <Content align="flex-start">
          <SText color="#444444" align="left" size="15px">
            Refill your Gas
          </SText>
        </Content>
        <Item picker style={{width: '100%'}}>
          {/* <Label>Preferred Response</Label> */}
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: '90%'}}
            placeholder="Select Cylinder"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={cylinder}
            onValueChange={value => setCylinder(value)}>
            <Picker.Item label="Select Cylinder" value={null} />
            {cylinderList.map(item => (
              <Picker.Item label={`${item} Kg`} key={item} value={item} />
            ))}
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
      <Content justify="center" flex={2.5}>
        <StyledButton
          bg={colors.primary}
          curved
          width="80%"
          shadow
          disabled={cylinder === null}
          onPress={() =>
            navigation.navigate('RequestGas', {
              cylinderSize: cylinder,
              buyCylinder,
            })
          }>
          <SText size="20px" weight="700" color="#ffffff">
            NEXT
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
