import Navbar from "@/components/navbar";


export default function Notprotectedlayout({ children }: { children: any }) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}
