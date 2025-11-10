import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import { auth } from "@/app/_lib/auth";

async function Header() {
    const session = await auth();
    console.log(session);
  
  return (
    <header className="border-b border-primary-900 px-8 py-5 relative z-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation session={session}/>
      </div>
    </header>
  );
}

export default Header;
