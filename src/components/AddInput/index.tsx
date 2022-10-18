import { Button, Card, Group, TextInput, Text, Code } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { IconClipboard, IconLink } from "tabler-icons";
import { trpc } from "../../utils/trpc";
import { useStyles } from "./styles";

export function AddInput() {
  const { classes } = useStyles();
  const [longURL, setLongURL] = useState("");
  const [code, setCode] = useState("");
  const trpcCtx = trpc.useContext();
  const shortenMutation = trpc.useMutation("url.shorten", {
    onSuccess() {
      trpcCtx.invalidateQueries(["url.list"]);
    },
  });

  const clipboard = useClipboard({ timeout: 500 });
  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(url);
  };

  const shorten = async () => {
    if (window) {
      const output = await shortenMutation.mutateAsync({
        baseURL: window.location.href,
        longURL,
        code: code !== "" ? code : undefined,
      });
      if (!output.error) {
        openConfirmModal({
          title: "URL shortened successfully!",
          children: (
            <Text size="sm">
              The url <Code>{longURL}</Code> was successfully mapped to{" "}
              <Code>{output.shortURL}</Code>.
            </Text>
          ),
          labels: { confirm: "Copy URL", cancel: "Close" },
          onConfirm: () => {
            clipboard.copy(output.shortURL);
            showNotification({
              title: "URL copied to clipboard!",
              color: "green",
              message: "The shortned url was copied to clipboard successfully!",
              icon: <IconClipboard />,
            });
          },
        });
        setLongURL("");
        setCode("");
      }
    }
  };

  return (
    <Card withBorder shadow="xl" radius="md" className={classes.card}>
      <TextInput
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        label="Long URL"
        required
        placeholder="Copy your long url here"
        mb="sm"
        icon={<IconLink size={18} className={classes.linkIcon} />}
        error={
          longURL.length > 0 &&
          !isValidUrl(longURL) &&
          "Please enter a valid URL."
        }
      />
      <TextInput
        value={code}
        label="Custom Back URL"
        onChange={(e) => setCode(e.target.value)}
        placeholder="Place your custom back url here"
        mb="sm"
        disabled={longURL.length <= 0 || !isValidUrl(longURL)}
        error={code.length > 0 && /\s/.test(code) && "Spaces not allowed!"}
      />
      <Group position="right">
        <Button
          disabled={longURL.length <= 0 || !isValidUrl(longURL)}
          onClick={shorten}
          variant="gradient"
          gradient={{ from: "indigo", to: "grape" }}
        >
          Shorten
        </Button>
      </Group>
    </Card>
  );
}
