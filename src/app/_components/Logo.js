import Image from "next/image";
import Link from "next/link";
import logoImg from "@/app/image/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image src={logoImg} height="60" width="60" alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
