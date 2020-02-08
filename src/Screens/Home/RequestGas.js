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
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {onSignOut} from '../../_services';
import {getContri} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {NextIcon} from '../../Components/icons';
import {RsaIcon} from '../../Components/Vectors';

const {height, width} = Dimensions.get('window');

const RequestGas = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const cylinderSize = navigation.getParam('cylinderSize');
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormInputs(prev => ({...prev, cylinderSize: cylinderSize}));
  }, [cylinderSize]);

  const setGasSize = value => {
    const cost = parseInt(value || 0, 10) * 300;
    setFormInputs(prev => ({...prev, gasSize: value, total: cost.toString()}));
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View>
          <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
          <View style={{alignItems: 'center'}}>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <Item floatingLabel>
                <Label>Gas Cylinder Size (kg)</Label>
                <Input
                  name="current_age"
                  keyboardType="number-pad"
                  value={formInputs.cylinderSize || ''}
                  disabled
                  onChangeText={text =>
                    setFormInputs(prev => ({...prev, cylinderSize: text}))
                  }
                />
              </Item>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="flex-start">
              <SText color="#777777" size="15px">
                Gas
              </SText>
              <Item>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: undefined}}
                  placeholder="Select Cylinder"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={formInputs.gasSize || null}
                  onValueChange={value => setGasSize(value)}>
                  <Picker.Item label="Select Gas" value={null} />
                  <Picker.Item label="4kg" value="4" />
                  <Picker.Item label="8kg" value="8" />
                  <Picker.Item label="12kg" value="12" />
                </Picker>
              </Item>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <Item floatingLabel>
                <Label>Total</Label>
                <Input
                  name="total"
                  keyboardType="number-pad"
                  value={formInputs.total || ''}
                  disabled
                  onChangeText={text =>
                    setFormInputs(prev => ({...prev, total: text}))
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
                <Label>Pickup Address</Label>
                <Input
                  name="pickupAddress"
                  keyboardType="default"
                  textContentType="fullStreetAddress"
                  value={formInputs.monthly_contribution || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      monthly_contribution: text,
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
                <Label>Delivery Address</Label>
                <Input
                  name="pickupAddress"
                  keyboardType="default"
                  textContentType="fullStreetAddress"
                  value={formInputs.monthly_contribution || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      monthly_contribution: text,
                    }))
                  }
                />
              </Item>
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0} justify="flex-end">
          <StyledButton
            bg={colors.primary}
            width="100%"
            // onPress={() => submit()}
          >
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" color="#ffffff">
                Confirm
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

export default connect(mapStateToProps)(RequestGas);
