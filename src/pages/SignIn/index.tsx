import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import setValidationErrors from '../../utils/setValidationErrors';

import logo from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors([]);

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Email inválido'),
        password: Yup.string()
          .required('Senha é obrigatória')
          .min(6, 'Mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({
      //   email: data.email,
      //   password: data.password,
      // });

      // history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = setValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert('Falha ao fazer login', 'Verifique as credenciais.');
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image style={{ marginTop: -40 }} source={logo} />
            <View>
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                ref={nameInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Digite seu email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Digite sua senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('cliquei');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={16} color="#ff9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
