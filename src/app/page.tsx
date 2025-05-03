import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="relative h-screen w-full text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Mountain background"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl font-extrabold tracking-tight">TRAVELMATE</h1>
        <p className="mt-4 text-lg max-w-xl">
          Your Journey, Your Way · Seamlessly Plan, Explore, and Cherish Every Mile.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full font-semibold transition"
        >
          What is TravelMate?
        </Link>
      </div>
    </section>
  );
}
