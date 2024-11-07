import { Card, Stack, Text } from '@mantine/core';
import SortFilters from './SortFilters';
import FilterGenres from './FilterGenres';
import FiltersTags from './FiltersTags';

const Filters = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Sort by:</Text>

        <SortFilters />
      </Stack>

      <Stack justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Genres:</Text>

        <FilterGenres />
      </Stack>

      <Stack justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Tags:</Text>

        <FiltersTags />
      </Stack>
    </Card>
  );
};

export default Filters;
