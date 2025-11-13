import SideNavigation from "@/app/_components/SideNavigation";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] h-full md:gap-12">
      <SideNavigation />
      <Suspense fallback={<Spinner />}>
      <div className="py-1 pb-24 md:pb-1 px-4 md:px-0">{children}</div>
      </Suspense>
    </div>
  );
}
