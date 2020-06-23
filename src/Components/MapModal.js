import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {Item, Label, Input} from 'native-base';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Content, SText, StyledButton, colors} from './styledComponents';

const {height, width} = Dimensions.get('window');

const MapModal = ({isOpen, closeModal, selectLocation, name, id}) => {
  const [mapReady, setMapReady] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [phone, setPhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [region, setRegion] = useState({
    latitude: 9.0765,
    longitude: 7.3986,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    setMapReady(true);
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    } else {
      requestLocationPermission();
    }
    getUserLocation();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App ACCESS_FINE_LOCATION Permission',
          message:
            'Cool Photo App needs access to your ACCESS_FINE_LOCATION ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the ACCESS_FINE_LOCATION');
      } else {
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let initRegion = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(initRegion);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const setSearch = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        country: 'NG',
        type: 'establishment',
      },
      ['name', 'location', 'address'],
    )
      .then(place => {
        console.log(place);
        setLocation(prev => ({
          ...prev,
          address: `${place.name}, ${place.address}`,
          coordinates: place.location,
        }));
        setRegion(prev => ({
          ...prev,
          latitude: place.location.latitude,
          longitude: place.location.longitude,
        }));
      })
      .catch(error => console.log(error.message));
  };

  const dragMarker = coordinate => {
    setLocation(prev => ({
      ...prev,
      coordinates: coordinate,
    }));
    setRegion(prev => ({
      ...prev,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const onSelectLocation = () => {
    selectLocation(location, landmark, phone, id);
    setMapOpen(false);
  };
  return (
    <>
      <Item>
        <Content align="flex-start" bmargin={5}>
          <TouchableOpacity onPress={() => setMapOpen(true)}>
            <SText
              color="#555555"
              sixe="14px"
              width={width * 0.9}
              numberOfLines={1}>
              {location.address || name}
            </SText>
          </TouchableOpacity>
        </Content>
      </Item>
      <Modal
        animationType="slide"
        transparent={false}
        visible={mapOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={{flexGrow: 1, width: width}}>
          <MapView
            style={{height: height * 0.6, width}}
            showsUserLocation={true}
            // followsUserLocation={true}
            initialRegion={region}
            region={region}
            loadingEnabled>
            {mapReady && (
              <Marker
                draggable
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                onDragEnd={e => dragMarker(e.nativeEvent.coordinate)}
              />
            )}
          </MapView>
          <Content align="center" width="100%">
            <View style={{width: '95%', marginTop: 20}}>
              <Item>
                <Content align="flex-start" bmargin={5}>
                  <TouchableOpacity onPress={() => setSearch()}>
                    <SText
                      color="#555555"
                      sixe="14px"
                      width={width * 0.9}
                      numberOfLines={1}>
                      {location.address || 'Address'}
                    </SText>
                  </TouchableOpacity>
                </Content>
              </Item>
            </View>
            <View style={{width: '95%', marginTop: 10}}>
              <Item floatingLabel>
                {/* <AtIcon color={colors.primary} size={30} /> */}
                <Label>Landmark (optional)</Label>
                <Input
                  placeholder="Landmark (optional)"
                  keyboardType="default"
                  textContentType="addressCity"
                  style={{color: '#444444'}}
                  onChangeText={text => setLandmark(text)}
                  value={landmark}
                />
              </Item>
            </View>
            <View style={{width: '95%', marginTop: 10}}>
              <Item floatingLabel>
                {/* <AtIcon color={colors.primary} size={30} /> */}
                <Label>Phone (optional)</Label>
                <Input
                  placeholder="Phone (optional)"
                  keyboardType="number-pad"
                  textContentType="telephoneNumber"
                  style={{color: '#444444'}}
                  onChangeText={text => setPhone(text)}
                  value={phone}
                />
              </Item>
            </View>
            <Content
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                justifyContent: 'space-between',
              }}>
              <StyledButton
                bg={colors.dark}
                curved
                width="40%"
                height={45}
                onPress={() => setMapOpen(false)}>
                <SText size="16px" weight="700" color="#ffffff">
                  Cancel
                </SText>
              </StyledButton>
              <StyledButton
                curved
                bg={colors.primary}
                width="45%"
                height={45}
                onPress={() => onSelectLocation(location)}>
                <SText size="16px" weight="700" color="#ffffff">
                  Select Location
                </SText>
              </StyledButton>
            </Content>
          </Content>
        </KeyboardAwareScrollView>
      </Modal>
    </>
  );
};

export default MapModal;
