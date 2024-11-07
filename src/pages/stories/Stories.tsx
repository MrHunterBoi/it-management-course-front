import { Grid, Stack } from '@mantine/core';
import Filters from '../../components/dashboard/filters/Filters';
import SearchBar from '../../components/dashboard/filters/SearchBar';
import PoemsList from '../../components/dashboard/PoemsList';

const Stories = () => {
  return (
    <Stack
      styles={{
        root: {
          minHeight: '95vh',
        },
      }}
    >
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
};

export default Stories;
