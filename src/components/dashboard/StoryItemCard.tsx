import { Badge, Card, Group, Image, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { getStaticFile } from '../../api/api';
import styles from '../../styles/components/storyItemCard.module.scss';
import { IStory } from '../../types/story';
import { getRandomBadgeColor } from '../../utils/colors';
import { useStoriesStore } from '../../zustand/storiesStore';

interface PoemItemCardProps {
  story: IStory;
}

const PoemItemCard: FC<PoemItemCardProps> = ({ story }) => {
  const { isFetching } = useStoriesStore();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={`${styles.item} ${isFetching ? styles.fetching : ''}`}
    >
      <Card.Section>
        <Image src={getStaticFile(story.post_image)} height={200} alt={story.post_title} />
      </Card.Section>

      <Stack gap={0} mt="md" mb="xs">
        <Text size="xl" fw={500}>
          {story.post_title}
        </Text>

        <Group justify="space-between">
          <Text size="xs" c="gray">
            By {story.creator_id.writer_pseudo}, {story.created}
          </Text>

          <Badge color={getRandomBadgeColor(story.genre.id)} size="md" variant="dot">
            {story.genre.genre}
          </Badge>
        </Group>
      </Stack>

      <Text>{story.post_description}</Text>

      <Group mt="md" mb="xs">
        {story.tags.map(({ tag, id }) => (
          <Badge color={getRandomBadgeColor(id)} key={id}>
            {tag}
          </Badge>
        ))}
      </Group>
    </Card>
  );
};

export default PoemItemCard;
