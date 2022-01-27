import {ADD_POINT,} from '../actions/Types'

const intialState = {
 pointList:[
   {id:1,region:[lat=150,lng=20,latDelta=0.015,lngDelta=0.020]}
 ]
  
 
}



const locationReducer=(state = intialState,action)=>{
   switch(action.type){
     case ADD_POINT:
      return{
        ...state,pointList:[...state.pointList,{id:Math.random(),region:action.region}]
      }
    
    default:
      return state
   }
 }

 export default locationReducer