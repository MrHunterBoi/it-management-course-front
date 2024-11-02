import { Card, Stack, Text, Title } from '@mantine/core';
import SortFilters from './SortFilters';

const Filters = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Sort by:</Text>

        <SortFilters />
      </Stack>
    </Card>
  );
};

export default Filters;
