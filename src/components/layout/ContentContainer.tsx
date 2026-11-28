import type { ReactNode } from "react";

export const contentContainerClassName = "mx-auto w-full max-w-7xl px-4 sm:px-10 lg:px-12";

export default function ContentContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${contentContainerClassName} ${className}`}>{children}</div>;
}
