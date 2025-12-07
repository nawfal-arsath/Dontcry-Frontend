
import React, { useState, useEffect } from 'react';
import { Star, Upload, Mic, Activity, Zap, Shield, Heart, ChevronRight, Check, PlayCircle, Menu, X, Sparkles, Info } from 'lucide-react';

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWatchDemo = () => {
    window.open('https://youtu.be/Ui5VCULh_9s?si=CUF6oTFzPX-ED1jo', '_blank');
  };

  const testimonials = [
    {
      name: "Jesina-India",
      role: "New Mom",
      text: "Finally got sleep! Don't Cry helped me understand my baby's needs instantly. No more guessing games at 3 AM.",
      rating: 5
    },
    {
      name: "Nasrin-India",
      role: "Mom of Three",
      text: "This app is a lifesaver. It's like having a baby expert in your pocket! Highly recommend to all parents!",
      rating: 5
    },
    {
      name: "Priya-USA",
      role: "First Time Mom",
      text: "I was so anxious about not knowing what my baby needed. Don't Cry gave me confidence and peace of mind.",
      rating: 5
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleDetectClick = () => {
    window.location.href = '/Predict';
  };

  const handleFeatureClick = (tab) => {
    window.location.href = `/Predict?tab=${tab}`;
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Navbar */}
      <nav style={{...styles.navbar, ...(scrolled && styles.navbarScrolled)}}>
        <div style={styles.navbarContainer}>
          <div style={styles.navbarContent}>
            <div style={styles.navbarLogo}>
              <img 
                src="logo.png" 
                alt="DontCry AI Logo" 
                style={styles.navbarLogoImage}
              />
              <span style={styles.navbarLogoText}>DontCry ai</span>
            </div>
            
            <div style={styles.navbarMenu} className="navbarMenu">
              <button onClick={() => scrollToSection('features')} style={styles.navbarLink}>
                Features
              </button>
              <button onClick={handleDetectClick} style={styles.navbarLink}>
                Detect
              </button>
              <button onClick={() => scrollToSection('about')} style={styles.navbarLink}>
                About
              </button>
            </div>

            <button 
              style={styles.mobileMenuButton}
              className="mobileMenuButton"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu} className="mobileMenu">
            <button onClick={() => scrollToSection('features')} style={styles.mobileMenuLink}>
              Features
            </button>
            <button onClick={handleDetectClick} style={styles.mobileMenuLink}>
              Detect
            </button>
            <button onClick={() => scrollToSection('about')} style={styles.mobileMenuLink}>
              About
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <div style={styles.badgeDot} />
            <span>Trusted by Parents</span>
          </div>
          
          <h1 style={styles.heroTitle}>
            Know What Your<br />
            <span style={styles.heroGradient}> Baby Needs</span>
            <br />In Seconds
          </h1>
          
          <p style={styles.heroDescription}>
            AI-powered cry analysis that tells you instantly if your baby is hungry, tired, needs a diaper change, or just wants comfort. Simple. Accurate. Peace of mind.
          </p>
          
          <div style={styles.heroCTA}>
            <button style={styles.primaryButton} onClick={handleDetectClick}>
              Detect Now
              <ChevronRight size={18} />
            </button>
            <button style={styles.secondaryButton} onClick={handleWatchDemo}>
              <PlayCircle size={18} />
              Watch Demo
            </button>
          </div>
          
          <p style={styles.heroSubtext}>
            Free until March 1, 2026 • No credit card required
          </p>
        </div>

        {/* Hero Visual */}
        <div style={styles.heroVisual}>
          <div style={styles.mockupCard}>
            <div style={styles.mockupHeader}>
              <div style={styles.mockupDot} />
              <div style={styles.mockupDot} />
              <div style={styles.mockupDot} />
            </div>
            <div style={styles.mockupContent}>
              <Activity size={48} style={styles.mockupIcon} />
              <div style={styles.mockupText}>Analyzing cry pattern...</div>
              <div style={styles.mockupProgress}>
                <div style={styles.mockupProgressBar} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Three powerful ways to analyze</h2>
          <p style={styles.sectionSubtitle}>Choose the method that fits your moment</p>
        </div>

        <div style={styles.featuresGrid}>
          {[
            { 
              icon: Upload, 
              title: 'Upload Audio', 
              desc: 'Analyze recorded audio files instantly with detailed insights and historical tracking',
              tab: 'upload'
            },
            { 
              icon: Mic, 
              title: 'Live Recording', 
              desc: 'Capture and analyze in real-time through your device with immediate results',
              tab: 'record'
            },
            { 
              icon: Activity, 
              title: 'Continuous Monitoring', 
              desc: 'Background detection that learns patterns and alerts you to changes',
              tab: 'live'
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              style={styles.featureCard}
              onClick={() => handleFeatureClick(feature.tab)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.08)';
              }}
            >
              <div style={styles.featureIcon}>
                <feature.icon size={28} />
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
              <div style={styles.featureAction}>
                <span style={styles.featureActionText}>Try now</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" style={{...styles.section, ...styles.techSection}}>
        <div style={styles.techSectionHeader}>
          <h2 style={styles.techMainTitle}>Advanced Technology</h2>
        </div>
        
        <div style={styles.techContent}>
          {[
            { 
              number: '01',
              title: 'Acoustic Analysis', 
              desc: 'Our neural network processes complex audio patterns, identifying subtle variations in pitch, frequency, and rhythm that indicate specific needs.'
            },
            { 
              number: '02',
              title: 'Machine Learning', 
              desc: 'Trained on thousands of validated cry samples, our model continuously improves its accuracy through advanced deep learning algorithms.'
            },
            { 
              number: '03',
              title: 'Instant Insights', 
              desc: 'Real-time classification delivers immediate, actionable guidance—helping you respond to your baby needs with confidence.'
            }
          ].map((item, i) => (
            <div key={i} style={styles.techCard}>
              <div style={styles.techNumber}>{item.number}</div>
              <h3 style={styles.techCardTitle}>{item.title}</h3>
              <p style={styles.techCardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.testimonialBadge}>
            <div style={styles.testimonialBadgeDot} />
            <span>TESTIMONIALS</span>
          </div>
          <h2 style={styles.sectionTitle}>What Parents Are Saying</h2>
          <p style={styles.sectionSubtitle}>Join the happy parents who trust Don't Cry</p>
        </div>

        <div style={styles.testimonialContainer}>
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              style={{
                ...styles.testimonialCard,
                opacity: i === activeTestimonial ? 1 : 0,
                transform: i === activeTestimonial ? 'scale(1)' : 'scale(0.95)',
                position: i === activeTestimonial ? 'relative' : 'absolute',
                visibility: i === activeTestimonial ? 'visible' : 'hidden'
              }}
            >
              <div style={styles.testimonialQuote}>"</div>
              <p style={styles.testimonialText}>{testimonial.text}</p>
              <div style={styles.testimonialStars}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="#FCD34D" color="#FCD34D" />
                ))}
              </div>
              <div style={styles.testimonialAuthor}>
                <div>
                <div style={styles.testimonialName}>
                  {testimonial.name}
                  <svg width="14" height="18" viewBox="0 0 24 24" fill="none" style={{marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle'}}>
                    <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={styles.testimonialVerified}>
                  <svg width="12" height="15" viewBox="0 0 24 24" fill="none" style={{flexShrink: 0}}>
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                    <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.testimonialDots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              style={{
                ...styles.testimonialDot,
                backgroundColor: i === activeTestimonial ? '#8B5CF6' : '#D1D5DB',
                transform: i === activeTestimonial ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{...styles.section, ...styles.pricingSection}}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Simple, transparent pricing</h2>
          <p style={styles.sectionSubtitle}>Choose the plan that works for your family</p>
          <div style={styles.pricingBadge}>Available March 2026</div>
        </div>

        <div style={styles.pricingGrid}>
          {[
            { 
              name: 'Free', 
              price: '₹0', 
              period: '/forever',
              badge: 'Always Free',
              features: ['3 detections per day', 'All detection methods', 'Basic support', 'Community access'] 
            },
            { 
              name: 'Monthly', 
              price: '₹49', 
              period: '/month', 
              features: ['Unlimited analyses', 'All detection methods', 'History tracking', 'Email support'] 
            },
            { 
              name: '6 Months', 
              price: '₹299', 
              period: '/6 months', 
              save: 'Save ₹95 (24%)', 
              featured: true, 
              features: ['Everything in Monthly', 'Priority support', 'Advanced analytics', 'Export data'] 
            }
          ].map((plan, i) => (
            <div key={i} style={{...styles.pricingCard, ...(plan.featured && styles.pricingCardFeatured)}}>
              {plan.badge && <div style={styles.pricingAlwaysFree}>{plan.badge}</div>}
              {plan.featured && <div style={styles.pricingBest}>Best Value</div>}
              <h3 style={{...styles.pricingName, color: plan.featured ? 'white' : '#111827'}}>{plan.name}</h3>
              <div style={styles.pricingPrice}>
                <span style={{...styles.pricingAmount, color: plan.featured ? 'white' : '#111827'}}>{plan.price}</span>
                <span style={{...styles.pricingPeriod, color: plan.featured ? '#9CA3AF' : '#6B7280'}}>{plan.period}</span>
              </div>
              {plan.save && <div style={styles.pricingSave}>{plan.save}</div>}
              <ul style={styles.pricingFeatures}>
                {plan.features.map((feature, j) => (
                  <li key={j} style={{...styles.pricingFeature, color: plan.featured ? 'white' : '#6B7280'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{flexShrink: 0}}>
                      <circle cx="12" cy="12" r="10" fill={plan.featured ? '#8B5CF6' : '#10B981'} fillOpacity="0.2"/>
                      <path d="M9 12l2 2 4-4" stroke={plan.featured ? '#A78BFA' : '#10B981'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button style={plan.featured ? styles.pricingButtonFeatured : styles.pricingButton}>
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to understand your baby better?</h2>
          <p style={styles.ctaDescription}>
            Join thousands of parents who trust DontCry AI for confident, caring responses
          </p>
          <button style={styles.ctaButton} onClick={handleDetectClick}>
            Start Your Free Trial
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogo}>DontCry ai</h3>
            <p style={styles.footerTagline}>Trusted Intelligence. Confident Care.</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerEmail}>dontcrytech@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const keyframes = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 70%;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
    }
    50% {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
    }
  }

  @media (max-width: 1024px) {
    .navbarMenu {
      display: none !important;
    }
    .mobileMenuButton {
      display: flex !important;
    }
  }

  @media (min-width: 1025px) {
    .mobileMenuButton {
      display: none !important;
    }
    .mobileMenu {
      display: none !important;
    }
  }
`;

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  },
  navbarScrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
  },
  navbarContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 32px'
  },
  navbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px'
  },
  navbarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  navbarLogoImage: {
    width: '32px',
    height: '32px',
    objectFit: 'contain'
  },
  navbarLogoText: {
    letterSpacing: '-0.01em'
  },
  navbarMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px'
  },
  navbarLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0
  },
  mobileMenuButton: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'none',
    color: '#111827',
    cursor: 'pointer'
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '4px',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    animation: 'slideDown 0.3s ease-out',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  
  mobileMenuLink: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#4B5563',
    textDecoration: 'none',
    padding: '12px 16px',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    animation: 'fadeIn 0.4s ease-out',
  },
  hero: {
    position: 'relative',
    padding: '100px 20px 60px',
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '60px',
    alignItems: 'center',
    zIndex: 1
  },
  heroContent: {
    animation: 'fadeInUp 0.8s ease-out',
    textAlign: 'center'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    backgroundColor: '#F9FAFB',
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: '32px',
    border: '1px solid #E5E7EB'
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#10B981'
  },
  heroTitle: {
    fontSize: 'clamp(36px, 8vw, 72px)',
    fontWeight: '300',
    lineHeight: '1.25',
    color: '#111827',
    marginBottom: '32px',
    letterSpacing: '-0.03em'
  },
  heroGradient: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '400'
  },
  heroDescription: {
    fontSize: 'clamp(16px, 3vw, 21px)',
    lineHeight: '1.8',
    color: '#6B7280',
    marginBottom: '48px',
    maxWidth: '850px',
    margin: '0 auto 48px',
    fontWeight: '400',
    padding: '0 20px'
  },
  heroCTA: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: 'rgba(17, 24, 39, 0.85)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(17, 24, 39, 0.15)'
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    color: '#111827',
    border: '1px solid rgba(229, 231, 235, 0.8)',
    borderRadius: '16px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
  },
  heroSubtext: {
    fontSize: '14px',
    color: '#9CA3AF',
    marginBottom: '40px'
  },
  heroVisual: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
    padding: '0 20px'
  },
  mockupCard: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    border: '1px solid #F3F4F6',
    animation: 'glow 4s ease-in-out infinite'
  },
  mockupHeader: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px'
  },
  mockupDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB'
  },
  mockupContent: {
    textAlign: 'center',
    padding: '40px 16px'
  },
  mockupIcon: {
    color: '#8B5CF6',
    marginBottom: '20px',
    animation: 'pulse 2.5s ease-in-out infinite'
  },
  mockupText: {
    fontSize: '16px',
    color: '#6B7280',
    marginBottom: '24px',
    fontWeight: '500'
  },
  mockupProgress: {
    width: '100%',
    height: '6px',
    backgroundColor: '#F3F4F6',
    borderRadius: '100px',
    overflow: 'hidden'
  },
  mockupProgressBar: {
    height: '100%',
    width: '70%',
    background: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
    borderRadius: '100px',
    animation: 'progress 2.5s ease-in-out infinite'
  },
  section: {
    position: 'relative',
    padding: '60px 32px',
    maxWidth: '1400px',
    margin: '0 auto',
    zIndex: 1
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '64px'
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 6vw, 48px)',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '16px',
    letterSpacing: '-0.03em'
  },
  sectionSubtitle: {
    fontSize: 'clamp(16px, 2.5vw, 19px)',
    color: '#6B7280',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
    fontWeight: '400'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  featureCard: {
    padding: '48px 40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #F3F4F6',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
    cursor: 'pointer',
    position: 'relative'
  },
  featureIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    color: '#8B5CF6'
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '12px',
    letterSpacing: '-0.01em'
  },
  featureDesc: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.7',
    fontWeight: '400',
    marginBottom: '20px'
  },
  featureAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#8B5CF6',
    fontSize: '15px',
    fontWeight: '500',
    marginTop: 'auto'
  },
  featureActionText: {
    transition: 'all 0.2s ease'
  },
  techSection: {
    backgroundColor: '#FAFAFA'
  },
  techSectionHeader: {
    textAlign: 'center',
    marginBottom: '64px'
  },
  techMainTitle: {
    fontSize: 'clamp(32px, 6vw, 48px)',
    fontWeight: '500',
    color: '#111827',
    letterSpacing: '-0.03em'
  },
  techContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  techCard: {
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #F3F4F6',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
    animation: 'glow 4s ease-in-out infinite'
  },
  techNumber: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: '20px',
    letterSpacing: '0.05em'
  },
  techCardTitle: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '12px',
    letterSpacing: '-0.01em'
  },
  techCardDesc: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.7',
    fontWeight: '400'
  },
  testimonialBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '24px',
    letterSpacing: '0.05em'
  },
  testimonialBadgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#F59E0B'
  },
  testimonialContainer: {
    position: 'relative',
    maxWidth: '900px',
    margin: '0 auto',
    minHeight: '350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
testimonialCard: {
  padding: '48px 40px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
  border: '1px solid #F3F4F6',
  transition: 'all 0.5s ease',
  width: '100%',
  animation: 'glow 4s ease-in-out infinite'
},

testimonialVerified: {
  fontSize: '13px',
  color: '#3B82F6',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontWeight: '500'
},
  testimonialQuote: {
    fontSize: '64px',
    color: '#E5E7EB',
    lineHeight: '1',
    marginBottom: '16px',
    fontFamily: 'Georgia, serif'
  },
  testimonialText: {
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#374151',
    marginBottom: '28px',
    fontWeight: '400',
    fontStyle: 'italic'
  },
  testimonialStars: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px'
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  testimonialName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center'
  },
  testimonialRole: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '6px'
  },

  testimonialDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '36px'
  },
  testimonialDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  pricingSection: {
    backgroundColor: '#FAFAFA'
  },
  pricingBadge: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '8px 20px',
    backgroundColor: '#111827',
    color: 'white',
    borderRadius: '100px',
    fontSize: '14px',
    fontWeight: '500'
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginTop: '56px',
    maxWidth: '1100px',
    margin: '56px auto 0'
  },
  pricingCard: {
    position: 'relative',
    padding: '36px 28px',
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid #F3F4F6',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
    animation: 'glow 4s ease-in-out infinite'
  },
  pricingCardFeatured: {
    backgroundColor: '#111827',
    color: 'white',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    border: 'none'
  },
  pricingAlwaysFree: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '6px 18px',
    backgroundColor: '#10B981',
    color: 'white',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600'
  },
  pricingBest: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '6px 18px',
    backgroundColor: '#6366F1',
    color: 'white',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '600'
  },
  pricingName: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  pricingPrice: {
    marginBottom: '8px'
  },
  pricingAmount: {
    fontSize: '44px',
    fontWeight: '700'
  },
  pricingPeriod: {
    fontSize: '16px',
    color: '#6B7280',
    marginLeft: '8px'
  },
  pricingSave: {
    fontSize: '14px',
    color: '#059669',
    marginBottom: '24px'
  },
  pricingFeatures: {
    listStyle: 'none',
    marginBottom: '28px',
    padding: 0
  },
  pricingFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    marginBottom: '12px',
    color: '#6B7280'
  },
  pricingButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed'
  },
  pricingButtonFeatured: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#374151',
    color: '#D1D5DB',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed'
  },
  ctaSection: {
    position: 'relative',
    padding: '100px 20px',
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: 'white',
    textAlign: 'center',
    zIndex: 1
  },
  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.2',
    letterSpacing: '-0.02em'
  },
  ctaDescription: {
    fontSize: '18px',
    marginBottom: '40px',
    opacity: 0.95,
    maxWidth: '600px',
    margin: '0 auto 40px'
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '18px 40px',
    backgroundColor: 'white',
    color: '#6366F1',
    border: 'none',
    borderRadius: '12px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
  },
  footer: {
    position: 'relative',
    padding: '60px 20px 32px',
    backgroundColor: '#111827',
    color: 'white',
    zIndex: 1
  },
  footerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '40px',
    marginBottom: '48px'
  },
  footerBrand: {
    maxWidth: '100%'
  },
  footerLogo: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px'
  },
  footerTagline: {
    fontSize: '14px',
    color: '#9CA3AF',
    lineHeight: '1.6'
  },
  footerRight: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  footerEmail: {
    fontSize: '14px',
    color: '#9CA3AF'
  }
};