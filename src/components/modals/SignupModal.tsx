import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import styles from './AuthModal.module.scss';
import LoginModal from './LoginModal';

interface IFormValues {
  username: string;
  password: string;
  repeatPassword: string;
}

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
  const form = useForm<IFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },

    validate: {
      username: validateUsername,
      password: validatePassword,
      repeatPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const openLoginModal = () => {
    modals.closeAll();
    modals.open({
      title: 'Log in',
      children: <LoginModal />,
    });
  };

  return (
    <form onSubmit={form.onSubmit(values => console.log(values))}>
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
        key={form.key('password')}
        type="password"
        {...form.getInputProps('password')}
      />

      <TextInput
        withAsterisk
        label="Repeat password"
        placeholder="********"
        type="password"
        key={form.key('repeatPassword')}
        {...form.getInputProps('repeatPassword')}
      />

      <Stack justify="center" mt="md" align="center">
        <Button type="submit">Sign up</Button>

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
