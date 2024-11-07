import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useState } from 'react';
import { signIn } from '../../api/auth';
import styles from '../../styles/components/authModal.module.scss';
import { ApiError } from '../../types/api';
import { ISigninFormValues } from '../../types/auth';
import { useUserStore } from '../../zustand/userStore';
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
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const { setUser } = useUserStore();

  const openSignUpModal = () => {
    modals.closeAll();
    modals.open({
      title: 'Sign up',
      children: <SignupModal />,
    });
  };

  const handleSubmit = (values: ISigninFormValues) => {
    setApiError(null);
    setIsSubmitting(true);

    signIn(values)
      .then(res => {
        localStorage.setItem('token', res?.access || '');
        localStorage.setItem('refresh', res?.refresh || '');
        setUser(res?.data || null);

        modals.closeAll();
      })
      .catch(setApiError)
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
        disabled={isSubmitting}
        {...form.getInputProps('username')}
      />

      <TextInput
        withAsterisk
        label="Password"
        placeholder="********"
        type="password"
        key={form.key('password')}
        disabled={isSubmitting}
        {...form.getInputProps('password')}
      />

      <Stack justify="center" mt="md" align="center">
        <Button type="submit" loading={isSubmitting}>
          Sign in
        </Button>

        <Text
          styles={{
            root: {
              color: 'red',
            },
          }}
        >
          {apiError?.detail}
        </Text>

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
