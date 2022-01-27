import {ADD_REGION,} from '../actions/Types'

const intialState = {
 point:{
    id:0,
    region:{lat:150,lng:20}
 }
}



const locationReducer=(state = intialState,action)=>{
   switch(action.type){
     case ADD_REGION:
      return{
        ...state,point:{
          id:Math.floor(Math.random() * 10),
          region:action.region,
          
        }
      }
    default:
      return state
   }
 }

 export default locationReducer