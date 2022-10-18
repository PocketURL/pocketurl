import { Button, Card, Container, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { IconBrandGoogle } from "tabler-icons";
import { Logo } from "../../components/shared";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default function Login() {
  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card withBorder shadow="xl">
        <Card.Section my="lg" p="lg" style={{ textAlign: "center" }}>
          <Logo />
          <Text size="sm" color="dimmed">
            Shorten Link the short way!
          </Text>
        </Card.Section>
        <Button
          leftIcon={<IconBrandGoogle />}
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ from: "lime", to: "indigo", deg: 277 }}
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </Button>
      </Card>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
    redirect:
      session !== null
        ? {
            destination: "/",
            permanent: true,
          }
        : undefined,
  };
};
