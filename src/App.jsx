import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import BlogBanner from './components/BlogBanner.jsx';
import Services from './components/Services.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Dialog from './components/Dialog.jsx';
import ServiceContent from './components/ServiceContent.jsx';
import JournalContent from './components/JournalContent.jsx';
import { services } from './data/site.js';

export default function App() {
  const [dialog, setDialog] = useState(null);

  const closeDialog = () => setDialog(null);
  const openService = (id) => setDialog({ type: id ? 'service' : 'services', id });
  const openJournal = () => setDialog({ type: 'journal' });

  const activeService =
    dialog?.type === 'service' ? services.find((service) => service.id === dialog.id) : null;

  const dialogTitle =
    dialog?.type === 'journal'
      ? 'Mother & Blog'
      : activeService
        ? activeService.title
        : 'Services in detail';

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <BlogBanner onOpenJournal={openJournal} />
        <Services onOpenService={openService} />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Dialog open={Boolean(dialog)} onClose={closeDialog} title={dialog ? dialogTitle : ''}>
        {dialog?.type === 'journal' && <JournalContent />}
        {(dialog?.type === 'service' || dialog?.type === 'services') && (
          <ServiceContent service={activeService} onClose={closeDialog} />
        )}
      </Dialog>
    </>
  );
}
