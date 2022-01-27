import firebase from "./Initial";
import 'firebase/firestore';

class Firestore{
 constructor() {
   this.db = firebase.firestore();
  }
  
  addUser=(id,item,success,unsuccess)=>{
    item.time = firebase.firestore.FieldValue.serverTimestamp();

    item.role = 0
    item.profileimage= ''
    item.status = 1
    item.carid = ''

    console.log(item)
    
    this.db
      .collection('users')
      .doc(id)
      .set(item)
      .then(success())
      .catch(function (error) {
        unsuccess(error);
      });
  }

  getUser=(id,success,unsuccess)=>{
    var docRef = this.db.collection('users').doc(id);
    docRef
    .get()
    .then((doc)=>{
      success(doc.data())
    })
    .catch((error)=>{
      unsuccess(error)
    })

  }

}

const firestore = new Firestore()
export default firestore
