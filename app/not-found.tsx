import { Img as Image } from "@/components/ui/img";
import { Molecule } from "@/components/molecules/molecule";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";

export default function NotFound() {
  return (
    <section data-hero="" className="relative isolate flex min-h-svh items-center overflow-hidden surface-soft">
      <Image
        src={images.complex.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-90"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f7faff_0%,rgb(247_250_255/0.96)_45%,rgb(247_250_255/0.55)_100%)]" />
      <div className="bg-grid-light absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div className="container-x grid items-center gap-12 py-32 lg:grid-cols-2">
        <div>
          <p className="font-display text-[clamp(6rem,18vw,12rem)] leading-none font-bold tracking-tighter text-transparent [-webkit-text-stroke:2px_rgb(30_99_214/0.75)]">
            404
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink">This page has evaporated.</h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-body">
            The page you are looking for may have been moved or no longer exists.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Back to Home</Button>
            <Button href="/products" variant="glass">
              View Products
            </Button>
          </div>
        </div>
        <div className="hidden animate-float lg:block">
          <div className="mx-auto max-w-sm opacity-80">
            <Molecule name="other" tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
