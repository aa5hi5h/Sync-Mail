import { Button } from "@/components/ui/button";
import Image from "next/image";
import checking from "../../public/checking.jpg"
import Link from "next/link";
import TryButton from "@/components/TryButton";

export default function Home() {
  return (
    <div className="p-3">
      <div className="flex justify-around max-w-5xl mx-auto w-full h-full ">
        <div className="flex flex-col  space-y-8">
          <div className="text-4xl pt-28 font-medium space-y-1">
            <h1>Secure,Smart,</h1><h1 className=" tracking-tight">and easy way to</h1>
           <h1>sort your email</h1></div>
           <TryButton />
        </div>
        <div className="relative  w-[520px] h-[480px]">
        <Image src={checking} fill className="object-contain" alt="Background Image" />
        </div>
      </div>
    </div>
  );
}
