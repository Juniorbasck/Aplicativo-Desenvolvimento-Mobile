import React from 'react';
import {
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import Colors from '../utils/Colors';

const PostalCodeInput = (
    { 
        code, 
        setCode, 
        width=43, 
        marginTop=2, 
        marginBottom=2,
        type=[4,3],
        placeholder='postal code',
        setRef=null,
        onSubmitEditing=null,
        blurOnSubmit=true
    }
) => {

    const clean = str => {
        let valid = '0123456789-';
        let cleaned = '', curr;
        for (let i = 0; i < str.length; i++) {
            curr = str[i];
            if (curr === '-' && i != type[0] || !valid.includes(curr))
                continue;
            else
                cleaned += curr;
        }
        return cleaned;
    }

    return (
        <TextInput
            style={
                [
                    styles.textInput,
                    {
                        marginTop: marginTop / 100 * Dimensions.get('window').height,
                        marginBottom: marginBottom / 100 * Dimensions.get('window').height,
                        width: width / 100 * Dimensions.get('window').width
                    }
                ]
            }
            ref={e => setRef(e)}
            placeholder={placeholder}
            defaultValue={code}
            keyboardType='numeric'
            onChangeText={text => {
                    let changedText = clean(text);
                    let textLength = changedText.length;
                    let codeLength = code.length;
                    if (textLength === type[0]) {
                        if (textLength < codeLength) // Deleting...
                            changedText = changedText.slice(0, changedText.length - 1);
                        else  // Typing in...
                            changedText += '-';
                    } else if (textLength === type[0] + 1) {
                        if (textLength < codeLength)
                            changedText = changedText.slice(0, changedText.length - 1);
                        else
                            changedText = changedText.slice(0, changedText.length - 1) + '-' + changedText[changedText.length - 1];
                    }
                    setCode(changedText);
                }
            }
            maxLength={type[0] + type[1] + 1}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
        />
    );
};

// class PostalCodeInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             code: props.code, 
//             setCode: props.setCode, 
//             width: props.width, 
//             marginTop: props.marginTop, 
//             marginBottom: props.marginBottom,
//             type: props.type,
//             placeholder: props.placeholder,
//             setRef: props.setRef,
//             onSubmitEditing: props.onSubmitEditing,
//             blurOnSubmit: props.blurOnSubmit
//         };
//     }
    
//     clean(str) {
//         let valid = '0123456789-';
//         let cleaned = '', curr;
//         for (let i = 0; i < str.length; i++) {
//             curr = str[i];
//             if (curr === '-' && i != this.state.type[0] || !valid.includes(curr))
//                 continue;
//             else
//                 cleaned += curr;
//         }
//         return cleaned;
//     }

//     render() {

//         return (
//             <TextInput
//                 style={
//                     [
//                         styles.textInput,
//                         {
//                             marginTop: this.state.marginTop / 100 * Dimensions.get('window').height,
//                             marginBottom: this.state.marginBottom / 100 * Dimensions.get('window').height,
//                             width: this.state.width / 100 * Dimensions.get('window').width
//                         }
//                     ]
//                 }
//                 ref={e => this.state.setRef(e)}
//                 placeholder={this.state.placeholder}
//                 defaultValue={this.state.code}
//                 keyboardType='numeric'
//                 onChangeText={text => {
//                         let changedText = this.clean(text);
//                         let textLength = changedText.length;
//                         let codeLength = this.state.code.length;
//                         if (textLength === this.state.type[0]) {
//                             if (textLength < codeLength) // Deleting...
//                                 changedText = changedText.slice(0, changedText.length - 1);
//                             else  // Typing in...
//                                 changedText += '-';
//                         } else if (textLength === this.state.type[0] + 1) {
//                             if (textLength < codeLength)
//                                 changedText = changedText.slice(0, changedText.length - 1);
//                             else
//                                 changedText = changedText.slice(0, changedText.length - 1) + '-' + changedText[changedText.length - 1];
//                         }
//                         this.setState({code: changedText});
//                         this.state.setCode(changedText);
//                     }
//                 }
//                 maxLength={this.state.type[0] + this.state.type[1] + 1}
//                 onSubmitEditing={this.state.onSubmitEditing}
//                 blurOnSubmit={this.state.blurOnSubmit}
//             />
//         );
//     }
// }; 

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: '2%',
        marginHorizontal: '2%',
    }
});

export default PostalCodeInput;