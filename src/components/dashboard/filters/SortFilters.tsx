import { Button, Group, Select } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { SortBy } from '../../../types/sort';
import { serializedSortBy } from '../../../utils/query';
import { useStoriesStore } from '../../../zustand/storiesStore';

const filters = Object.keys(serializedSortBy);

const SortFilters = () => {
  const { sortBy, setSortBy, sortType, setSortType } = useStoriesStore();

  return (
    <Group>
      <Select
        data={filters}
        value={sortBy}
        onChange={value => setSortBy(value! as SortBy)}
        flex={1}
      />

      <Button variant="default" onClick={() => setSortType(sortType === '-' ? '' : '-')}>
        {sortType === '-' ? <IconSortDescending size={16} /> : <IconSortAscending size={16} />}
      </Button>
    </Group>
  );
};

export default SortFilters;
