import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WebView} from 'react-native-webview';
import {
  List,
  ListItem,
  Icon,
  Spinner,
  Item,
  Picker,
  Label,
  Input,
  Toast,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {onSignIn} from '../../../_services';
import {
  SText,
  Content,
  LogoImg,
  ContentButton,
  StyledButton,
  colors,
} from '../../../Components/styledComponents';
import {APIS, request, toastDefault} from '../../../_services';
import {signup} from '../../../_store/actions/authActions';

const {height, width} = Dimensions.get('window');
const logo = require('../../../assets/img/logo.png');

const CompleteSignup = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const phone = navigation.getParam('phone');
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('')

  // useEffect(() => {
  //   setFormInputs(prev => ({...prev, cylinderSize: cylinderSize}));
  // }, [cylinderSize]);
  const signIn = async user => {
    await onSignIn(user);
    navigation.navigate('SignedIn');
  };

  const setGasSize = value => {
    const cost = parseInt(value || 0, 10) * 300;
    setFormInputs(prev => ({...prev, gasSize: value, total: cost.toString()}));
  };

  const handleSubmit = async () => {
    // navigation.navigate('SignedIn');
    const {
      baseUrl,
      completeSignup: {method, path},
    } = APIS;
    console.log(path);
    const submitUrl = `${baseUrl}${path}`;
    if (confirmPassword === '' || confirmPassword !== formInputs.password) {
      Toast.show({
        ...toastDefault,
        text: 'Password do not match',
        type: 'danger',
      });
      return;
    }
    setLoading(true);
    const response = await request(method, submitUrl, {...formInputs, phone});
    console.log(response, method, submitUrl, {...formInputs, phone});
    if (response.meta && response.meta.status === 200) {
      Toast.show({
        ...toastDefault,
        text: 'You have successfully signed up',
        type: 'success',
      });
      navigation.navigate('Login');
      // dispatch(signup({...response, isLoggedin: true}));
      // await signIn(JSON.stringify(response));
    } else {
      Toast.show({
        ...toastDefault,
        text: response.meta ? response.meta.message : 'An error occurred',
        type: 'danger',
      });
    }
    setLoading(false);
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Content flex={1}>
              <LogoImg source={logo} width={width * 0.5} resizeMode="contain" />
            </Content>
            <Content flex={1} vmargin={10}>
              <SText color="#444444" size="16px">
                Complete your account information
              </SText>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  name="name"
                  keyboardType="default"
                  textContentType="name"
                  value={formInputs.name || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      name: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  name="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={formInputs.email || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      email: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  name="password"
                  keyboardType="default"
                  textContentType="password"
                  secureTextEntry
                  value={formInputs.password || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      password: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  name="confirmPassword"
                  keyboardType="default"
                  textContentType="password"
                  secureTextEntry
                  value={confirmPassword || ''}
                  onChangeText={text => setConfirmPassword(text)}
                />
              </Item>
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0}>
          <StyledButton
            bg={colors.primary}
            curved
            shadow
            width="90%"
            onPress={() => handleSubmit()}>
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" weight="700" color="#ffffff">
                Sign Up
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

export default connect(mapStateToProps)(CompleteSignup);
