import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 py-2 place-items-center gap-y-10">
      <div className="col-span-1 text-4xl md:px-10 font-Inter grid gap-y-4">
        <p className="font-bold">
          Invest with confidence while{" "}
          <span className="text-green-600 ">making a difference</span>
        </p>
        <p className="text-xl">
          Advancing Sustainable Investing with AI: Pioneering Predictive
          Analytics in Green Finance
        </p>
      </div>
      <div className="col-span-1">
        <Image
          src="/assets/images/Hero.png"
          alt="Hero"
          width="500"
          height="400"
        />
      </div>
    </section>
  );
}
