import type { GetServerSideProps } from "next";
import { AddInput, List, Wrapper } from "../components";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

export default function Home() {
  return (
    <Wrapper>
      <AddInput />
      <List />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  const redirect =
    session === null
      ? {
          destination: "/user/login",
          permanent: false,
        }
      : undefined;

  return {
    props: {
      session,
    },
    redirect,
  };
};
