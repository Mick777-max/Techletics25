import Navbar from "@/components/navbar";
import RouteLoader from "../loading";
import { ReactNode } from "react";


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
        {/* <SplashCursor/> */}
    </div>
  );
}
