import { trpc } from "../../utils/trpc";
import { URLCard } from "./Card";
import { useStyles } from "./styles";

export function List() {
  const { classes } = useStyles();
  const { data: urls, isLoading } = trpc.useQuery(["url.list"]);

  if (!urls || isLoading || urls.length === 0) return null;

  return (
    <div className={classes.container}>
      {urls
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((url) => (
          <URLCard url={url} key={url.id} />
        ))}
    </div>
  );
}
