import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import styles from './AuthModal.module.scss';
import SignupModal from './SignupModal';

interface IFormValues {
  username: string;
  password: string;
}

const LoginModal = () => {
  const form = useForm<IFormValues>({
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

  const openSignUpModal = () => {
    modals.closeAll();
    modals.open({
      title: 'Sign up',
      children: <SignupModal />,
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
        type='password'
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Stack justify="center" mt="md" align="center">
        <Button type="submit">Sign in</Button>

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
