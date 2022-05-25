import * as React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './contexts/AuthContext';

function InitialPoint({navigation}) {
  const {user, setUser} = React.useContext(AuthContext);
  const [initializing, setInitializing] = React.useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    console.log('Auth User', user);
    navigation.navigate('Login');
    return null;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome {user.email}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
}

export default InitialPoint;
