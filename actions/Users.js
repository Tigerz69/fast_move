import {ADD_USER,ADD_REGION,EDIT_REGION,DELETE_REGION,
  SAVE_ORDER,
  EDIT_MORE_ORDER} from './Types'


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

export const addRegion=(item)=>(
  {
    type:ADD_REGION,
    region:item.region,
    address:item.address,
    phonenumber:item.phonenumber,
    details:item.details
  }
)

export const editRegion=(item)=>(
  {
    type:EDIT_REGION,
    region:item.region,
    address:item.address,
    index:item.index,
    phonenumber:item.phonenumber,
    details:item.details
  }
)

export const deleteRegion=(item)=>(
  {
    type:DELETE_REGION,
    index:item.index,
  }
)

export const saveOrder=(item)=>(
  {
    type:SAVE_ORDER,
    id:item.id,
    getTime:item.getTime,
    wayPointList:item.wayPointList,
    details:item.details,
    phone:item.phone,
    price:item.price
    
  }
)

export const editMoreOrder=(item)=>(
  {
    type:EDIT_MORE_ORDER,
    lastDetails:item.details,
    customerPhone:item.phone,
    price:item.price
  }
)

