import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={signOut}>
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
          }}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
