import Navbar from "@/components/navbar";
import RouteLoader from "../loading";
import { ReactNode } from "react";
import FireCursor from "@/components/nurui/fire-cursor";

export default function Notprotectedlayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
        <Navbar />
        <RouteLoader />
        {children}
        <FireCursor/>
    </div>
  );
}
