import React from 'react';
import {
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import Colors from '../utils/Colors';

class PostalCodeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.data.code, 
            setCode: props.data.setCode, 
            width: props.data.width, 
            marginTop: props.data.marginTop, 
            marginBottom: props.data.marginBottom,
            type: props.data.type,
            placeholder: props.data.placeholder,
            setRef: props.data.setRef
        };
    }
    
    clean(str) {
        let valid = '0123456789-';
        let cleaned = '', curr;
        for (let i = 0; i < str.length; i++) {
            curr = str[i];
            if (curr === '-' && i != this.state.type[0] || !valid.includes(curr))
                continue;
            else
                cleaned += curr;
        }
        return cleaned;
    }

    render() {
        return (
            <TextInput
                style={
                    [
                        styles.textInput,
                        {
                            marginTop: this.state.marginTop / 100 * Dimensions.get('window').height,
                            marginBottom: this.state.marginBottom / 100 * Dimensions.get('window').height,
                            width: this.state.width / 100 * Dimensions.get('window').width
                        }
                    ]
                }
                ref={e => this.state.setRef(e)}
                placeholder={this.state.placeholder}
                defaultValue={this.state.code}
                keyboardType='numeric'
                onChangeText={text => {
                        let changedText = this.clean(text);
                        let textLength = changedText.length;
                        let codeLength = this.state.code.length;
                        if (textLength === this.state.type[0]) {
                            if (textLength < codeLength) // Deleting...
                                changedText = changedText.slice(0, changedText.length - 1);
                            else  // Typing in...
                                changedText += '-';
                        } else if (textLength === this.state.type[0] + 1) {
                            if (textLength < codeLength)
                                changedText = changedText.slice(0, changedText.length - 1);
                            else
                                changedText = changedText.slice(0, changedText.length - 1) + '-' + changedText[changedText.length - 1];
                        }
                        this.setState({code: changedText});
                        this.state.setCode(changedText);
                    }
                }
                maxLength={this.state.type[0] + this.state.type[1] + 1}
            />
        );
    }
}; 

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