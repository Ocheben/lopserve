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
import RNGooglePlacePicker from 'react-native-google-place-picker';
import RNGooglePlaces from 'react-native-google-places';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
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
import MapModal from '../../Components/MapModal';

const {height, width} = Dimensions.get('window');

const RequestGas = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {cylinders, unitprice} = userInfo;
  const cylinderSize =
    cylinders.find(e => e.id === navigation.getParam('cylinderSize')).size ||
    '12';
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
    const gasSize = cylinders.find(e => e.id === value).size.slice(0, 1);
    console.log(gasSize);
    const cost = parseInt(gasSize || 0, 10) * parseInt(unitprice, 10);
    setFormInputs(prev => ({...prev, gasSize: value, total: cost.toString()}));
  };

  const setPickup = () => {
    // RNGooglePlacePicker.show(response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled GooglePlacePicker');
    //   } else if (response.error) {
    //     console.log('GooglePlacePicker Error: ', response.error);
    //   } else {
    //     setLocation(response);
    //   }
    // });
    RNGooglePlaces.openAutocompleteModal(
      {
        country: 'NG',
        type: 'establishment',
      },
      ['name', 'location', 'address'],
    )
      .then(place => {
        console.log(place);
        setFormInputs(prev => ({
          ...prev,
          pickupAddress: place.address,
          pickupLocation: place.location,
        }));
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  };

  const setDelivery = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        country: 'NG',
        type: 'establishment',
      },
      ['name', 'location', 'address'],
    )
      .then(place => {
        console.log(place);
        setFormInputs(prev => ({
          ...prev,
          deliveryAddress: place.address,
          deliveryLocation: place.location,
        }));
      })
      .catch(error => console.log(error.message));
  };

  const onSelectLocation = (selectedLocation, id) => {
    console.log(selectedLocation, id);
    setFormInputs(prev => ({
      ...prev,
      [`${id}Address`]: selectedLocation.address,
      [`${id}Location`]: selectedLocation.coordinates,
    }));
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Content width="90%" vmargin={10} flex={0} align="flex-start">
              <SText color="#777777" size="15px">
                Gas Cylinder Size
              </SText>
              <Item>
                <Input
                  name="current_age"
                  keyboardType="number-pad"
                  value={formInputs.cylinderSize}
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
                  {cylinders.map(item => (
                    <Picker.Item
                      label={item.size}
                      key={item.id}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </Item>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <Item floatingLabel>
                <Label>Total</Label>
                <Input
                  name="total"
                  keyboardType="number-pad"
                  value={formInputs.total || ' '}
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
            onPress={() => navigation.navigate('Pay', {inputs: formInputs})}>
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

export default connect(mapStateToProps)(RequestGas);
