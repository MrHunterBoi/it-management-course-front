import { Badge, Card, Group, Image, Text } from '@mantine/core';
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

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{poem.title}</Text>

        {poem.tags.map(({ tag, id }) => (
          <Badge color={getRandomBadgeColor(id)} key={id}>
            {tag}
          </Badge>
        ))}
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>
    </Card>
  );
};

export default PoemItemCard;
