import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Platform, UIManager, 
  TouchableOpacity, Text, ViewPropTypes } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Events from 'react-native-simple-events';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AutoCompleteInput from './AutoCompleteInput';
import { connect } from 'react-redux';
import {addRegion} from '../actions/Users'

const PLACE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.0121 };
const apiKey="AIzaSyCfjk1u2VcAvNfK31VMN581MMNePvR2J-k";
const initialLocation={
            latitude: 15.870032,
            longitude: 100.992541,
          };
          
const actionText 
            ='add';
const markerColor='red';
const debounceDuration =300;
const components=[];
const timeout=15000;

const maximumAge= 'Infinity';
const enableHighAccuracy= true;
class LocationView extends Component {

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    
  }

  componentDidMount() {
    Events.listen('InputBlur', this.constructor.displayName, this._onTextBlur);
    Events.listen('InputFocus', this.constructor.displayName, this._onTextFocus);
    Events.listen('PlaceSelected', this.constructor.displayName, this._onPlaceSelected);
  }

  componentWillUnmount() {
    Events.rm('InputBlur', this.constructor.displayName);
    Events.rm('InputFocus', this.constructor.displayName);
    Events.rm('PlaceSelected', this.constructor.displayName);
  }

  state = {
    inputScale: new Animated.Value(1),
    inFocus: false,
    region: {
      ...DEFAULT_DELTA,
      ...initialLocation,
    },
  };
  
  onLocationSelect=()=>{
    this.props.addRegion(this.state.region)
    this.props.navigation.navigate('DrawerTab')
  }

  _animateInput = () => {
    Animated.timing(this.state.inputScale, {
      toValue: this.state.inFocus ? 1.2 : 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  _onMapRegionChange = region => {
    this._setRegion(region, false);
    if (this.state.inFocus) {
      this._input.blur();
    }
  };

  _onMapRegionChangeComplete = region => {
    this._input.fetchAddressForLocation(region);
  };

  _onTextFocus = () => {
    this.state.inFocus = true;
    this._animateInput();
  };

  _onTextBlur = () => {
    this.state.inFocus = false;
    this._animateInput();
  };

  _setRegion = (region, animate = true) => {
    this.state.region = { ...this.state.region, ...region };
    console.log(this.state.region)
    
    if (animate) this._map.animateToRegion(this.state.region);
  };

  _onPlaceSelected = placeId => {
    this._input.blur();
    axios.get(`${PLACE_DETAIL_URL}?key=${apiKey}&placeid=${placeId}`).then(({ data }) => {
      let region = (({ lat, lng }) => ({ latitude: lat, longitude: lng }))(data.result.geometry.location);
      this._setRegion(region);
      this.setState({placeDetails: data.result});
    });
  };

  _getCurrentLocation = () => {
    //const { timeout, maximumAge, enableHighAccuracy } = this.props;
    let options = {
    timeout: 5000,
    enableHighAccuracy: false,maximumAge: 1000
    }
    Geolocation.getCurrentPosition(
    position => {
    const { latitude, longitude } = position.coords;
    this._setRegion({latitude, longitude});
    },
    error => console.log(error.message),
    options
    );
    };

  render() {
    let { inputScale } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={mapView => (this._map = mapView)}
          style={styles.mapView}
          region={this.state.region}
          showsMyLocationButton={true}
          showsUserLocation={false}
          onPress={({ nativeEvent }) => this._setRegion(nativeEvent.coordinate)}
          onRegionChange={this._onMapRegionChange}
          onRegionChangeComplete={this._onMapRegionChangeComplete}
        />
        <Entypo
          name={'location-pin'}
          size={30}
          color={markerColor}
          style={{ backgroundColor: 'transparent' }}
        />
        <View style={styles.fullWidthContainer}>
          <AutoCompleteInput
            ref={input => (this._input = input)}
            apiKey={apiKey}
            style={[styles.input, { transform: [{ scale: inputScale }] }]}
            debounceDuration={debounceDuration}
            components={components}
          />
        </View>
        {/* <TouchableOpacity
          style={[styles.currentLocBtn, { backgroundColor: markerColor }]}
          onPress={this._getCurrentLocation}
        >
          <MaterialIcons name={'my-location'} color={'white'} size={25} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.actionButton]}
          onPress={() =>{ this.onLocationSelect({...this.state.region, address: this._input.getAddress(), placeDetails: this.state.placeDetails})
          }}
          
        >
          <View>
            
            <Text style={[styles.actionText]}>{actionText}</Text>
          </View>
        </TouchableOpacity>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  fullWidthContainer: {
    position: 'absolute',
    width: '100%',
    top: 80,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 5,
  },
  currentLocBtn: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 70,
    right: 10,
  },
  actionButton: {
    backgroundColor: '#000',
    height: 50,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 23,
  },
});

const mapDispatchToProps = (dispatch)=>(
  {addRegion:(item)=>dispatch(addRegion(item))}
)

const mapStateToProps = state => ({});

export default  connect (mapStateToProps,mapDispatchToProps)  (LocationView)