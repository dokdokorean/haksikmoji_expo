import React, { useState, useRef, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
    Animated,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SigninHeader from '../components/SigninHeader';

const Signin = ({ route, navigation }) => {
    const { signature } = route.params || {};
    const [step, setStep] = useState(0);
    const [univ, setUniv] = useState('');
    const [studentid, setStudentid] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [agree, setAgree] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;
    let SingnatureImage = "";

    const renderUniversitySelection = () => (
        <View style={styles.selectionContainer}>
            <Picker
                selectedValue={univ}
                onValueChange={(itemValue) => setUniv(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="연세대학교 미래캠퍼스" value="연세대학교 미래캠퍼스" />
                <Picker.Item label="한라대학교" value="한라대학교" />
                <Picker.Item label="강릉원주대학교" value="강릉원주대학교" />
            </Picker>
        </View>
    );

    const renderStudentIdName = () => (
        <View>
            <TextInput
                style={styles.input}
                placeholder="이름을 입력해주세요"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="학번을 입력해주세요"
                value={studentid}
                onChangeText={setStudentid}
                keyboardType="numeric"
            />
        </View>
    );

    const renderPasswordSetup = () => (
        <View>
            <Text style={styles.subtitle}>비밀번호를 설정해주세요</Text>
            <TextInput
                style={styles.input}
                placeholder="비밀번호를 설정해주세요"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles.subtitle}>비밀번호를 확인해주세요</Text>
            <TextInput
                style={styles.input}
                placeholder="비밀번호를 확인해주세요"
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    setPasswordMatch(text === password);
                }}
                secureTextEntry
            />
            {!passwordMatch && (
                <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
            )}
            {passwordMatch && confirmPassword !== '' && (
                <Text style={styles.successText}>비밀번호가 일치합니다.</Text>
            )}
        </View>
    );

    const renderDataAgree = () => (
        <View style={styles.agreeContainer}>
            <ScrollView style={styles.agreementScroll}>
                <Text style={styles.agreementText}>
                    1. 목적 {"\n"}
                    - 본 동의서는 학생의 개인정보를 수집, 이용 및 관리하는 데 필요한 동의를 받기 위함입니다. {"\n"}
                    {"\n"}
                    2. 수집 및 이용 목적 {"\n"}
                    수집된 개인정보는 다음과 같은 목적을 위해 사용됩니다: {"\n"}
                    - 교내 정보 접근 권한 확인 {"\n"}
                    - 학교 구성원 여부 확인 {"\n"}
                    - 서비스 도중 발생하는 사용자 신고에 대한 정보 관리 {"\n"}
                    - 교내 쿠폰 발급, 수령을 위한 본인 확인과 사용 여부 확인 {"\n"}
                    {"\n"}
                    3. 수집하는 개인정보 항목 {"\n"}
                    수집하는 개인정보는 다음과 같습니다: {"\n"}
                    - 학번 {"\n"}
                    - 이름 {"\n"}
                    - 비밀번호 {"\n"}
                    - 서명 {"\n"}
                    - 학교정보 (학교명 등) {"\n"}
                    {"\n"}
                    4. 개인정보의 보유 및 이용 기간 {"\n"}
                    수집된 개인정보는 수집 목적이 달성된 후에도 관계 법령에 따라 일정 기간 보관됩니다. 보관 기간은 다음과 같습니다: {"\n"}
                    - 학번, 이름, 비밀번호, 서명, 학교정보: 2년 {"\n"}
                    {"\n"}
                    5. 개인정보의 제3자 제공 {"\n"}
                    수집된 개인정보는 원칙적으로 외부에 제공하지 않습니다. 다만, 법령에 따라 필요한 경우 및 학생의 동의가 있는 경우에 한해 제3자에게 제공할 수 있습니다. {"\n"}
                    {"\n"}
                    6. 개인정보 처리 위탁 {"\n"}
                    개인정보 처리를 외부 업체에 위탁할 경우, 위탁 업무의 내용과 수탁자의 정보는 홈페이지에 게시하거나 개별적으로 통지하여 학생의 동의를 받습니다. {"\n"}
                    {"\n"}
                    7. 학생의 권리 {"\n"}
                    학생은 개인정보 제공에 동의하지 않을 권리가 있습니다. 다만, 동의하지 않을 경우 학식모지 서비스 제공에 제한이 있을 수 있습니다. {"\n"}
                    학생은 언제든지 본인의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다. {"\n"}
                    {"\n"}
                    8. 개인정보의 안전성 확보 조치 {"\n"}
                    학식모지는 학생의 개인정보를 안전하게 처리하기 위해 다음과 같은 조치를 취하고 있습니다: {"\n"}
                    - 개인정보의 암호화 {"\n"}
                    - 개인정보 접근 권한 관리 {"\n"}
                    {"\n"}
                    9. 문의처 {"\n"}
                    개인정보와 관련된 문의는 다음 연락처로 해주시기 바랍니다: {"\n"}
                    - 대표: 배진우 {"\n"}
                    - 이메일: trouvers2123@gmail.com{"\n"}
                    {"\n"}
                    본인은 위 내용을 충분히 이해하였으며, 학식모지가 위와 같이 본인의 개인정보를 수집 및 이용하는 것에 동의합니다. {"\n"}
                    {"\n"}
                    위 동의서를 통해 학생의 개인정보를 안전하게 관리하고, 학우 여러분께 필요한 서비스를 원활하게 제공할 수 있도록 협조 부탁드립니다.

                </Text>
            </ScrollView>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkbox}>
                    {agree && <View style={styles.checkboxTick} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>개인정보 활용에 동의합니다</Text>
            </View>
        </View>
    );

    const renderSignature = () => (
        <View style={styles.signatureContainer}>
            <Text style={styles.signatureText}>서명 부탁해요!</Text>
            <TouchableOpacity
                style={styles.signaturePad}
                onPress={() => navigation.navigate('SignatureInput')}
            >
                {signature ? (
                    <Image
                        source={{uri : signature}}
                        style={{
                            width: 300, height: 300, resizeMode: 'contain', transform: [{ rotate: '-90deg' }],}}
                    />
                ) : (
                    <Text style={styles.signaturePlaceholder}>
                        자신의 서명을 할 수 있는 그림판
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );

    const steps = [
        { title: "자신의 학교를 선택해주세요!", ment: "😄 당신의 학교정보를 제공해줄게요!", component: renderUniversitySelection },
        { title: "본인의 이름과 학번을 입력해주세요!", ment: "🥳 본인인증을 위한 내용입니다!", component: renderStudentIdName },
        { title: "비밀번호를 설정해주세요", ment: "👀 로그인할 때 필요한 내용이니 꼭 기억해주세요!", component: renderPasswordSetup },
        { title: "개인정보 활용에 동의해주세요!", ment: "👀 학우 여러분의 소중한 개인정보를 위한 내용입니다.", component: renderDataAgree },
        { title: "서명 부탁드립니다!", ment: "🍾 학교 기관에서 쿠폰 지급을 위한 서명 파일입니다.", component: renderSignature },
    ];

    const handleNext = async () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
            Animated.timing(progress, {
                toValue: (step + 1) / (steps.length - 1),
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            await saveProfileData();
            navigation.navigate('TabNavigation');
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
            Animated.timing(progress, {
                toValue: (step - 1) / (steps.length - 1),
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            navigation.goBack(); // Go back to previous screen if on first step
        }
    };

    const saveProfileData = async () => {
        // Save profile data logic here
        console.log('Saving profile data...');
    };

    const isNextDisabled =
        (step === 1 && (name === '' || studentid === '')) ||
        (step === 2 && (!passwordMatch || password === '' || confirmPassword === '')) ||
        (step === 3 && !agree);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
                <SigninHeader onBack={handleBack} />
                <View style={styles.progressBarContainer}>
                    <Animated.View style={[styles.progressBar, {
                        width: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        })
                    }]} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{steps[step].title}</Text>
                    <Text style={styles.subtitle}>{steps[step].ment}</Text>
                    {steps[step].component()}
                </View>
                <TouchableOpacity
                    style={[styles.button, isNextDisabled && styles.buttonDisabled]}
                    onPress={handleNext}
                    disabled={isNextDisabled}
                >
                    <Text style={styles.buttonText}>{step < steps.length - 1 ? '다음' : '입력 완료'}</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: '#E0E0E0',
        width: '100%',
        top: Platform.OS === 'ios' ? 0 : -35,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#84A2BB',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    selectionContainer: {
        width: '100%',
        alignItems: 'center',
    },
    picker: {
        width: '100%',
        height: 200,
    },
    input: {
        height: 50,
        width: 300, // 고정 너비 설정
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        height: 50,
        backgroundColor: '#84A2BB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 80,
    },
    buttonDisabled: {
        backgroundColor: '#D3D3D3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        fontSize: 14,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 10,
    },
    agreeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    agreementScroll: {
        width: '100%',
        height: 100, // 스크롤 가능한 영역의 높이 조정
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
    },
    agreementText: {
        fontSize: 14,
        lineHeight: 20,
    },
    checkboxContainer: {
        marginVertical:50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxTick: {
        width: 14,
        height: 14,
        backgroundColor: '#84A2BB',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    signatureContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signatureText: {
        fontSize: 18,
        marginBottom: 20,
    },
    signaturePad: {
        width: 300,
        height: 300,
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signaturePlaceholder: {
        color: '#aaa',
    },
});

export default Signin;
