import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react'
import { Button, StyleSheet, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from '../components/Themed';
import { getUsername, login, user } from '../gun/user';
import { setUserData } from '../redux/actions';
import { AppDispatch } from '../redux/store';
import { RootStackParamList } from '../types';

interface LoginScreenProps {
    navigation: NavigationProp
}

interface LoginFormValues {
    username: string
    password: string
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type NavigationProp = Props['navigation'];

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const { navigate } = navigation
    const dispatch: AppDispatch = useDispatch()

    const initialValues: LoginFormValues = {
        username: '',
        password: ''
    }

    const onSubmit = (values: any, actions: any) => {
        if (
            login({ password: values.password, username: values.username })
        ) {
            dispatch(setUserData(getUsername()))
            navigate('Root')
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {
                ({ handleSubmit, values, handleChange, handleBlur }) => (
                    <View style={styles.FormContainer}>
                        <View>
                            <Text style={styles.title}>Username:</Text>
                            <TextInput
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                style={styles.Input}
                            />
                            <Text style={styles.title}>Password:</Text>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.Input}
                                secureTextEntry
                            />
                            <View style={styles.btn}>
                                <Button onPress={() => handleSubmit()} title='Login' color='gray' />
                            </View>
                        </View>
                    </View>
                )
            }
        </Formik >
    )
}

const styles = StyleSheet.create({
    Input: {
        fontSize: 20,
        borderBottomColor: '#ffff',
        borderBottomWidth: 1,
        marginBottom: 10,
        fontFamily: "Segoe UI",
        color: '#ffff'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: "Segoe UI",
        marginBottom: 10,
    },
    FormContainer: {
        width: '90%',
        margin: 'auto'
    },
    btn: {
        marginTop: 20,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})