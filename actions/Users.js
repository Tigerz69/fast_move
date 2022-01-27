import {ADD_USER,ADD_REGION} from './Types'


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
    region:item,
  }
)
