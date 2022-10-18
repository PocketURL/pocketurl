import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    borderWidth: 2,
    borderColor: theme.primaryColor,
    maxWidth: theme.breakpoints.sm,
    width: "90%",
    minWidth: 385,
  },
  longURL: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[6],
  },
  shortURL: {
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  shortURLContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  redirectsStats: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
