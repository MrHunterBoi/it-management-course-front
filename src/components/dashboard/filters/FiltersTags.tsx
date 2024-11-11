import { Group, Select, Stack } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { fetchTags } from '../../../api/tags';
import { ITag } from '../../../types/tag';
import { getRandomBadgeColor } from '../../../utils/colors';
import { useStoriesStore } from '../../../zustand/storiesStore';
import BadgeX from '../../common/BadgeX';

const FiltersTags = () => {
  const { tags: tagsSelected, addTag, removeTag } = useStoriesStore();
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tagsOptions = useMemo(() => {
    return tags.filter(tag => !tagsSelected.has(tag.id));
  }, [tagsSelected, tags]);

  useEffect(() => {
    setIsLoading(true);
    fetchTags()
      .then(res => {
        setTags(res?.data.stories || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    'Loading...'
  ) : (
    <Stack>
      <Select
        data={tagsOptions.map(tag => ({ value: tag.id.toString(), label: tag.tag }))}
        searchable
        clearable
        placeholder="Search tags..."
        rightSection
        onChange={(_value, option) => {
          addTag({
            id: +option.value,
            tag: option.label,
          });
        }}
        searchValue={value}
        onSearchChange={setValue}
        onDropdownClose={() => {
          setValue('');
        }}
        limit={6}
      />

      <Group>
        {[...tagsSelected.values()].map(tag => (
          <BadgeX
            key={tag.id}
            tag={tag}
            color={getRandomBadgeColor(tag.id)}
            onClick={() => removeTag(tag)}
          />
        ))}
      </Group>
    </Stack>
  );
};

export default FiltersTags;
