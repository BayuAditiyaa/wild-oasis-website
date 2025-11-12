import Link from "next/link";

function LoginMessage() {
  return (
    // DIPERBAIKI: Dibuat grid dan padding responsif
    <div className="grid bg-primary-800 place-items-center">
      <p className="text-center text-lg sm:text-xl py-12 px-4 self-center">
        Please{" "}
        <Link href="/login" className="underline text-accent-500">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
