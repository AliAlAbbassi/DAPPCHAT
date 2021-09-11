import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Text, View } from '../components/Themed';
import { getUsername, logout } from '../gun/user';
import { setUserData } from '../redux/actions';
import { AppDispatch, RootState } from '../redux/store';
import { RootStackParamList } from '../types';

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = NativeStackScreenProps<RootStackParamList, 'Root'> & PropsFromRedux;

function ProfileScreen({ navigation, user }: Props) {
  const { navigate } = navigation
  const dispatch: AppDispatch = useDispatch()

  const isAuth = () => {
    return user.username === '' ? false : true
  }

  console.log('whats up??? username', user.username)
  console.log('whats up??? localstorafe', localStorage.getItem('username')!)
  console.log('whats up???', isAuth())

  if (user.username === '') {
    if (localStorage.getItem('username')) {
      dispatch(setUserData(localStorage.getItem('username')!))
    }
  } else {
    localStorage.setItem('username', user.username)
  }


  return (
    <>
      {isAuth() ? (
        <View style={styles.container}>
          <Text style={styles.title}>wat {user.username}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.profileButtonsContainer}>
            <View style={styles.LoginBtn}>
              <Button title='Log in' color='gray' onPress={() => navigate('Login')} />
            </View>
            <Button title='Register' color='gray' onPress={() => navigate('Register')} />
          </View>
        </View>
      )
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profileButtonsContainer: {
  },
  LoginBtn: {
    marginBottom: 30,
  }
})

const mapStateToProps = (state: RootState) => ({
  user: state.User
})
const connector = connect(mapStateToProps)

export default connector(ProfileScreen)