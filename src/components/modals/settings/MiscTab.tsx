import { Button, Container, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';
import { deleteUser } from '../../../api/user';
import { useUserStore } from '../../../zustand/userStore';
import SettingsLabel from '../../common/SettingsLabel';

const MiscTab = () => {
  const { setUser } = useUserStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteButton = () => {
    modals.openConfirmModal({
      title: 'Alert',
      children: <Text>Are you sure you want to delete your account?</Text>,
      labels: {
        confirm: "Yes, I'm sure",
        cancel: 'Actually, nevermind',
      },
      onConfirm: () => {
        setIsDeleting(true);
        deleteUser()
          // TODO: Notifications would be cool here
          .then(() => {
            setUser(null);
            modals.closeAll();
          })
          .finally(() => setIsDeleting(false));
      },
      confirmProps: {
        color: 'red',
        loading: isDeleting,
      },
    });
  };

  return (
    <Container>
      <Stack align="center">
        <SettingsLabel title="Danger Zone" />

        <Button color="red" onClick={handleDeleteButton} w="50%">
          Delete account
        </Button>
      </Stack>
    </Container>
  );
};

export default MiscTab;
