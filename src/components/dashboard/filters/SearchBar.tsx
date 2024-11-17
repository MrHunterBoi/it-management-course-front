import { Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useStoriesStore } from '../../../zustand/storiesStore';
import LoadingSpinner from '../../common/LoadingSpinner';

const SearchBar = () => {
  const { search, setSearch, isFetching, stories, page } = useStoriesStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  return (
    <Group justify="space-between">
      <TextInput
        placeholder="Search poems..."
        leftSection={<IconSearch />}
        value={search}
        onChange={event => setSearch(event.target.value)}
        flex={1}
      />

      {isFetching && stories.length !== 0 && <LoadingSpinner size={28} />}
    </Group>
  );
};

export default SearchBar;
