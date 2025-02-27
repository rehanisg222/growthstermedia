
import { ArrowRight, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Hero() {
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    if (password === "mikeisthebest") {
      setShowPasswordModal(false);
      setPassword("");
      navigate("/admin");
      toast.success("Admin access granted");
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-border bg-secondary text-sm font-medium animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Transforming social media presence since 2023
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Elevate Your Brand With Strategic Social Media Marketing
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            We help businesses grow their audience, increase engagement, and drive conversions through data-driven social media strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-secondary hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Our Services
            </Link>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-secondary hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Lock className="mr-2 h-4 w-4" />
              Admin Panel
            </button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative glass p-8 md:p-10 rounded-xl shadow-glass animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">$170,000</h2>
              <p className="text-muted-foreground text-lg">Revenue Generated</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">500+</h2>
              <p className="text-muted-foreground text-lg">Happy Clients</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Admin Authentication</h3>
            <p className="text-muted-foreground mb-4">Please enter your password to access the admin panel.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-md border border-input bg-background mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handleAdminAccess()}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded-md border border-input"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminAccess}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
