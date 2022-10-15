import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconActivity, IconClipboard } from "tabler-icons";
import { trpc } from "../../utils/trpc";
import { useStyles } from "./styles";

export const List: React.FC = () => {
  const { classes } = useStyles();
  const { data: urls, isLoading } = trpc.useQuery(["url.list"]);
  const clipboard = useClipboard();

  if (!urls || isLoading || urls.length === 0) return null;

  return (
    <div className={classes.container}>
      {urls
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((url) => (
          <Card key={url.id} shadow="md" withBorder className={classes.card}>
            <Badge mb="xs" radius="sm">
              {url.createdAt.toDateString()}
            </Badge>
            <Text mb="xs" size="md" className={classes.longURL}>
              {url.longURL.length > 35
                ? `${url.longURL.substring(0, 35)}...`
                : url.longURL}
            </Text>
            <Group position="apart">
              <div className={classes.shortURLContainer}>
                <Text
                  className={classes.shortURL}
                  weight="bold"
                  color="indigo"
                  size="sm"
                  mr="xs"
                >
                  {url.shortURL}
                </Text>
                <ActionIcon
                  onClick={() => clipboard.copy(url.shortURL)}
                  color="violet"
                  variant="subtle"
                  radius="sm"
                  size="xs"
                  mb={3}
                >
                  <IconClipboard size={12} />
                </ActionIcon>
              </div>
              <div className={classes.redirectsStats}>
                <IconActivity size={14} />
                <Text size="xs" style={{ marginLeft: 3 }}>
                  {url.redirects}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
    </div>
  );
};
