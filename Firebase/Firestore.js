import firebase from "./Initial";
import 'firebase/firestore';

class Firestore{
 constructor() {
   this.db = firebase.firestore();
   
  }
  
  addUser=(id,item,success,unsuccess)=>{
    item.time = firebase.firestore.FieldValue.serverTimestamp();

    item.role = "customer"
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

  saveOrder=(item,success,unsuccess)=>{ 
    item.time = firebase.firestore.FieldValue.serverTimestamp();
    
    var orderRef = this.db.collection("orders");
    var query = orderRef.orderBy("time","desc").limit(1)
    query.get()
    .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              item.id = doc.data().id+1
              console.log(item)
              this.db
              .collection('orders')
              .add(item)  
              .then(success())
              .catch(function (error) { 
                unsuccess(error);
              });
          });
            
          
          
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    
  }

}

const firestore = new Firestore()
export default firestore
