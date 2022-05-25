import * as React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

function SigninScreen({navigation}) {
  const onPressSignIn = async values => {
    const {email, password} = values;

    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      console.log('=====>', user);
    } catch (e) {
      console.log('Error =>', e);
      if (e.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            console.log(res);
          })
          .catch(ed => {
            console.log(ed);
          });
      }
    }

    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //     navigation.navigate('Root');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       auth().signInWithEmailAndPassword(email, password);
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error);
    //   });
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <View style={styles.loginContainer}>
      <Formik
        initialValues={{email: 'chathura@gmail.com', password: 'gep2@1234'}}
        validationSchema={loginValidationSchema}
        onSubmit={values => onPressSignIn(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          isSubmitting,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize="none"
              secureTextEntry
            />
            {errors.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <Button
              title="Sign in"
              disabled={!isValid}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

export default SigninScreen;
