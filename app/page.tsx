// pages/index.js

"use client";

import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./globals.css";

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);
    
      if (!formRef.current) {
      // extra safety: no form element available
      setStatus({
        type: "error",
        message: "Form is not ready. Please try again.",
      });
      setIsSubmitting(false);
      return;
    }


    // Replace these with your actual EmailJS IDs
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  console.error("EmailJS env vars are missing");
  setStatus({
    type: "error",
    message: "Email setup is incomplete. Please try again later.",
  });
  setIsSubmitting(false);
  return;
}

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus({
            type: "success",
            message: "Thanks for your enquiry! We’ll get back to you shortly.",
          });
          setIsSubmitting(false);
          formRef.current?.reset();
        },
        () => {
          setStatus({
            type: "error",
            message:
              "Something went wrong while sending your enquiry. Please try again.",
          });
          setIsSubmitting(false);
        }
      );
  };

  const scrollToForm = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeadSection />
      <main className="page">
        <HeroSection onCtaClick={scrollToForm} />
        <ServicesSection />
        <AudioSamplesSection />
        <EnquirySection
          formRef={formRef}
          status={status}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
        <Footer />
      </main>
    </>
  );
}

function HeadSection() {
  return (
    <>
      <head>
        <title>Forecourt-Radio | Fuel Station Radio & Advertising</title>
        <meta
          name="description"
          content="Forecourt-Radio is a curated music and advertising radio service for service stations and fuel forecourts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://forecourtradio.com.au/bg4.jpg" />
      </head>
    </>
  );
}

type HeroSectionProps = {
  onCtaClick: () => void;
};

function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <header className="hero-header">
          <div className="logo">Forecourt-Radio</div>
          <nav className="hero-nav">
            <a href="#services">Services</a>
            <a href="#audio-samples">Samples</a>
            <a href="#enquiry-form">Enquire</a>
          </nav>
        </header>

        <div className="hero-main">
          <div className="hero-text">
            <h1>
              Turn your forecourt into
              <br />
              a revenue-driving radio.
            </h1>
            <p>
              Forecourt-Radio streams music and targeted advertising directly to
              your PA speakers, so customers enjoy their fill-up while your
              brand and partners get heard.
            </p>
            <button className="primary-btn" onClick={onCtaClick}>
              Enquire now
            </button>
          </div>
        </div>

        <div className="hero-badge">
          Designed for service stations &amp; fuel retailers
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="section section-light">
      <div className="container">
        <h2>What Forecourt-Radio Delivers</h2>
        <p className="section-intro">
          Create an on-brand sound experience while running highly targeted
          advertising to customers at the pump.
        </p>
        <div className="cards-grid">
          <ServiceCard
            title="Curated music for your brand"
            desc="Keep your forecourt sounding fresh with curated playlists matched to your brand and audience."
          />
          <ServiceCard
            title="Targeted advertising spots"
            desc="Run dynamic ad rotations for your own promotions or partner brands during key moments of the day."
          />
          <ServiceCard
            title="Smart day-part scheduling"
            desc="Schedule different mixes of music and ads for morning rush, daytime, and evening traffic."
          />
          <ServiceCard
            title="Centralised control"
            desc="Update messages, campaigns, and playlists remotely across multiple sites in just a few clicks."
          />
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  desc: string;
};

function ServiceCard({ title, desc }: ServiceCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// 🔊 Audio samples section
function AudioSamplesSection() {
  const samples = [
    {
      title: "Upbeat Forecourt Music Mix",
      description:
        "High-energy, feel-good tracks to keep customers in a good mood while they fuel up.",
      file: "/audio/rapsample.mp3",
      duration: "2:10 demo",
    },
    {
      title: "Promotional Spot – Fuel Discount",
      description:
        "Sample promotional message highlighting a time-limited discount on fuel or in-store offers.",
      file: "/audio/promo_sample.mp3",
      duration: "2:10 demo",
    },
     {
      title: "A Moment To Puase",
      description:
        "A calming, atmospheric message designed to create a brief moment of relaxation for customers as they pause during their refuel experience.",
      file: "/audio/sample3.mp3",
      duration: "1:30 demo",
    },
    
  ];

  return (
    <section
      id="audio-samples"
      className="section section-dark section-audio"
    >
      <div className="container audio-container">
        <div className="audio-header">
          <h2>Hear Forecourt-Radio in Action</h2>
          <p>
            Press play to hear examples of the kind of music, messages, and ad
            breaks we can run across your forecourt PA system.
          </p>
        </div>

        <div className="audio-grid">
          {samples.map((sample) => (
            <div key={sample.title} className="audio-card">
              <div className="audio-card-text">
                <h3>{sample.title}</h3>
                <p>{sample.description}</p>
                {sample.duration && (
                  <span className="audio-duration">{sample.duration}</span>
                )}
              </div>
              <audio
                className="audio-player"
                controls
                preload="none"
                src={sample.file}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type EnquiryProps = {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  status: { type: string; message: string };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function EnquirySection({
  formRef,
  status,
  isSubmitting,
  onSubmit,
}: EnquiryProps) {
  return (
    <section id="enquiry-form" className="section section-dark">
      <div className="container form-container">
        <div className="form-text">
          <h2>Enquire about Forecourt-Radio</h2>
          <p>
            Tell us a little about your service station or network and we’ll
            come back with options for music, advertising packages, and
            rollout.
          </p>
          <ul>
            <li>Flexible pricing for single sites &amp; chains</li>
            <li>Content &amp; advertising tailored to your brand</li>
            <li>Technical support for PA speaker integration</li>
          </ul>
           <div className="contact-direct">
            <h3>Contact us directly</h3>
            <p>Prefer email or a quick call? Reach us on:</p>
            <a
              href="mailto:hello@forecourt-radio.com.au"
              className="contact-link"
            >
              info@forecourt-radio.com
            </a>
            <a href="tel:+61400000000" className="contact-link">
              (08) 9368 7553
            </a>
          </div>
        </div>

        <form ref={formRef} className="form" onSubmit={onSubmit}>
          <div className="field-group">
            <label htmlFor="name">Name*</label>
            <input id="name" name="user_name" type="text" required />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email*</label>
            <input id="email" name="user_email" type="email" required />
          </div>

          <div className="field-group">
            <label htmlFor="business">Business / Station Name</label>
            <input id="business" name="user_business" type="text" />
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="user_phone" type="tel" />
          </div>

          <div className="field-group">
            <label htmlFor="message">Message*</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your sites, locations, and what you’d like to achieve."
            />
          </div>

          <button
            className="primary-btn full-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send enquiry"}
          </button>

          {status.message && (
            <p className={`status status-${status.type}`}>{status.message}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Forecourt-Radio</span>
        <span>Powered by CaptivateConnect</span>
      </div>
    </footer>
  );
}


