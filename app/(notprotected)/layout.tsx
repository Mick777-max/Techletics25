import Navbar from "@/components/navbar";
import RouteLoader from "../loading";


export default function Notprotectedlayout({ children }: { children: any }) {
  return (
    <div>
      <Navbar/>
      <RouteLoader/>
      {children}
    </div>
  )
}
