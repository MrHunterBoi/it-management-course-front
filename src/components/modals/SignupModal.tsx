import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useState } from 'react';
import { signUp } from '../../api/auth';
import styles from '../../styles/components/authModal.module.scss';
import { ISignupFormValues } from '../../types/auth';
import { useUserStore } from '../../zustand/userStore';
import LoginModal from './LoginModal';

const validatePassword = (value: string) => {
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }

  return null;
};

const validateUsername = (value: string) => {
  if (value.length < 6) {
    return 'Username must be at least 6 characters long';
  }

  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return 'Username must contain only letters and numbers';
  }

  return null;
};

const SignupModal = () => {
  const form = useForm<ISignupFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      password2: '',
    },

    validate: {
      username: validateUsername,
      password: validatePassword,
      password2: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserStore();

  const handleSubmit = (values: ISignupFormValues) => {
    setIsSubmitting(true);
    signUp(values)
      .then(res => {
        localStorage.setItem('token', res?.access || '');
        localStorage.setItem('refresh', res?.refresh || '');
        setUser(res?.data || null);

        modals.closeAll();
      })
      .catch(form.setErrors)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const openLoginModal = () => {
    modals.closeAll();
    modals.open({
      title: 'Log in',
      children: <LoginModal />,
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
        key={form.key('password')}
        type="password"
        disabled={isSubmitting}
        {...form.getInputProps('password')}
      />

      <TextInput
        withAsterisk
        label="Repeat password"
        placeholder="********"
        type="password"
        key={form.key('password2')}
        disabled={isSubmitting}
        {...form.getInputProps('password2')}
      />

      <Stack justify="center" mt="md" align="center">
        <Button type="submit" loading={isSubmitting}>
          Sign up
        </Button>

        <Text span>
          Already have an account?{' '}
          <Text
            span
            c="blue"
            w="fit-content"
            classNames={{
              root: styles.signUp,
            }}
            onClick={openLoginModal}
          >
            Log in
          </Text>
        </Text>
      </Stack>
    </form>
  );
};

export default SignupModal;
