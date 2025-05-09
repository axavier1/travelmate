import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="text-gray-800">
      {/* About Section */}
      <section className="sm:flex items-center max-w-screen-xl mx-auto px-4 py-16">
        <div className="sm:w-1/2 p-4">
          <div className="image object-center text-center">
            <Image
              className="rounded-lg"
              src="/aboutimage.jpg"
              alt="Travel"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="sm:w-1/2 p-4">
          <h2 className="my-4 font-bold text-3xl sm:text-4xl text-gray-800">
            About <span className="text-green-600">TravelMate</span>
          </h2>
          <p>
            At <span className="text-green-600">TravelMate</span>, we believe that every journey is
            an opportunity for adventure, discovery, and unforgettable experiences. Our platform is
            designed to ignite your wanderlust, inspire your next trip, and connect you with
            like-minded explorers. Discover destinations, share stories, and build your travel
            tribe.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Key Features</h1>
        <h5 className="text-xl font-semibold text-gray-700 mb-10">
          Discover What <span className="text-green-600">TravelMate</span> Has to Offer
        </h5>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {[
            {
              title: "Travel Tips",
              desc: "Share and discover insider travel tips from fellow adventurers.",
              img: "/airplane.jpg",
            },
            {
              title: "Collaborative Planning",
              desc: "Plan your trips with friends and create unforgettable memories together.",
              img: "/large-group-of-happy-friends-in-mountains-area-royalty-free-image-1653422631.jpg",
            },
            {
              title: "Adventure Insights",
              desc: "Gain valuable insights and recommendations for your next adventure.",
              img: "/thumbnail.jpeg",
            },
            {
              title: "Inspiring Stories",
              desc: "Read and share inspiring travel stories that ignite your wanderlust.",
              img: "mtn-snow-1.jpg",
              cta: "/tours",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >

              <div className="p-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h5>
                <p className="mb-3 text-gray-700 dark:text-gray-400">{feature.desc}</p>
                {feature.cta && (
                  <Link
                    href={feature.cta}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Go to Tours
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join <span className="text-green-600">TravelMate</span> Today!
          </h2>
          <p className="text-xl text-gray-600">
            Explore the world and make amazing memories with friends!
          </p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white rounded-lg shadow-lg p-6 text-center">
            <div>
              <dd className="text-5xl font-bold text-gray-700">10K+</dd>
              <dt className="text-gray-500 mt-2">Happy Travelers</dt>
            </div>
            <div>
              <dd className="text-5xl font-bold text-gray-700">500+</dd>
              <dt className="text-gray-500 mt-2">Adventurous Destinations</dt>
            </div>
            <div>
              <dd className="text-5xl font-bold text-gray-700">1M+</dd>
              <dt className="text-gray-500 mt-2">Memorable Moments</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-slate-50 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            See What Our Adventurers Have to Say
          </h2>
        </div>

        <div className="mt-16 grid gap-8 max-w-6xl mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "TravelMate made planning my trip a breeze! I loved every moment of it.",
              name: "Sheryl Berge",
              avatar: "https://randomuser.me/api/portraits/men/15.jpg",
            },
            {
              quote:
                "I never knew travel planning could be this fun and easy. Thanks, TravelMate!",
              name: "Leland Kiehn",
              avatar: "https://randomuser.me/api/portraits/women/15.jpg",
            },
            {
              quote:
                "TravelMate helped me create unforgettable memories with my friends. It's a game-changer!",
              name: "Peter Renolds",
              avatar: "https://randomuser.me/api/portraits/men/10.jpg",
            },
          ].map((testimonial, index) => (
            <figure
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md text-left flex flex-col justify-between h-full"
            >
              <blockquote className="mb-4 text-lg text-gray-800">
                <span className="text-green-600">“</span>
                {testimonial.quote}
                <span className="text-green-600">”</span>
              </blockquote>
              <figcaption className="flex items-center justify-between pt-4 border-t">
                <div className="text-base font-semibold text-gray-900">{testimonial.name}</div>
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      <section className="flex justify-center py-12 bg-white">
        <Link
          href="/login"
          className="bg-green-600 text-white hover:bg-green-500 py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Start Your Journey
        </Link>
      </section>
    </main>
  );
}
