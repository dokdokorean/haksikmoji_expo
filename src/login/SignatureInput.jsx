import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useNavigation } from '@react-navigation/native';

const SignatureInput = () => {
  const ref = useRef(null);
  const navigation = useNavigation();

const handleSignature = signature => {
  const base64Image = `${signature}`;
  navigation.navigate('Signin', { signature: base64Image });
};


  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  return (
    <View style={styles.container}>
      <Signature
        ref={ref}
        onOK={handleSignature}
        onEmpty={() => console.log('Empty')}
        descriptionText="Sign"
        clearText="Clear"
        confirmText="Save"
        webStyle={styles.webStyle}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.signaturebutton} title="지우기" onPress={handleClear} />
        <Button style={styles.signaturebutton} title="저장" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position:'absolute',
    left:0,
    top:'50%',
    transform: [{ rotate: '90deg' }],
  },
  signaturebutton:{

  },
  webStyle: `
    .m-signature-pad {
      box-shadow: none; 
      border: none; 
    }
    .m-signature-pad--body {
      border: none;
    }
    .m-signature-pad--footer {
      display: none; 
      margin: 0px;
    }
    body,html {
      width: 100%; height: 100%;
    }
  `,
});

export default SignatureInput;
