import * as Icons from "lucide-react";

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ];
  return Cmp ? <Cmp className={className} /> : null;
}
