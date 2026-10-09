"use client";

import { use, useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import EventDetailSkeleton from "./Eventdetailskeleton";
import EventDetailError from "./Eventdetailerror";
import EventHero from "./Eventhero";
import EventDescription from "./Eventdescription";
import EventHeader from "./Eventheader";
import RegistrationCard from "./Registrationcard";
import { EventDetail, getEventById } from "./event";


type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params);
 
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const controller = new AbortController();
 
    setLoading(true);
    setError(null);
 
    getEventById(id, controller.signal)
      .then(setEvent)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
 
    return () => controller.abort();
  }, [id]);
 
  return (
    // Navbar & Footer sudah ada di layout kamu
    <main className="min-h-screen w-full bg-white px-6 py-6 text-slate-900 sm:px-10 lg:px-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Kegiatan", href: "/kegiatan" },
          { label: "Detail Acara" },
        ]}
      />
 
      <div className="mt-5">
        {loading && <EventDetailSkeleton />}
 
        {!loading && error && <EventDetailError message={error} />}
 
        {!loading && event && (
          <>
            <EventHero
              photo={event.photo}
              name={event.name}
              type={event.type}
            />
 
            <div className="mt-10 grid gap-10 pb-20 lg:grid-cols-[1fr_430px]">
              <div className="space-y-8">
                <EventHeader event={event} />
                <EventDescription desc={event.desc} objective={event.objective} />
              </div>
 
              <RegistrationCard event={event} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}