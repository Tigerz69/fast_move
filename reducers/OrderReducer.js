
import {SAVE_ORDER,EDIT_MORE_ORDER,ADD_DIST_DURA_PRICE_TO_ORDER} from '../actions/Types'

const intialState = {
 order:{},
 orderList:[]
}

let order_number =0;

const orderReducer=(state = intialState,action)=>{

   switch(action.type){
   
     case SAVE_ORDER:
         console.log('come save_order')
         const order_number2=++order_number;
      return{
        
          ...state,order:{
            id:order_number2,
            getTime: action.getTime,
            wayPointList:action.wayPointList,
            details:'',
            phone:'',
            price:0
          }
        }
    case EDIT_MORE_ORDER:
      let ordercopie = JSON.parse(JSON.stringify(state.order));

      order ={id:ordercopie.id,getTime:ordercopie.getTime,wayPointList:ordercopie.wayPointList
         ,details:action.lastDetails,phone
         :action.customerPhone,price:action.price}
       return{
        ...state,order:order
       }
    case ADD_DIST_DURA_PRICE_TO_ORDER:
      let ordercopie = JSON.parse(JSON.stringify(state.order));
      
      order ={id:ordercopie.id,getTime:ordercopie.getTime,wayPointList:ordercopie.wayPointList
        ,details:ordercopie.details,phone
        :ordercopie.phone,price:action.price,distance:action.distance,duration:action.duration}
      return{
          ...state,order:order
        }
     default:
      return state
      
   }
   
 }

 export default orderReducer