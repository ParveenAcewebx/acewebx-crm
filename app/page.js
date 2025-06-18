import Image from "next/image";
import SubmitForm from "./submitform/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SubmitForm />
    </main>
  );
}
