import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { Heading, VStack, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colors } = useTheme();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Email ou Senha Inválida!');
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        console.log(e);
        setIsLoading(false);

        if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou senha inválido.');
        }

        if (e.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'Email inválido.');
        }

        return Alert.alert('Entrar', 'Não foi possível acessar');
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" fontFamily="heading" mt={20} mb={6}>
        Acesse sua Conta
      </Heading>

      <Input
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        mb={4}
        placeholder="E-mail"
        onChangeText={setEmail}
      />
      <Input
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        mb={8}
        placeholder="Senha"
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" w="full" onPress={handleSignIn} isLoading={isLoading} />
    </VStack>
  );
}
