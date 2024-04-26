import Head from "next/head";
import SimonGame from "../components/SimonGame";
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simon Says Game</title>
        <meta
          name="description"
          content="Play Simon Says with Next.js and Redux"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="text-4xl font-bold text-center p-4 bg-blue-500 text-white">
          Simon Says Game
        </h1>
      </header>

      <main className="flex justify-center items-center h-screen">
        <SimonGame />
      </main>
    </div>
  );
}
