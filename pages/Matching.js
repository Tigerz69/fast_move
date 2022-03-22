//Matching.js
import {View,Text,StyleSheet,ScrollView} from 'react-native';
import React,{Component} from "react";
import Marker from 'react-native-maps';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';
import { Dimensions } from 'react-native-web';
import firebase from "../Firebase/Initial";
import 'firebase/firestore';


class Matching extends Component{
    constructor(props){
        super(props);
        this.db = firebase.firestore()
        this.state = {
            loading:false,

        };
         
    }
    componentDidMount=()=>{
        this.db.collection("orders").where("id", "==", this.props.order.id)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().status=="matched")
            {
                console.log('driver id:' ,doc.data().driverID)
            }
        });
        
    });
    }



    render(){
        console.log('order from matching',this.props.order)
        let order = this.props.order
        let num = this.props.order.gnome.length
        let markerArr=[]
        console.log(num)
        console.log(order.wayPointList[0].region)
        for(let i=0 ;i<num;i++)
        {
            markerArr.push(
                <MapView.Marker 
                    key={`${order.wayPointList[i].id}`}
                    coordinate={{latitude:order.wayPointList[i].region.latitude,
                                 longitude:order.wayPointList[i].region.longitude}}
                    title={`จุดที่ ${i+1} `}
                      
                      
                />
            )
        }

        return(
            <View style={styles.container}>
                
                    
                    <MapView  style={styles.map} 
                        region={order.wayPointList[0].region}
                    >
                            {markerArr}
                        
                    </MapView>
                    <View style={{ position: 'absolute', top: 50, left: 0 ,right:0,alignItems: 'center',}}>
                        <Text>กำลังค้นหาคนขับ</Text>
                    </View>
                   
                
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 100,
      left: 0,
      right: 0,
      bottom: 100,
    },
  });

  const mapStateToProps = (state) => (
    {order:state.orderReducer.order}
  )
  
  
  const mapDispatchToProps = (dispatch) => ({});

  export default connect(mapStateToProps,mapDispatchToProps) (Matching)