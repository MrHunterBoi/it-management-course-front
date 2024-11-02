import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useFilterStore } from '../../../zustand/filterStore';

const SearchBar = () => {
  const { search, setSearch } = useFilterStore();

  return (
    <TextInput
      placeholder="Search poems..."
      leftSection={<IconSearch />}
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
};

export default SearchBar;
