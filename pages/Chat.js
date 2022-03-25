import React from "react";
import { Platform,KeyboardAvoidingView,SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "../Firebase/Firestore";

export default class Chat extends React.Component {
    state={
        messages:[]
    }
    get user () {
        return {
            _id: firestore.uid,
            name: this.props.navigation.state.params.uid
        }
   }
   componentDidMount() {
    firestore.get(message =>
       this.setState (previous => ({
            messages: GiftedChat.append (previous.messages, message)
        }))
    );
   }


   componentWillUnmount(){
       firestore.off()
   }

    render () {
                              I
        const chat = <GiftedChat messages={this.state.messages} onSend= {firestore.send} user={this.user} />;
            if (Platform.OS === 'android') {
                return (
                    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                        {chat}
                    </KeyboardAvoidingView>
                    )
            }
            return <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    }
}
