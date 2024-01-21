import { Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFragment } from "react-relay";
import { PROJECT_CLIENT_FRAGMENT } from "@/features/project/project";

export function ProjectClientInfo({ fragmentRef }: { fragmentRef: any }) {
  const client = useFragment(PROJECT_CLIENT_FRAGMENT, fragmentRef);

  const { name, email, phone } = client;

  return (
    <div className="px-3 space-y-2">
      <div className="inline-flex items-center gap-2">
        <p className="text-2xl font-semibold">Client</p>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <p className="text-lg inline-flex items-center gap-2 col-span-12">
          <span>
            Name: <span className="font-light">{name}</span>
          </span>
        </p>

        <p className="text-lg inline-flex items-center gap-2 col-span-11">
          <span>
            E-mail: <span className="font-light">{email}</span>
          </span>
        </p>
        <div className="col-span-1">
          <Button variant="outline" className="font-semibold gap-3 float-right w-28" asChild>
            <a href={`mailto:${email}`}>
              <Mail strokeWidth={2} className="h-5 w-5" />
              Email
            </a>
          </Button>
        </div>
        <p className="text-lg inline-flex items-center gap-2 col-span-11">
          <span>
            Phone: <span className="font-light">{phone}</span>
          </span>
        </p>
        <div className="col-span-1">
          <Button variant="outline" className="font-semibold gap-3 float-right w-28" asChild>
            <a href={`tel:${phone}`}>
              <PhoneCall strokeWidth={2} className="h-5 w-5" />
              Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
