import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "@/app/providers/LoadingProvider";
import { useEffect } from "react";

export const useHandleRedirect = () => {
  const r = useRouter();
  const pathname = usePathname();
  const { setLoading } = useLoading();

  const handleClickToRedirect = (path: string) => {
    if (pathname === path) {
      setLoading(false);
      return;
    } else {
      setLoading(true);
      r.push(path);
    }
  };

    useEffect(() => {
      setLoading(false);
    }, [pathname, setLoading]);

  return { handleClickToRedirect };
};
