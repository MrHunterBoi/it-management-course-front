import { Carousel } from '@mantine/carousel';
import { Card, Container, Divider, Grid, Group, Image, Stack, Text } from '@mantine/core';
import { IconCat } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStaticFile } from '../../api/api';
import { getProfile } from '../../api/profiles';
import { getLikedStories, getViewedStories, getWriterStories } from '../../api/stories';
import LabelValue from '../../components/common/LabelValue';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StoryItemCard from '../../components/dashboard/StoryItemCard';
import { IStory } from '../../types/story';
import { IUser } from '../../types/user';
import { useUserStore } from '../../zustand/userStore';

interface IProfileStories {
  writerStories: IStory[];
  viewedStories: IStory[];
  likedStories: IStory[];
}

const Profile = () => {
  const { user } = useUserStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [stories, setStories] = useState<IProfileStories>({
    writerStories: [],
    viewedStories: [],
    likedStories: [],
  });
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState({
    user: false,
    stories: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchStories = async () => {
      try {
        setIsLoading({
          stories: true,
          user: true,
        });

        let currUser: IUser | undefined = undefined;
        if (userId !== undefined) {
          const fetchedUser = await getProfile(userId);

          if (!fetchedUser?.data.profile) {
            return; // TODO: Insert error
          }

          setSelectedUser(fetchedUser?.data.profile);
          currUser = fetchedUser?.data.profile;
        } else {
          setSelectedUser(user);
          currUser = user;
        }

        setIsLoading({
          stories: true,
          user: false,
        });

        const requests = [getViewedStories, getLikedStories];

        if (currUser?.writer) {
          requests.push(getWriterStories);
        }

        const responses = await Promise.all(requests.map(r => r(`${userId ? userId : ''}`)));

        setStories({
          viewedStories: responses?.[0]?.data.stories || [],
          likedStories: responses?.[1]?.data.stories || [],
          writerStories: user.writer ? responses?.[2]?.data.stories || [] : [],
        });
      } catch {
      } finally {
        setIsLoading({
          stories: false,
          user: false,
        });
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (`${user.id}` === userId) {
      navigate('/profile');
      return;
    }

    if (!userId) {
      setSelectedUser(user);
    }
  }, [user]);

  return (
    <Container size="xl" mb={32}>
      <Stack gap={32}>
        <Grid>
          <Grid.Col span={3}>
            <Card style={{ height: '100%' }} shadow="sm" padding="lg" radius="md" withBorder>
              {isLoading.user ? (
                <Group justify="center" align="center" mih={350}>
                  <LoadingSpinner size={64} color="green" />
                </Group>
              ) : (
                <Stack gap={0}>
                  <Stack align="center" gap={0}>
                    <Image
                      style={{
                        border: '1px solid #8b8b8b',
                        borderRadius: 9999,
                      }}
                      src={getStaticFile(selectedUser?.avatar || '')}
                      w={256}
                      h={256}
                    />

                    <Text fw="bold" size="xl">
                      {selectedUser?.user.username}
                    </Text>

                    <Text c="gray">
                      {selectedUser?.writer ? selectedUser.writer.writer_pseudo : 'Reader'}
                    </Text>
                  </Stack>

                  <Divider my="md" w="100%" />

                  {selectedUser?.writer ? (
                    <>
                      <LabelValue label="Stories" value={`${stories.writerStories.length}`} />

                      <LabelValue
                        label="Story views"
                        value={`${selectedUser.writer.total_story_views_counter}`}
                      />

                      <LabelValue
                        label="Likes"
                        value={`${selectedUser.writer.total_likes_counter}`}
                      />
                    </>
                  ) : (
                    <>
                      <LabelValue
                        label="Stories read"
                        value={`${selectedUser?.reader.total_stories_viewed}`}
                      />

                      <LabelValue
                        label="Following"
                        value={`${selectedUser?.reader.subscribed_to.length}`}
                      />
                    </>
                  )}
                </Stack>
              )}
            </Card>
          </Grid.Col>

          <Grid.Col span={9}>
            <Stack h="100%">
              <Text ml={32} size="32px" fw="bold">
                Written stories
              </Text>

              {isLoading.stories ? (
                <Group justify="center" align="center" mih={200}>
                  <LoadingSpinner size={64} />
                </Group>
              ) : stories.writerStories.length > 0 ? (
                <Carousel
                  slideSize="33.3333%"
                  slideGap="md"
                  align="start"
                  slidesToScroll={3}
                  styles={{
                    controls: {
                      paddingInline: 0,
                      marginInline: -32,
                    },
                    root: {
                      marginInline: 32,
                    },
                  }}
                >
                  {stories.writerStories.map(story => (
                    <Carousel.Slide key={story.id}>
                      <StoryItemCard story={story} h="100%" />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              ) : (
                <Stack align="center" justify="center" h="100%">
                  <IconCat size={64} color="gray" />

                  <Text size="xl" c="gray">
                    Nothing here, but us cats...
                  </Text>
                </Stack>
              )}
            </Stack>
          </Grid.Col>
        </Grid>

        {!userId && (
          <>
            <Stack>
              <Text ml={32} size="32px" fw="bold">
                Viewed stories
              </Text>

              {isLoading.stories ? (
                <Group justify="center" align="center" mih={200}>
                  <LoadingSpinner size={64} />
                </Group>
              ) : stories.viewedStories.length > 0 ? (
                <Carousel
                  slideSize="25%"
                  slideGap="md"
                  align="start"
                  slidesToScroll={4}
                  styles={{
                    controls: {
                      paddingInline: 0,
                      marginInline: -32,
                    },
                    root: {
                      marginInline: 32,
                    },
                  }}
                >
                  {stories.viewedStories.map(story => (
                    <Carousel.Slide key={story.id}>
                      <StoryItemCard story={story} h="100%" />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              ) : (
                <Stack align="center">
                  <IconCat size={64} color="gray" />

                  <Text size="xl" c="gray">
                    Nothing here, but us cats...
                  </Text>
                </Stack>
              )}
            </Stack>

            <Stack>
              <Text ml={32} size="32px" fw="bold">
                Liked stories
              </Text>

              {isLoading.stories ? (
                <Group justify="center" align="center" mih={200}>
                  <LoadingSpinner size={64} />
                </Group>
              ) : stories.likedStories.length > 0 ? (
                <Carousel
                  slideSize="25%"
                  slideGap="md"
                  align="start"
                  slidesToScroll={4}
                  styles={{
                    controls: {
                      paddingInline: 0,
                      marginInline: -32,
                    },
                    root: {
                      marginInline: 32,
                    },
                  }}
                >
                  {stories.writerStories.map(story => (
                    <Carousel.Slide key={story.id}>
                      <StoryItemCard story={story} h="100%" />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              ) : (
                <Stack align="center">
                  <IconCat size={64} color="gray" />

                  <Text size="xl" c="gray">
                    Nothing here, but us cats...
                  </Text>
                </Stack>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Profile;
