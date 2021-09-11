import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react'
import { Button, StyleSheet, View, TextInput } from 'react-native';
import { Text } from '../components/Themed';
import { register } from '../gun/user';
import { RootStackParamList } from '../types';

interface RegisterScreenProps {
    navigation: NavigationProp
}

interface RegisterFormValues {
    email: string
    username: string
    password: string
}

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
type NavigationProp = Props['navigation'];

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const { navigate } = navigation

    const initialValues: RegisterFormValues = {
        email: '',
        username: '',
        password: ''
    }

    const onSubmit = (values: any, actions: any) => {
        register({ email: values.email, password: values.password, username: values.username })
        navigate('Root')
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {
                ({ handleSubmit, values, handleChange, handleBlur }) => (
                    <View style={styles.FormContainer}>
                        <View>
                            <Text style={styles.title}>Email:</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.Input}
                            />
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
                                <Button onPress={() => handleSubmit()} title='Submit' color='gray' />
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