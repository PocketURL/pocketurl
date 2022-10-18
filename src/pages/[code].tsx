import { Code, Footer, Loader, Text, useMantineTheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconHeart } from "tabler-icons";
import { Logo } from "../components/shared";
import { trpc } from "../utils/trpc";

export default function Redirect() {
  const router = useRouter();
  const { code } = router.query;
  const trpcCtx = trpc.useContext();
  const [longURL, setLongURL] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    (async () => {
      if (typeof code === "string") {
        const output = await trpcCtx.fetchQuery(["url.getLongURL", { code }]);
        if (output.notFound) router.push("/notFound");
        else {
          //   await increaseRedirectCount.mutateAsync({
          //     id: output.id,
          //     redirects: output.redirects + 1,
          //   });
          setLongURL(output.longURL);
          setTimeout(() => {
            router.push(output.longURL);
          }, 1000);
        }
      }
    })();
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Logo order={1} />
      <Loader mt="sm" variant="dots" />
      <Text mt="sm">Redirecting you to</Text>
      <Code style={{ maxWidth: "95%", overflowWrap: "anywhere" }} mt="xs">
        {longURL}
      </Code>
      <Footer
        height={80}
        pt="sm"
        style={{ position: "absolute", bottom: 0, textAlign: "center" }}
      >
        <Text>
          Made with <IconHeart size={16} color="red" /> by{" "}
          <Text
            component={NextLink}
            color="indigo"
            href="https://bit.ly/celeroncoder"
          >
            celeroncoder
          </Text>
        </Text>
        <Text>Shorty &#169; {new Date().getFullYear()}</Text>
      </Footer>
    </div>
  );
}
