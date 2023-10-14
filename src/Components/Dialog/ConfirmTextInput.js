import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import { isEmpty } from 'lodash'

const ConfirmTextInput = props => {

    const [visible, setVisible] = useState(false);
    const [inputText, setInputText] = useState('')

    const showDialog = () => {
        setVisible(true);
    };

    useEffect(() => {
        setInputText(props.value)
    }, [props.value])

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
    };

    return (
        <View>
            <Dialog.Container visible={props.visible}>
                <Dialog.Title>{props.title}</Dialog.Title>
                <Dialog.Description>
                    {props.message}
                </Dialog.Description>
                <Dialog.Input keyboardType={props?.typeNumber ? 'numeric' : 'default'} onChangeText={(text) => setInputText(text)} autoFocus value={inputText} />
                <Dialog.Button label="Huỷ" onPress={props.handleCancel} />
                <Dialog.Button label="Xác nhận" onPress={() => {
                    if (isEmpty(inputText.trim())) return alert('Không được để trống')
                    return props.handleConfirm(inputText)
                }} />
            </Dialog.Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});



export default ConfirmTextInput;