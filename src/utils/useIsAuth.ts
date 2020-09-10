import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { useEffect } from "react";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!data?.me && !loading) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, loading]);
};
