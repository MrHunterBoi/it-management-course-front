import { Button, Grid, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import Filters from './components/dashboard/filters/Filters';
import SearchBar from './components/dashboard/filters/SearchBar';
import PoemsList from './components/dashboard/PoemsList';
import LoginModal from './components/modals/LoginModal';

function App() {
  const openModal = () => {
    modals.open({
      title: 'Log in',
      children: <LoginModal />,
    });
  };

  return (
    <Stack
      styles={{
        root: {
          minHeight: '95vh',
        },
      }}
    >
      <Button onClick={openModal}>Open modal</Button>

      <Grid flex={1} align="stretch">
        <Grid.Col span={3}>
          <Filters />
        </Grid.Col>

        <Grid.Col span={9}>
          <Stack>
            <SearchBar />

            <PoemsList />
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default App;
