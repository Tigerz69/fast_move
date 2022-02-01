import { Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    
}
from 'react-native';
import { connect } from 'react-redux';

class AddDetails extends Component{
    constructor(props){
        super(props);
          this.state = {
            
          };
        }
        check=()=>{

        }


        render(props){

        
        return(
            <View>
                <Text>หน้าเพิ่มรายละเอียด</Text>
                <Text></Text>
            </View>
        );
        }
}

const mapStateToProps = (state) => (
    {orderList:state.orderReducer.orderList}
  )
  
  const mapDispatchToProps = (dispatch)=>{
    return{
      addRegion:(item)=>dispatch(addRegion(item)),
      deleteRegion:(item)=>dispatch(deleteRegion(item))
    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps) (AddDetails)  