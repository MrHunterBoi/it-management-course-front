import { Badge, Card, Group, Image, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { IPoem } from '../../types/poem';
import { getRandomBadgeColor } from '../../utils/colors';

interface PoemItemCardProps {
  poem: IPoem;
}

const PoemItemCard: FC<PoemItemCardProps> = ({ poem }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={poem.image} height={200} alt="Norway" />
      </Card.Section>

      <Stack gap={0} mt="md" mb="xs">
        <Text size="xl" fw={500}>
          {poem.title}
        </Text>

        <Group justify='space-between'>
          <Text size="xs" c="gray">
            By {poem.creator.writer_pseudo}, {poem.created_at}
          </Text>

          <Badge color={getRandomBadgeColor(poem.genre.id)} size="md" variant="dot">
            {poem.genre.genre}
          </Badge>
        </Group>
      </Stack>

      <Text>{poem.description}</Text>

      <Group mt="md" mb="xs">
        {poem.tags.map(({ tag, id }) => (
          <Badge color={getRandomBadgeColor(id)} key={id}>
            {tag}
          </Badge>
        ))}
      </Group>
    </Card>
  );
};

export default PoemItemCard;
