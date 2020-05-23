import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, Dimensions, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Content,
  SText,
  StyledButton,
  SNInput,
  LogoImg,
  colors,
} from '../../Components/styledComponents';
import {Item, Input, Icon, Label, Toast, Spinner} from 'native-base';
import {PersonIcon, LockIcon} from '../../Components/icons';
import {APIS, request, toastDefault, requestJwt} from '../../_services';

const {height, width} = Dimensions.get('window');
const avatar = require('../../assets/img/avatar.png');

const ChangePassword = props => {
  const {navigation, userData, userInfo} = props;
  const {token} = userInfo;
  const {
    dashboard: {
      user: {email},
    },
  } = userData;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // useEffect(() => {
  //   getToken();
  // }, []);

  const handleSubmit = async () => {
    if (confirmPassword !== newPassword || confirmPassword === '') {
      Toast.show({
        ...toastDefault,
        text: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }
    const {
      baseUrl,
      changePassword: {method, path},
    } = APIS;
    const submitUrl = `${path}`;

    setLoading(true);
    const data = {
      password: password,
      newpassword: confirmPassword,
    };
    const response = await requestJwt(method, path, data, token);
    console.log(response, method, submitUrl, data);
    if (response.meta && response.meta.status === 200) {
      Toast.show({
        ...toastDefault,
        text: 'You have successfully changed your Password',
        type: 'success',
      });
      setLoading(false);
    } else {
      Toast.show({
        ...toastDefault,
        text: response.message || 'Unable to change password',
        type: 'danger',
      });
    }
    setLoading(false);
  };
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}>
      <View>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Content width="90%" vmargin={10} flex={0} align="center">
            <Item>
              <LockIcon color={colors.primary} size={30} />
              <SNInput
                floatingLabel
                placeholder="Old Password"
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>
          </Content>
          <Content width="90%" vmargin={10} flex={0} align="center">
            <Item>
              <LockIcon color={colors.primary} size={30} />
              <SNInput
                floatingLabel
                placeholder="New Password"
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
            </Item>
          </Content>
          <Content width="90%" vmargin={10} flex={0} align="center">
            <Item>
              <LockIcon color={colors.primary} size={30} />
              <SNInput
                floatingLabel
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
            </Item>
          </Content>
          <Content width="90%" vmargin={30} flex={0} justify="center">
            <StyledButton
              bg={colors.primary}
              curved
              shadow
              width="90%"
              onPress={handleSubmit}
              disabled={newPassword === '' || newPassword !== confirmPassword}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="20px" color="#ffffff">
                  Change Password
                </SText>
              )}
            </StyledButton>
          </Content>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(ChangePassword);
