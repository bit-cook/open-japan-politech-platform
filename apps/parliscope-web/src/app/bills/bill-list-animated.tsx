"use client";

import { StaggerGrid, StaggerItem } from "@ojpp/ui";
import type { ReactNode } from "react";

export function BillListAnimated({ children }: { children: ReactNode[] }) {
  return (
    <StaggerGrid className="space-y-3">
      {children.map((child, i) => (
        <StaggerItem key={i}>{child}</StaggerItem>
      ))}
    </StaggerGrid>
  );
}
