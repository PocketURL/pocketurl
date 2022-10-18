import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: `${theme.spacing.xl}px auto`,
    gridGap: 20,
  },
}));
