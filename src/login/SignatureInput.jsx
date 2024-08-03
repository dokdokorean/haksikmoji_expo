import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useNavigation } from '@react-navigation/native';

const SignatureInput = () => {
  const ref = useRef(null);
  const navigation = useNavigation();

const handleSignature = signature => {
  console.log('Signature:', signature); // base64 코드 출력
  const base64Image = `data:image/png;base64,${signature}`;
  console.log('Base64 Image:', base64Image); // 전체 base64 코드 확인
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
        <Button title="Clear" onPress={handleClear} />
        <Button title="Save" onPress={handleConfirm} />
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
    margin: 20,
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
