import { UserCircle2 } from "lucide-react";
import { useFragment } from "react-relay";
import { CLIENT_COUNT_FRAGMENT } from "@/graphql/queries/user";
import { userClientCount_clientCount$key } from "@/graphql/queries/__generated__/userClientCount_clientCount.graphql";

export function ClientCountWidget({ fragmentRef }: { fragmentRef: userClientCount_clientCount$key }) {
  const data = useFragment<userClientCount_clientCount$key>(CLIENT_COUNT_FRAGMENT, fragmentRef);
  const clientCount = data?.clientCount;
  return (
    <span className="row-span-1 lg:row-span-3 text-rose-600 lg:p-3 lg:bg-rose-500 rounded-md dark:lg:text-primary-foreground flex  flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full">
      <UserCircle2 className="lg:h-16 lg:w-16 mr-2 lg:mr-0" />
      <span className="font-semibold text-sm md:text-lg lg:mt-1">
        {clientCount} Client{clientCount !== 1 && "s"}
      </span>
    </span>
  );
}
ClientCountWidget.displayName = "ClientCountWidget";
