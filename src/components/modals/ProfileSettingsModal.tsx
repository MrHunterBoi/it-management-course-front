import { Tabs, Text } from '@mantine/core';
import { IconDots, IconFeather, IconUser } from '@tabler/icons-react';
import MiscTab from './settings/MiscTab';
import ProfileTab from './settings/ProfileTab';
import WritershipTab from './settings/WritershipTab';

const ProfileSettingsModal = () => {
  return (
    <Tabs orientation="vertical" defaultValue="profile">
      <Tabs.List>
        <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
          <Text>Profile</Text>
        </Tabs.Tab>

        <Tabs.Tab value="writership" leftSection={<IconFeather size={16} />}>
          <Text>Writership</Text>
        </Tabs.Tab>

        <Tabs.Tab value="misc" leftSection={<IconDots size={16} />}>
          <Text>Misc</Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">
        <ProfileTab />
      </Tabs.Panel>

      <Tabs.Panel value="writership">
        <WritershipTab />
      </Tabs.Panel>

      <Tabs.Panel value="misc">
        <MiscTab />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileSettingsModal;
