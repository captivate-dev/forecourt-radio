// pages/index.js

"use client";

import { useRef, useState } from "react";
import emailjs from "emailjs-com";

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
      <style jsx global>{globalStyles}</style>
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
      title: "Music + Ad Break Example",
      description:
        "A short blend of music followed by a clean advertising slot, as it might sound on your forecourt.",
      file: "/audio/mixed-break-music-plus-ad.mp3",
      duration: "0:45 demo",
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
        <span>Powered by Captivate Futuristic Workspace</span>
      </div>
    </footer>
  );
}

const globalStyles = `
  :root {
    --bg-dark: #050509;
    --bg-darker: #020208;
    --bg-light: #f5f5f7;
    --primary: #ff5a3c;
    --primary-soft: rgba(255, 90, 60, 0.1);
    --text-main: #fdfdfd;
    --text-muted: #c4c4cf;
    --border-subtle: rgba(255,255,255,0.08);
    --radius-lg: 18px;
    --radius-xl: 26px;
    --shadow-soft: 0 18px 45px rgba(0,0,0,0.45);
    --container-width: 1100px;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
    background: var(--bg-dark);
    color: var(--text-main);
    scroll-behavior: smooth;
  }

  .page {
    min-height: 100vh;
    background: radial-gradient(circle at top left, #1b1225, #050509 55%, #020208);
  }

  .hero {
    position: relative;
    height: 100vh;
    min-height: 640px;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
    color: var(--text-main);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.92)),
      url("/bg4.jpg"); /* or /bg.png if that's your file */
    background-size: cover;
    background-position: center;
    filter: grayscale(0.1);
    opacity: 0.9;
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 24px 20px 40px;
    max-width: var(--container-width);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hero-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .logo {
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 13px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.25);
    background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
    backdrop-filter: blur(14px);
  }

  .hero-nav a {
    margin-left: 18px;
    font-size: 13px;
    text-decoration: none;
    color: var(--text-muted);
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .hero-nav a:hover {
    color: #ffffff;
    border-color: rgba(255,255,255,0.5);
  }

  .hero-main {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .hero-text {
    max-width: 520px;
    padding: 24px 20px;
    border-radius: var(--radius-xl);
    background: radial-gradient(circle at top, rgba(0,0,0,0.75), rgba(0,0,0,0.9));
    border: 1px solid var(--border-subtle);
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(16px);
  }

  .hero-text h1 {
    margin: 0 0 18px;
    font-size: clamp(32px, 5vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.02em;
  }

  .hero-text p {
    margin: 0 0 24px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-muted);
  }

  .primary-btn {
    border: none;
    cursor: pointer;
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    background: radial-gradient(circle at 0% 0%, #ffb199, #ff5a3c);
    color: #050509;
    box-shadow: 0 10px 30px rgba(255,90,60,0.45);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  }

  .primary-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 35px rgba(255,90,60,0.55);
    filter: brightness(1.05);
  }

  .primary-btn:active {
    transform: translateY(0);
    box-shadow: 0 6px 18px rgba(255,90,60,0.4);
  }

  .primary-btn:disabled {
    opacity: 0.7;
    cursor: default;
    box-shadow: none;
  }

  .hero-badge {
    align-self: flex-start;
    margin-top: 14px;
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 999px;
    background: rgba(0,0,0,0.75);
    border: 1px solid rgba(255,255,255,0.12);
    color: var(--text-muted);
    backdrop-filter: blur(14px);
  }

  .section {
    padding: 80px 20px;
  }

  .section-light {
    background: var(--bg-light);
    color: #14141a;
  }

  .section-dark {
    background: radial-gradient(circle at top right, #171225, #050509 55%, #020208);
  }

  /* Background image for audio section */
  .section-audio {
    position: relative;
    overflow: hidden;
    background: transparent;
  }

  .section-audio::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(
        to bottom right,
        rgba(0, 0, 0, 0.45),
        rgba(0, 0, 0, 0.70)
      ),
      url("/bg3.jpg"); /* change if your file has a different name */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.9;
    z-index: 0;
  }

  .section-audio .container {
    position: relative;
    z-index: 1;
  }

  .container {
    max-width: var(--container-width);
    margin: 0 auto;
  }

  .section h2 {
    margin: 0 0 12px;
    font-size: 28px;
    letter-spacing: -0.02em;
  }

  .section-intro {
    margin: 0 0 32px;
    font-size: 15px;
    color: #4a4a57;
    max-width: 560px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }

  .card {
    border-radius: var(--radius-lg);
    background: #ffffff;
    padding: 18px 18px 20px;
    box-shadow: 0 10px 26px rgba(18, 24, 58, 0.08);
    border: 1px solid rgba(0,0,0,0.06);
  }

  .card h3 {
    margin: 0 0 10px;
    font-size: 16px;
  }

  .card p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #55556a;
  }

  /* 🔊 Audio samples section */
  .audio-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .audio-header h2 {
    margin-bottom: 10px;
  }

  .audio-header p {
    max-width: 580px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-muted);
  }

  .audio-grid {
    margin-top: 4px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 per row */
    gap: 24px;
  }

  .audio-card {
    border-radius: 22px;
    padding: 22px 22px 18px;
    background: radial-gradient(circle at top left, rgba(13, 15, 35, 0.95), rgba(5, 5, 15, 0.98));
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .audio-card-text h3 {
    margin: 0 0 6px;
    font-size: 17px;
  }

  .audio-card-text p {
    margin: 0 0 6px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-muted);
  }

  .audio-duration {
    display: inline-block;
    margin-top: 2px;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.75);
  }

  .audio-player {
    width: 100%;
    margin-top: 2px;
  }

  .form-container {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 32px;
    align-items: flex-start;
  }

  .form-text p {
    margin-top: 6px;
    margin-bottom: 14px;
    font-size: 14px;
    color: var(--text-muted);
  }

  .form-text ul {
    padding-left: 18px;
    margin: 0;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }

  .form {
    padding: 20px 20px 22px;
    border-radius: var(--radius-xl);
    background: rgba(5,5,15,0.88);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(18px);
  }

  .field-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
  }

  .field-group label {
    font-size: 13px;
    margin-bottom: 4px;
    color: var(--text-muted);
  }

  .field-group input,
  .field-group textarea {
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.18);
    padding: 8px 10px;
    font-size: 14px;
    background: rgba(4,4,10,0.9);
    color: var(--text-main);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .field-group input::placeholder,
  .field-group textarea::placeholder {
    color: rgba(255,255,255,0.3);
  }

  .field-group input:focus,
  .field-group textarea:focus {
    border-color: rgba(255,90,60,0.7);
    box-shadow: 0 0 0 1px rgba(255,90,60,0.6);
    background: rgba(7,7,16,0.96);
  }

  .full-width {
    width: 100%;
    margin-top: 4px;
  }

  .status {
    margin-top: 10px;
    font-size: 13px;
  }

  .status-success {
    color: #7fda89;
  }

  .status-error {
    color: #ff8a7a;
  }

  .footer {
    padding: 18px 20px 24px;
    background: #020207;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 12px;
    color: rgba(255,255,255,0.45);
  }

  .footer-inner {
    max-width: var(--container-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

    .contact-direct {
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.15);
  }

  .contact-direct h3 {
    margin: 0 0 6px;
    font-size: 14px;
  }

  .contact-direct p {
    margin: 0 0 6px;
    font-size: 13px;
    color: var(--text-muted);
  }

  .contact-link {
    display: block;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none;
    margin-bottom: 4px;
  }

  .contact-link:hover {
    text-decoration: underline;
  }


  @media (max-width: 960px) {
    .cards-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .audio-grid {
      grid-template-columns: minmax(0, 1fr); /* 1 per row on tablets */
    }

    .form-container {
      grid-template-columns: minmax(0, 1fr);
    }

    .hero-text {
      max-width: 100%;
    }
  }

  @media (max-width: 640px) {
    .hero {
      height: auto;
      min-height: 620px;
    }

    .hero-content {
      padding-top: 18px;
      padding-bottom: 28px;
    }

    .hero-header {
      flex-direction: row;
    }

    .hero-nav a {
      margin-left: 10px;
      font-size: 12px;
    }

    .cards-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .audio-grid {
      grid-template-columns: minmax(0, 1fr); /* 1 per row on phones */
    }

    .section {
      padding: 56px 18px;
    }

    .form {
      padding: 16px 14px 18px;
    }
  }
`;
