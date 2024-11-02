import { Button, Group, Select } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useFilterStore } from '../../../zustand/filterStore';

const filters = ['Popularity', 'Date', 'Likes'];

const SortFilters = () => {
  const { sortBy, setSortBy, sortType, setSortType } = useFilterStore();

  return (
    <Group>
      <Select data={filters} value={sortBy} onChange={value => setSortBy(value!)} flex={1} />

      <Button variant="default" onClick={() => setSortType(sortType === 'Desc' ? 'Asc' : 'Desc')}>
        {sortType === 'Desc' ? <IconSortDescending size={16} /> : <IconSortAscending size={16} />}
      </Button>
    </Group>
  );
};

export default SortFilters;
