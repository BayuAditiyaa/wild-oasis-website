import SideNavigation from "@/app/_components/SideNavigation";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <Suspense fallback={<Spinner />}>
        <div className="py-1">{children}</div>
      </Suspense>
    </div>
  );
}
