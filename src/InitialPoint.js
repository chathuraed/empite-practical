import * as React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

function InitialPoint({navigation}) {
  const [initializing, setInitializing] = React.useState(true);
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    const unlisten = auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
        if (initializing) {
          setInitializing(false);
        }
      } else {
        setAuthUser(null);
        setInitializing(false);
      }
    });
    return () => {
      unlisten();
    };
  }, [initializing]);

  if (initializing) {
    return null;
  }

  if (!authUser) {
    console.log('Auth User', authUser);
    navigation.navigate('Login');
    return null;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome {authUser.email}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
}

export default InitialPoint;
