import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account Page",
};

export default async function page() {
  const session = await auth();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-4">
      Welcome {session.user.name}
    </h2>
  );
}
