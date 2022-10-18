import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    width: "95%",
    maxWidth: theme.breakpoints.sm,
    minWidth: 400,
    margin: "auto",
    background: "transparent",
    borderColor: theme.primaryColor,
    borderWidth: 2,
  },
  linkIcon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.indigo[1]
        : theme.primaryColor,
  },
}));
