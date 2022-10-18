import {
  ActionIcon,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { signOut } from "next-auth/react";
import { IconLogout, IconMoonStars, IconSun } from "tabler-icons";
import { Logo } from "../shared";
import { useStyles } from "./style";

export const Header: React.FC = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <div className={classes.header}>
      <Logo
        sx={(theme) => ({
          color: theme.colors.indigo[1],
        })}
        link={true}
        order={2}
      />
      <Group position="apart">
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          variant="transparent"
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.yellow[4]
                : theme.colors.indigo[1],
          })}
        >
          {colorScheme === "dark" ? (
            <IconSun size={20} />
          ) : (
            <IconMoonStars size={20} />
          )}
        </ActionIcon>
        <ActionIcon size="lg" variant="transparent" onClick={() => signOut()}>
          <IconLogout color={theme.colors.indigo[1]} size={20} stroke={1.5} />
        </ActionIcon>
      </Group>
    </div>
  );
};
