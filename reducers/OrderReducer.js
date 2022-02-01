import {SAVE_ORDER,} from '../actions/Types'

const intialState = {
 orderList:[]
 
}

let order_number =0;

const orderReducer=(state = intialState,action)=>{

   switch(action.type){
   
     case SAVE_ORDER:
         console.log('come save_order',this.orderList)
         const order_number2=++order_number;
      return{
        ...state,orderList:[...state.orderList,{
            id:order_number2,
            getTime: action.getTime,
            wayPointList:action.wayPointList,
            details:'',
            phone:'',
            price:0}]
          
        }
     default:
      return state
      
   }
   
 }

 export default orderReducer