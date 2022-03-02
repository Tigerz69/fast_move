import {Modal, 
    Dimensions, TouchablewithoutFeedback,
    StyleSheet, View, Text} from 'react-native'
import React from 'react'

const deviceHeight = Dimensions.get("window").height

export default class BottomPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state=
        {
            show: false
        }
            
    }
    show = () => {
        this.setState({show: true})
    }
    close = () => {
        this.setState({show: false})
    }
    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: '100%'}}/>
        if (!onTouch) return view
        return (
            <TouchablewithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </TouchablewithoutFeedback>
        )
    }
    renderTitle = () => {
        const { title } = this.props
        return (
            <View>
                <Text style={{
                    color: '#182E44',
                    fontSize: 20,
                    fontWeight: '500',
                    margin: 15
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        
        return (
            <View style={{flex:1}}>
                <view style={{flex:1}}>
                    <Text style={{
                        color: '#182E44',
                        fontSize: 20,
                        fontWeight: '500',
                        margin: 15
                    }}>
                        ระยะทาง
                    </Text>
                    <Text style={{
                        color: '#182E44',
                        fontSize: 20,
                        fontWeight: '500',
                        margin: 15
                    }}>
                        5 กม.
                    </Text>
                </view>
                <view style={{flex:1}}>

                </view>
                <view style={{flex:1}}>

                </view>
                <view style={{flex:1}}>

                </view>
                <view style={{flex:1}}>

                </view>

                
            </View>
        )
    }


    render() {
        let {show}=this.state
        const {onTouchOutside,title}= this.props
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{flex: 1,backgroundColor: '#000000AA',justifyContent: 'flex-end'}}
                >
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight*0.4
                    }}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </View>

            </Modal>
        )
    }

}