import { Group, Pagination, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconMoodSadSquint } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStories } from '../../api/stories';
import { useDebounce } from '../../hooks/useDebounce';
import { SortType } from '../../types/sort';
import { serializedSortBy } from '../../utils/query';
import { useStoriesStore } from '../../zustand/storiesStore';
import LoadingSpinner from '../common/LoadingSpinner';
import PoemItemCard from './StoryItemCard';

const PoemsList = () => {
  const {
    genres,
    search,
    sortBy,
    tags,
    isFetching,
    setFetching,
    stories,
    setStories,
    page,
    setPage,
    pagination,
    setPagination,
    sortType,
  } = useStoriesStore();
  const [error, setError] = useState('');
  const [_searchParams, setSearchParams] = useSearchParams();

  const fetchStories = () => {
    getStories({
      ...(genres.size > 0 && { genres: [...genres].join(',') }),
      ...(search && { search_prompt: search }),
      ...(tags.size > 0 && { tags: [...tags].map(tag => tag[1].id).join(',') }),
      ...(pagination && { page: `${page}` }),
      sort_by: `${sortType}${serializedSortBy[sortBy]}`,
    })
      .then(res => {
        setStories(res?.data.stories || []);
        setPagination(res?.data.page || null);
      })
      .catch(e => {
        setStories([]);
        setError(e?.detail);
      })
      .finally(() => setFetching(false));
  };

  useDebounce(
    () => {
      fetchStories();

      setSearchParams({
        ...(genres.size > 0 && { genres: [...genres].join(',') }),
        ...(search && { search }),
        ...(tags.size > 0 && { tags: [...tags].map(tag => tag[1].id).join(',') }),
        ...(pagination && { page: `${page}` }),
        sortBy: serializedSortBy[sortBy],
        sortType: sortType ? SortType.ASC : SortType.DESC,
      });
    },
    [genres, search, tags, page, sortBy, sortType],
    2000
  );

  useEffect(() => {
    setError('');
    setFetching(true);
  }, [genres, search, tags, page, sortBy, sortType]);

  if (error) {
    return (
      <Stack justify="center" align="center" mt={64}>
        <Text>Sorry! Something went went wrong. Please try again!</Text>

        <IconMoodSadSquint color="#ffd07a" size={128} />
      </Stack>
    );
  }

  return isFetching && stories.length === 0 ? (
    <Group justify="center" mt={64}>
      <LoadingSpinner size={48} />
    </Group>
  ) : stories.length === 0 ? (
    <Stack justify="center" align="center" mt={64}>
      <Text>Sorry! We couldn't find any stories for you</Text>

      <IconMoodSadSquint color="#ffd07a" size={128} />
    </Stack>
  ) : (
    <>
      <SimpleGrid cols={4}>
        {stories.map(poem => (
          <PoemItemCard story={poem} key={poem.id} />
        ))}
      </SimpleGrid>

      {pagination && (
        <Group justify="center">
          <Pagination total={pagination.total} value={page} onChange={setPage} mt="sm" />
        </Group>
      )}
    </>
  );
};

export default PoemsList;
