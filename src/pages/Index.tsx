
import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TeamSection } from "@/components/home/TeamSection";
import { AppointmentModal } from "@/components/shared/AppointmentModal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load testimonials from localStorage
  useEffect(() => {
    const loadTestimonials = () => {
      const storedTestimonials = localStorage.getItem('testimonials');
      if (storedTestimonials) {
        setTestimonials(JSON.parse(storedTestimonials));
      }
    };
    
    loadTestimonials();
    
    // Listen for updates
    const handleStorageChange = () => {
      loadTestimonials();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('testimonials-updated', handleStorageChange as any);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('testimonials-updated', handleStorageChange as any);
    };
  }, []);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setCalendarLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <Services />
      
      {/* CTA Section with Embedded Calendly */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="flex flex-col">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Ready to Grow Your Social Media Presence?</h2>
              <p className="mt-2 text-primary-foreground/80 max-w-2xl mx-auto">
                Book a free strategy call now and discover how we can boost your brand's online visibility.
              </p>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div 
                className="calendly-inline-widget"
                data-url="https://calendly.com/growthstermedia/30min"
                style={{ minWidth: '320px', height: '630px' }}
              ></div>
            </div>
          </div>
        </Container>
      </section>
      
      <TeamSection />
      
      {/* Testimonials Section */}
      <section className="section-padding bg-secondary/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">
              Hear from businesses that have transformed their social media presence with Growthstermedia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border shadow-sm fade-in-section">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mr-4">
                    <span className="font-semibold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "{testimonial.testimonial}"
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Join Our Success Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </Container>
      </section>
      
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
};

export default Index;
