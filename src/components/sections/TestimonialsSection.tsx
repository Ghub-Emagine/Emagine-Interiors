import { getPublishedTestimonials } from "@/lib/cms";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsSection() {
  const testimonials = await getPublishedTestimonials();
  if (testimonials.length === 0) return null;
  return <TestimonialsClient testimonials={testimonials} />;
}
