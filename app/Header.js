
import Link from "next/link";
import Image from "next/image";

export default function Header() {
     return (
          <div className="flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver align-center">
               <Link className="text-lg font-semibold" href={"/"}>JCIS Internet</Link>
               <ul className="flex gap-[40px] text-m align-middle text-center justify-center">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/client"}>Client</Link>
               </ul>
          </div>
     );
}