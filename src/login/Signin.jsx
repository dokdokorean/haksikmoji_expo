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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import SigninHeader from '../components/SigninHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

const data = [
    { label: '연세대학교 미래캠퍼스', value: '1' },
    { label: '강릉원주대학교', value: '2' },
    { label: '한라대학교', value: '3' },
];

const Signin = ({ route, navigation }) => {
    const { signature } = route.params || {};
    const [step, setStep] = useState(0);
    const [univ, setUniv] = useState('');
    const [studentid, setStudentid] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [CertificationCode, setCertificationCode] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [agree, setAgree] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;

    const [isFocus1, setisFocus1] = useState(false);
    const [isFocus2, setisFocus2] = useState(false);

    const handleFocusName = () => {
        setisFocus1(true);
    };

    const handleFocusStudentid = () => {
        setisFocus2(true);
    };

    const handleBlurName = () => {
        setisFocus1(false);
    };

    const handleBlurStudentid = () => {
        setisFocus2(false);
    };

    const handleFocusEmail = () => {
        setisFocus1(true);
    };

    const handleFocusCertificationCode = () => {
        setisFocus2(true);
    };

    const handleBlurEmail = () => {
        setisFocus1(false);
    };

    const handleBlurCertificationCode = () => {
        setisFocus2(false);
    };

    const handleFocusPassword = () => {
        setisFocus1(true);
    };

    const handleFocusPasswordre = () => {
        setisFocus2(true);
    };

    const handleBlurPassword = () => {
        setisFocus1(false);
    };

    const handleBlurPasswordre = () => {
        setisFocus2(false);
    };

    const clearName = () => {
        setName('');
    };

    const clearSudentid = () => {
        setStudentid('');
    };

    const renderUniversitySelection = () => (
        <View style={[styles.selectionContainer, isFocus1 && { borderColor: '#fff', borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }]}>
            <View style={styles.innerContainer}>
                <Dropdown
                    style={[styles.dropdown, isFocus1 && { borderColor: '#111111', height: 56, top: -10, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={{marginLeft:16}}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'학교를 선택해 주세요'}
                    value={univ}
                    onFocus={() => setisFocus1(true)}
                    onBlur={() => setisFocus1(false)}
                    onChange={item => {
                        setUniv(item.value);
                        setisFocus1(false);
                    }}
                    containerStyle={styles.dropdowncontainer}
                    renderRightIcon={() => (
                        <AntDesign
                            style={{
                                transform: [{ rotate: isFocus1 ? '180deg' : '0deg' }], marginRight: 16
                            }}
                            color={'#111111'}
                            name="down"
                            size={15}
                        />
                    )}
                />
            </View>
        </View>
    );
    const renderStudentIdName = () => (
        <View>
            <View style={[styles.inputcomponent, isFocus1 && { borderColor: '#111111' }]}>
                <View style={styles.innercomponenet}>
                    <View style={styles.inputcomponenttextcontainer}>
                        <Text style={styles.inputcomponenttext}>이름</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="이름을 입력해주세요"
                            value={name}
                            onChangeText={setName}
                            onFocus={handleFocusName}
                            onBlur={handleBlurName}
                        />
                        {name.length > 0 && (
                            <TouchableOpacity onPress={clearName} style={styles.clearButton}>
                                <Image style={{ resizeMode: 'contain', width: 14, height: 14 }} source={require('../assets/inputcomponenteraseall.png')} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            <View style={[styles.inputcomponent, isFocus2 && { borderColor: '#111111' }]}>
                <View style={styles.innercomponenet}>
                    <View style={styles.inputcomponenttextcontainer}>
                        <Text style={styles.inputcomponenttext}>학번</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="학번을 입력해주세요"
                            value={studentid}
                            onChangeText={setStudentid}
                            onFocus={handleFocusStudentid}
                            onBlur={handleBlurStudentid}
                        />
                        {studentid.length > 0 && (
                            <TouchableOpacity onPress={clearSudentid} style={styles.clearButton}>
                                <Image style={{ resizeMode: 'contain', width: 14, height: 14 }} source={require('../assets/inputcomponenteraseall.png')} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            <Text style={{ color: '#DC0000', marginLeft: 10 }}>이름 혹은 학번이 일치하지 않아요.</Text>
        </View>
    );

    const renderEmailInput = () => (
        <View>
            <View style={[styles.inputcomponent, isFocus1 && { borderColor: '#111111' }]}>
                <View style={styles.innercomponenet}>
                    <View style={styles.inputcomponenttextcontainer}>
                        <Text style={styles.inputcomponenttext}>이메일</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.input, { width: 185 }]}
                                placeholder="이메일을 입력해주세요"
                                value={Email}
                                onChangeText={setEmail}
                                onFocus={handleFocusEmail}
                                onBlur={handleBlurEmail}
                            />
                            <Text style={[styles.input, { position: 'absolute', right: 0, color: '#999999' }]}>@yonsei.ac.kr</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
    const renderEmailCertification = () => (
        <View>
            <View style={[styles.inputcomponent, isFocus1 && { borderColor: '#111111' }]}>
                <View style={[styles.innercomponenet,{justifyContent:'center'}]}>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={[styles.input, { height: 36 }]}
                            placeholder="이메일을 입력해주세요"
                            value={Email + '@yonsei.ac.kr'}
                            onChangeText={setEmail}
                            editable={false}
                            onFocus={handleFocusEmail}
                            onBlur={handleBlurEmail}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.inputcomponent, isFocus2 && { borderColor: '#111111' }]}>
                <View style={styles.innercomponenet}>
                    <View style={styles.inputcomponenttextcontainer}>
                        <Text style={styles.inputcomponenttext}>인증 코드</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="인증 코드를 입력해주세요"
                            value={CertificationCode}
                            onChangeText={setCertificationCode}
                            onFocus={handleFocusCertificationCode}
                            onBlur={handleBlurCertificationCode}
                        />
                    </View>
                </View>
            </View>
            <Text style={{ color: '#DC0000', marginLeft: 10, marginBottom: 30 }}>인증 코드가 올바르지 않아요.</Text>
            <TouchableOpacity style={{ marginLeft: 10, fontWeight: 'medium' }}>
                <Text style={{ textDecorationColor: '#888888', textDecorationLine: 'underline', fontWeight: '600' }}>인증 코드 재전송</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPasswordSetup = () => (
        <View>
            <View style={[styles.inputcomponent, isFocus1 && { borderColor: '#111111' }]}>
                <View style={styles.innercomponenet}>
                    <View style={styles.inputcomponenttextcontainer}>
                        <Text style={styles.inputcomponenttext}>비밀번호</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            onFocus={handleFocusPassword}
                            onBlur={handleBlurPassword}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.inputcomponent, isFocus2 && { borderColor: '#111111' }]}>
                <View style={styles.innercomponenet}>
                    <View style={styles.inputcomponenttextcontainer}>
                        <Text style={styles.inputcomponenttext}>비밀번호 재입력</Text>
                    </View>
                    <View style={styles.textinputcontainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호를 재입력해주세요"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setPasswordMatch(text === password);
                            }}
                            onFocus={handleFocusPasswordre}
                            onBlur={handleBlurPasswordre}
                            secureTextEntry
                        />
                    </View>
                </View>
            </View>
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
                        source={{ uri: signature }}
                        style={{
                            width: 300, height: 300, resizeMode: 'contain', transform: [{ rotate: '-90deg' }],
                        }}
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
        { title: "학교를 선택해 주세요", ment: "당신의 학교에 맞는 맞춤형 정보를\n제공해 드릴게요", component: renderUniversitySelection },
        { title: "이름과 학번을 알려주세요", ment: "당신의 학교에 맞는 맞춤형 정보를\n제공해 드릴게요", component: renderStudentIdName },
        { title: "이메일을 입력해주세요", ment: "학교에서 제공하는 이메일 계정만\n아이디로 사용할 수 있어요", component: renderEmailInput },
        { title: "이메일 계정 인증", ment: "계정확인을 위해 아래 이메일로\n보내드린 인증코드를 입력해주세요", component: renderEmailCertification },
        { title: "비밀번호를 입력해주세요", ment: "학교에 맞는 맞춤형 정보를\n제공해 드릴게요", component: renderPasswordSetup },
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
        (step === 0 && (univ === '')) ||
        (step === 1 && (name === '' || studentid === '')) ||
        (step === 2 && (Email === '')) ||
        (step === 3 && (CertificationCode === '')) ||
        (step === 4 && (!passwordMatch || password === '' || confirmPassword === '')) ||
        (step === 5 && !agree);

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
    button: {
        height: 50,
        backgroundColor: '#F4310B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 34,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(244, 49, 11, 0.2)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
    checkboxContainer: {
        marginVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    checkboxTick: {
        width: 14,
        height: 14,
        backgroundColor: '#84A2BB',
    },
    clearButton: {
        position: 'absolute',
        right: 0,
        bottom: 6
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 30,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#fff',
        marginHorizontal: 0,
        marginVertical: 10,
        height: 36,
        borderRadius: 12
    },
    dropdowncontainer: {
        borderWidth: 1,
        marginTop: -3,
        paddingBottom: 8,
        marginHorizontal: 0,
        borderColor: '#111111',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 10
    },
    input: {
        fontSize: 18,
    },
    inputcomponent: {
        borderWidth: 1,
        borderColor: '#E5E5EC',
        borderRadius: 12,
        marginBottom: 12
    },
    inputcomponenttext: {
        fontSize: 12,
        color: '#767676',
    },
    inputcomponenttextcontainer: {
        marginBottom: 8,
        height: 20,
        justifyContent: 'center',  // 수직 가운데 정렬
    },
    innercomponenet: {
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 10,
        height: 48,
    },
    placeholderStyle: {
        fontSize: 18,
        marginLeft: 16,
        color: '#C7C7C7'
    },
    picker: {
        width: '100%',
        height: 200,
    },
    progressBar: {
        height: 2,
        backgroundColor: '#F4310B',
    },
    progressBarContainer: {
        height: 2,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 20,
        top: Platform.OS === 'ios' ? 0 : -35,
    },
    selectionContainer: {
        borderWidth: 1,
        borderColor: '#E5E5EC',
        borderRadius: 12
    },
    signatureContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    signatureText: {
        fontSize: 18,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 30,
        color: '#999999',
        fontWeight: 'medium'
    },
    successText: {
        color: '#04B014',
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 10,
        marginLeft: 10

    },
    textinputcontainer: {
        height: 20,
        justifyContent: 'center',
        bottom: 1
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 16,
    },
});

export default Signin;
