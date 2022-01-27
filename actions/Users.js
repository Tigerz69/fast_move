import {ADD_USER,CREATE_ORDER,ADD_POINT} from './Types'


export const addUser=(item)=>(
  {
    type:ADD_USER,
    id:item.id,
    username:item.username,
    firstname:item.firstname,
    lastname:item.lastname,
    phone:item.phone,
    email:item.email,
    time:item.time
  }
)

export const addOrder=()=>(
  {
    type:CREATE_ORDER,
    
  }
)

export const addPoint=(item)=>(
  {
    type:ADD_POINT,
    //waypointnum:item.waypointnum,
    region:item,
    // secway:item.secway,
    // thirdway:item.thirdway,
    // fourway:item.fourway,
    // fiveway:item.fiveway,
    // sixway:item.sixway,
    // sevenway:item.sevenway,
    // eigthway:item.eigthway,
    // nineway:item.nineway,
    // tenway:item.tenway,
    
  }
)