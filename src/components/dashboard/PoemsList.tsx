import { SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { fetchPoems } from '../../api/poems';
import { IPoem } from '../../types/poem';
import PoemItemCard from './PoemItemCard';

const PoemsList = () => {
  const [poems, setPoems] = useState<IPoem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchPoems()
      .then(setPoems)
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <SimpleGrid cols={4}>
      {poems.map(poem => (
        <PoemItemCard poem={poem} key={poem.id} />
      ))}
    </SimpleGrid>
  );
};

export default PoemsList;
