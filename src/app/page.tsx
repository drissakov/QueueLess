import Link from "next/link";

import { Button } from "@/components/ui/button";

const benefits = [
  {
    label: "01",
    title: "One clear calendar",
    description: "Keep appointments, availability, and customer details in one calm workspace.",
  },
  {
    label: "02",
    title: "Less back-and-forth",
    description: "Give customers a simple booking flow that works around your real availability.",
  },
  {
    label: "03",
    title: "Built for small teams",
    description: "Start with the essentials and grow into the workflows your business actually needs.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-32 lg:pt-28">
        <div className="absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="max-w-2xl self-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Appointments, made lighter
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-6xl">
            Give every customer a better time to visit.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            QueueLess is the focused appointment platform for small businesses that want fewer phone calls, fewer no-shows, and more time doing great work.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#how-it-works">See how it works</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#for-businesses">Built for small teams</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Stage 1 foundation ready for the booking engine.
          </p>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute right-6 top-2 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative w-full max-w-md rounded-[2rem] border border-border bg-card p-4 shadow-[0_24px_80px_-32px_rgba(39,36,78,0.45)]">
            <div className="rounded-[1.5rem] bg-primary p-6 text-primary-foreground">
              <div className="flex items-center justify-between text-sm text-primary-foreground/70">
                <span>Tuesday, October 13</span>
                <span>9:41 AM</span>
              </div>
              <div className="mt-14">
                <p className="text-sm text-primary-foreground/70">Your next opening</p>
                <p className="mt-1 text-4xl font-semibold tracking-tight">10:30 AM</p>
                <p className="mt-2 text-sm text-primary-foreground/70">45 minutes · Consultation</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              {[
                ["Mon", "12"],
                ["Tue", "13"],
                ["Wed", "14"],
              ].map(([day, date], index) => (
                <div
                  key={day}
                  className={`rounded-2xl border px-3 py-4 text-center ${index === 1 ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <p className="text-xs font-medium text-muted-foreground">{day}</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{date}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 pt-4 text-sm">
              <span className="text-muted-foreground">Next available slot</span>
              <span className="font-semibold text-accent">Book in seconds →</span>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border/80 bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">A calmer way to book</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The right amount of software for the work that matters.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.label} className="rounded-3xl border border-border bg-card p-7">
                <p className="text-sm font-semibold text-accent">{benefit.label}</p>
                <h3 className="mt-10 text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="for-businesses" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Made to grow with you</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start simple. Stay in control.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            The foundation is ready for secure authentication, a reliable data layer, and the booking workflows that come next.
          </p>
        </div>
        <Button asChild variant="secondary" size="lg">
          <Link href="/api/health">Check system health</Link>
        </Button>
      </section>
    </div>
  );
}
