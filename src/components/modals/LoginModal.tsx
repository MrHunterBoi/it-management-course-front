import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useState } from 'react';
import { signIn } from '../../api/auth';
import styles from '../../styles/components/authModal.module.scss';
import { ISigninFormValues } from '../../types/api';
import SignupModal from './SignupModal';

const LoginModal = () => {
  const form = useForm<ISigninFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: value => (value.length === 0 ? 'Please enter username' : null),
      password: value => (value.length === 0 ? 'Please enter password' : null),
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openSignUpModal = () => {
    modals.closeAll();
    modals.open({
      title: 'Sign up',
      children: <SignupModal />,
    });
  };

  const handleSubmit = (values: ISigninFormValues) => {
    setIsSubmitting(true);
    signIn(values)
      .then(data => {
        console.log('🔔🔔🔔 ~ file: SignupModal.tsx:64 ~ .then ~ data => ', data);

        // modals.closeAll();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Username"
        placeholder="user123"
        key={form.key('username')}
        {...form.getInputProps('username')}
      />

      <TextInput
        withAsterisk
        label="Password"
        placeholder="********"
        type="password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Stack justify="center" mt="md" align="center">
        <Button type="submit" loading={isSubmitting}>
          Sign in
        </Button>

        <Text span>
          Don't have an account?{' '}
          <Text
            span
            c="blue"
            w="fit-content"
            classNames={{
              root: styles.signUp,
            }}
            onClick={openSignUpModal}
          >
            Sign up
          </Text>
        </Text>
      </Stack>
    </form>
  );
};

export default LoginModal;
