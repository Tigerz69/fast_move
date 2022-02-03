import { Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    TextInput
    
}
from 'react-native';
import { connect } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {editMoreOrder} from '../actions/Users';

class AddDetails extends Component{
    constructor(props){
        super(props);
          this.state = {
            details:'',
            phonenumber:'',
            price:100,
            date:'',
            month:'',
            years:'',
            hour:'',
            minute:''
          };
        }
        calculate=()=>{
          let item ={details:this.state.details,
          phone:this.state.phonenumber,price:this.state.price}
          this.props.editMoreOrder(item)
          console.log('order',this.props.order)
          
        }

        componentDidMount=()=>{
          
          var date =JSON.parse(JSON.stringify(this.props.order.getTime.getDate()))
          var month = JSON.parse(JSON.stringify(this.props.order.getTime.getMonth()+1))
          var years = JSON.parse(JSON.stringify(this.props.order.getTime.getFullYear()))
          var hour = JSON.parse(JSON.stringify(this.props.order.getTime.getHours()))
          var minute =JSON.parse(JSON.stringify(this.props.order.getTime.getMinutes()))
          if (hour < 10){
            hour = '0'+hour
          }
          
          if (minute < 10){
            minute = '0'+minute
          } 
          this.setState({date:date})
          this.setState({month:month})
          this.setState({years:years})
          this.setState({hour:hour})
          this.setState({minute:minute})
        }

        render(props){
          const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.Header}>เพิ่มรายละเอียด</Text>
                </View>
                <View style={{paddingLeft:'5%'}}>
                    <Text style={styles.SubHeader}>เวลารับสินค้า</Text>
                    <Text>{this.state.date+'/'+this.state.month+'/'+this.state.years+'  '+this.state.hour+':'+this.state.minute}</Text>
                </View>

               {/*<TouchableOpacity onPress={this.check}> 
                <Text>เช็ค</Text>
                </TouchableOpacity>*/}
                <View style={styles.detailView}>
                <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
                  <TextInput style={styles.detailTextInput} placeholder='กรอกรายละเอียดเพิ่มเติม' 
                  onChangeText={txt=>{this.setState({details:txt})}}></TextInput>
                </View>
                <View style={styles.detailView}>
                <AntDesign name="phone" size={24} color="black" />
                  <TextInput style={styles.detailTextInput} placeholder='เบอร์ติดต่อของลูกค้า' 
                  onChangeText={txt=>{this.setState({phonenumber:txt})}}></TextInput>
                </View>
                {/*<View>
                  <Text>ราคา</Text>
                </View>*/}
                <TouchableOpacity onPress={this.calculate}>
                  <Text>เรียกงานขนส่ง</Text>
                </TouchableOpacity>
            </View>
        );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor:'pink',
    },
      Header : {
        paddingTop:'10%',
        color: "black",
        fontSize:32,
        
        
      },
      SubHeader :{
          paddingTop:'10%',
          color:'black',
          fontSize:20
      },
      detailTextInput:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
      },
      detailView:{
        flexDirection:'row',paddingBottom:'5%',
        width:'90%'  ,paddingLeft:'5%',alignItems:'center',paddingTop:'5%'    }
});

const mapStateToProps = (state) => (
    {order:state.orderReducer.order}
  )
  
  const mapDispatchToProps = (dispatch)=>{
    return{
      editMoreOrder:(item)=>dispatch(editMoreOrder(item)),
      
    }
    
  }
  
  export default connect(mapStateToProps,mapDispatchToProps) (AddDetails)  