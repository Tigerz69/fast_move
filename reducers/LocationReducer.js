import {ADD_REGION,} from '../actions/Types'

const intialState = {
 pointList:[{
    id:0,
    region:{lat:150,lng:20},
    details:'details'
 }]
}



const locationReducer=(state = intialState,action)=>{
   switch(action.type){
     case ADD_REGION:
         console.log('come')
      return{
        ...state,pointList:[...state.pointList,{id:Math.floor(Math.random() * 10),region:action.region}]
        }
      
    default:
      return state
   }
 }

 export default locationReducer