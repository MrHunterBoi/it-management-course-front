import {
  Avatar,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconSettings,
  IconStar,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/header.module.scss';
import { useUserStore } from '../zustand/userStore';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';

const links = [
  { link: '/stories', label: 'Stories' },
];

const Header = () => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, logout } = useUserStore();

  const openLoginModal = () => {
    modals.open({
      title: 'Log in',
      children: <LoginModal />,
    });
  };

  const openSignupModal = () => {
    modals.open({
      title: 'Sign up',
      children: <SignupModal />,
    });
  };

  return (
    <Container
      size="lg"
      styles={{
        root: {
          paddingBlock: '1em',
        },
      }}
    >
      <Group justify="space-between">
        <Link to="/">
          <img src="logoipsum-330.svg" />
        </Link>

        <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
          {links.map(link => (
            <Link
              key={link.label}
              to={link.link}
              className={classes.link}
              onClick={event => event.preventDefault()}
            >
              {link.label}
            </Link>
          ))}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        {user ? (
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user?.avatar} alt={user?.user?.username} radius="xl" size={20} />

                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user?.user?.username}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                <Link
                  to="/profile/settings"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  Settings
                </Link>
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                onClick={logout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Group>
            <Button variant="outline" color="orange" onClick={openLoginModal}>
              Log in
            </Button>

            <Button variant="outline" color="green" onClick={openSignupModal}>
              Sign up
            </Button>
          </Group>
        )}
      </Group>
    </Container>
  );
};

export default Header;
