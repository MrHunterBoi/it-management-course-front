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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconChevronDown,
  IconFilePlus,
  IconLogout,
  IconNotes,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStaticFile } from '../api/api';
import classes from '../styles/components/header.module.scss';
import { useUserStore } from '../zustand/userStore';
import LoginModal from './modals/LoginModal';
import ProfileSettingsModal from './modals/ProfileSettingsModal';
import SignupModal from './modals/SignupModal';

const Header = () => {
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

  const openSettingsModal = () => {
    modals.open({
      title: 'Settings',
      children: <ProfileSettingsModal />,
      size: 'xl',
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
                  <Avatar
                    src={getStaticFile(user?.avatar)}
                    alt={user?.user?.username}
                    radius="xl"
                    size={20}
                  />

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
                  <IconNotes
                    color="#2796d6"
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                <Link to="/stories" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Stories
                </Link>
              </Menu.Item>

              {user.writer && (
                <Menu.Item
                  leftSection={
                    <IconFilePlus
                      color="#27d656"
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  <Link to="/stories/new" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Create story
                  </Link>
                </Menu.Item>
              )}

              <Menu.Divider />

              <Menu.Item
                leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              >
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Profile
                </Link>
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                onClick={openSettingsModal}
              >
                Settings
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconLogout
                    color="red"
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                onClick={logout}
                c="red"
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
