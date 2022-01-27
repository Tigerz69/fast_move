import {React,Component} from 'react';
import LocationView from "../src/LocationView";
import {View} from "react-native";
import { connect } from 'react-redux';

class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <LocationView
          apiKey={"AIzaSyCfjk1u2VcAvNfK31VMN581MMNePvR2J-k"}
          initialLocation={{
            latitude: 15.870032,
            longitude: 100.992541,
          }}
          
          actionText ={
            'add'
          }
          
          
        />
      </View>
    );
  }
}



export default SelectLocation