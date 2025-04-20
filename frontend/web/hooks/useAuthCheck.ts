"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type UseAuthCheckOptions = {
  when: "authenticated" | "unauthenticated";
  redirectTo: string;
};

export default function useAuthCheck({
  when,
  redirectTo,
}: UseAuthCheckOptions) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === when) {
      router.replace(redirectTo);
    }
  }, [status, when, redirectTo, router]);
}
