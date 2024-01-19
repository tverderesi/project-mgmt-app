import { useEffect } from "react";

export function useSetPageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, []);
}
