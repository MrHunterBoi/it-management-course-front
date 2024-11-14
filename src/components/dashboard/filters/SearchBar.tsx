import { Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { scrollToRef } from '../../../utils/scroll';
import { useStoriesStore } from '../../../zustand/storiesStore';
import LoadingSpinner from '../../common/LoadingSpinner';

const SearchBar = () => {
  const { search, setSearch, isFetching, stories, page } = useStoriesStore();

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToRef(divRef);
  }, [page]);

  return (
    <Group ref={divRef} justify="space-between">
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
