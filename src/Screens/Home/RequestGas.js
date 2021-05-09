import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NumberFormat from 'react-number-format';
import {WebView} from 'react-native-webview';
import {Icon, Spinner, Item, Picker, Input} from 'native-base';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import MapModal from '../../Components/MapModal';

const {height, width} = Dimensions.get('window');

const serviceFee = 600;
const RequestGas = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {cylinders, unitprice} = userInfo;
  const cylinderSize = navigation.getParam('cylinderSize') || 0;
  const cylinderList = [...Array(Math.floor(cylinderSize) + 1).keys()].splice(
    1,
  );
  const cylinderPicker = [
    ...cylinderList,
    ...(cylinderSize - Math.floor(cylinderSize) !== 0 ? [cylinderSize] : []),
  ];
  // const cylinderList = [...Array(cylinderSize + 1).keys()].splice(1);
  // cylinders.find(e => e.id === navigation.getParam('cylinderSize')).size ||
  // '12';
  const buyCylinder = navigation.getParam('buyCylinder');
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [mapReady, setMapReady] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    setFormInputs(prev => ({...prev, cylinderSize: cylinderSize}));
    setMapReady(true);
  }, [cylinderSize]);

  const setGasSize = value => {
    const cost = parseFloat(value || 0) * parseFloat(unitprice).toFixed(2);
    setFormInputs(prev => ({
      ...prev,
      gasSize: value,
      total: cost.toString(),
    }));
  };

  const onSelectLocation = (selectedLocation, landmark, phone, id) => {
    console.log(selectedLocation, id);
    setFormInputs(prev => ({
      ...prev,
      [`${id}Address`]: selectedLocation.address,
      [`${id}Location`]: selectedLocation.coordinates,
      [`${id}Landmark`]: landmark,
      [`${id}Phone`]: phone,
    }));
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View>
          {/* <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          /> */}
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Content width="90%" vmargin={10} flex={0} align="flex-start">
              <SText color="#777777" size="15px">
                Gas Cylinder Size
              </SText>
              <Item>
                <Input
                  name="current_age"
                  keyboardType="number-pad"
                  value={`${formInputs.cylinderSize} Kg`}
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
              <Item picker style={{width: '100%'}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon />}
                  // iosIcon={<Icon name="arrow-down" type="SimpleLineIcons" />}
                  style={{width: '85%'}}
                  placeholder="Select Cylinder"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={formInputs.gasSize || null}
                  onValueChange={value => setGasSize(value)}>
                  <Picker.Item label="Select Gas" value={null} />
                  {cylinderPicker.map(item => (
                    <Picker.Item label={`${item} Kg`} key={item} value={item} />
                  ))}
                </Picker>
              </Item>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <Item>
                {/* <Label>Total</Label> */}
                {/* <Input
                  name="total"
                  keyboardType="number-pad"
                  value={formInputs.total || ' '}
                  disabled
                  onChangeText={text =>
                    setFormInputs(prev => ({...prev, total: text}))
                  }
                /> */}
                <Content align="flex-start" bmargin={5}>
                  <SText color="#777777" size="15px" bmargin={10}>
                    Total
                  </SText>
                  <NumberFormat
                    value={parseInt(formInputs.total, 10)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'\u20A6'}
                    renderText={value => (
                      <SText color="#333333" bmargin={5} size="18px">
                        {value}
                        {' + '}
                        <NumberFormat
                          value={serviceFee}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'\u20A6'}
                          renderText={value => (
                            <SText color="#333333" bmargin={5} size="18px">
                              {value}
                            </SText>
                          )}
                        />
                        {' (Delivery)'}
                      </SText>
                    )}
                  />
                </Content>
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              {/* <Item floatingLabel>
                <Label>Pickup Address</Label>
                <Input
                  name="pickupAddress"
                  keyboardType="default"
                  textContentType="fullStreetAddress"
                  value={formInputs.pickupAddress || ''}
                  onFocus={() => openLocation()}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      pickupAddress: text,
                    }))
                  }
                />
              </Item> */}
            </Content>
            <Content
              width="90%"
              vmargin={10}
              bmargin={30}
              flex={0}
              justify="flex-start"
              horizontal>
              <MapModal
                selectLocation={onSelectLocation}
                name="Pickup Address"
                id="pickup"
              />
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <MapModal
                selectLocation={onSelectLocation}
                name="Delivery Address"
                id="delivery"
              />
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0} justify="flex-end">
          <StyledButton
            bg={colors.primary}
            width="100%"
            disabled={
              !(parseInt(formInputs.total, 10) > 0) ||
              !formInputs.pickupLocation ||
              !formInputs.deliveryLocation
            }
            onPress={() =>
              navigation.navigate('Pay', {
                inputs: {
                  ...formInputs,
                  total: parseInt(formInputs.total, 10) + serviceFee,
                  buyCylinder,
                },
              })
            }>
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" weight="700" color="#ffffff">
                CONFIRM
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

RequestGas.navigationOptions = () => ({
  tabBarVisible: false,
});

export default connect(mapStateToProps)(RequestGas);
