/**
 * JHARKHANDVASI PARIVARTAN SANGH (JPS)
 * Official Interactive Scripts
 * Standard: ₹50 Lakh Corporate-Grade NGO Digital Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PRELOADER DISMISSAL
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 400);
    });
    // Fallback if window load fired earlier
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 1200);
  }

  // 2. STICKY HEADER SCROLL EFFECT
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. MOBILE DRAWER NAVIGATION
  const mobileToggles = document.querySelectorAll('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = (e) => {
    if (e) e.preventDefault();
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileToggles.forEach(btn => btn.addEventListener('click', openDrawer));
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // 4. ACTIVE PAGE NAV HIGHLIGHTING
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.toLowerCase();
    if (
      (currentPath.endsWith(cleanHref) && cleanHref !== '/' && cleanHref !== 'index.html') ||
      ((currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') && (cleanHref === '/' || cleanHref === 'index.html'))
    ) {
      link.classList.add('active');
    }
  });

  // 5. CINEMATIC HERO SLIDESHOW (3-SECOND AUTO TRANSITION)
  const slides = document.querySelectorAll('.hero-slide');
  const currentCounter = document.querySelector('.hero-counter-current');
  const totalCounter = document.querySelector('.hero-counter-total');
  const progressBar = document.querySelector('.hero-progress-bar');
  const prevBtn = document.querySelector('.hero-arrow-btn.prev');
  const nextBtn = document.querySelector('.hero-arrow-btn.next');

  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval = null;
    const slideDuration = 4000; // 4 seconds for readability & cinematic feel

    if (totalCounter) {
      totalCounter.textContent = String(totalSlides).padStart(2, '0');
    }

    const resetProgressBar = () => {
      if (!progressBar) return;
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      setTimeout(() => {
        progressBar.style.transition = `width ${slideDuration}ms linear`;
        progressBar.style.width = '100%';
      }, 50);
    };

    const goToSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      currentSlide = index;
      if (currentCounter) {
        currentCounter.textContent = String(currentSlide + 1).padStart(2, '0');
      }
      resetProgressBar();
    };

    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % totalSlides;
      goToSlide(nextIndex);
    };

    const prevSlide = () => {
      const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(prevIndex);
    };

    const startSlideshow = () => {
      resetProgressBar();
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideDuration);
    };

    const stopSlideshow = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
      });
    }

    const heroSection = document.querySelector('.hero-slider-section');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopSlideshow);
      heroSection.addEventListener('mouseleave', startSlideshow);
    }

    // Initialize first slide
    goToSlide(0);
    startSlideshow();
  }

  // 6. ANIMATED STATISTICS COUNTER
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length > 0) {
    let countersStarted = false;
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target.toLocaleString('en-IN');
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current).toLocaleString('en-IN');
        }
      }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          counters.forEach(animateCounter);
        }
      });
    }, { threshold: 0.3 });

    const statsBanner = document.querySelector('.stats-banner') || counters[0];
    if (statsBanner) statsObserver.observe(statsBanner);
  }

  // 7. LIGHTBOX MODAL
  const lightboxOverlay = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCap = document.getElementById('lightboxCaption');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightboxOverlay && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const captionH = item.querySelector('.gallery-caption-overlay h4');
        const captionP = item.querySelector('.gallery-caption-overlay p');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'JPS Gallery Image';
          if (lightboxCap) {
            lightboxCap.textContent = (captionH ? captionH.textContent + ' — ' : '') + (captionP ? captionP.textContent : '');
          }
          lightboxOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    const closeBtn = lightboxOverlay.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 8. GALLERY CATEGORY FILTER
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 20);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  // 9. EVENT DETAIL MODAL
  const eventModal = document.getElementById('eventDetailModal');
  const eventDetailBtns = document.querySelectorAll('.btn-view-event');
  if (eventModal && eventDetailBtns.length > 0) {
    const modalTitle = eventModal.querySelector('.modal-event-title');
    const modalDate = eventModal.querySelector('.modal-event-date');
    const modalLocation = eventModal.querySelector('.modal-event-location');
    const modalDesc = eventModal.querySelector('.modal-event-desc');
    const modalImg = eventModal.querySelector('.modal-event-img');

    eventDetailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.card-event');
        if (!card) return;

        const title = card.querySelector('.card-event-title')?.textContent || 'Community Event';
        const loc = card.querySelector('.card-event-location')?.textContent || 'Mumbai, Maharashtra';
        const desc = card.querySelector('.card-event-desc')?.textContent || '';
        const img = card.querySelector('.card-event-media img')?.src || '';
        const day = card.querySelector('.card-event-date-day')?.textContent || '';
        const month = card.querySelector('.card-event-date-month')?.textContent || '';

        if (modalTitle) modalTitle.textContent = title;
        if (modalDate) modalDate.textContent = `${day} ${month}`;
        if (modalLocation) modalLocation.textContent = loc;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalImg) modalImg.src = img;

        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeEventModal = () => {
      eventModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    const closeBtn = eventModal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeEventModal);
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) closeEventModal();
    });
  }

  // 10. STORY DETAIL MODAL
  const storyModal = document.getElementById('storyDetailModal');
  const storyDetailBtns = document.querySelectorAll('.btn-read-story');
  if (storyModal && storyDetailBtns.length > 0) {
    const storyTitle = storyModal.querySelector('.modal-story-title');
    const storyMeta = storyModal.querySelector('.modal-story-meta');
    const storyContent = storyModal.querySelector('.modal-story-body');
    const storyImg = storyModal.querySelector('.modal-story-img');

    storyDetailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.card-story');
        if (!card) return;

        const title = card.querySelector('.story-title')?.textContent || 'Field Report';
        const meta = card.querySelector('.story-meta')?.textContent || 'JPS Field Dispatch';
        const excerpt = card.querySelector('.story-excerpt')?.textContent || '';
        const fullText = card.getAttribute('data-full-story') || excerpt;
        const img = card.querySelector('.story-media img')?.src || '';

        if (storyTitle) storyTitle.textContent = title;
        if (storyMeta) storyMeta.textContent = meta;
        if (storyContent) storyContent.innerHTML = `<p>${fullText}</p>`;
        if (storyImg) storyImg.src = img;

        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeStoryModal = () => {
      storyModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    const closeBtn = storyModal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeStoryModal);
    storyModal.addEventListener('click', (e) => {
      if (e.target === storyModal) closeStoryModal();
    });
  }

  // 11. INTERACTIVE DONATION CALCULATOR
  const donationPresetBtns = document.querySelectorAll('.donation-preset-btn');
  const customAmountInput = document.getElementById('customDonationAmount');
  const impactText = document.getElementById('donationImpactSummary');
  const donationForm = document.getElementById('donationPledgeForm');

  const impacts = {
    '500': 'Provides 1 underprivileged child with a comprehensive school learning kit (notebooks, stationery, geometry box, bag).',
    '1000': 'Subsidizes free diagnostic health checkups, blood tests, and essential medications for 1 elderly senior citizen.',
    '2500': 'Supplies a full month of nutritious dry ration staples (rice, pulses, oil, spices) for a distressed migrant family.',
    '5000': 'Contributes directly to emergency medical rescue, trauma admission, and hospitalization assistance for a distressed laborer.',
    '10000': 'Helps fund critical migrant repatriation assistance or multi-family winter relief and emergency supplies.'
  };

  if (donationPresetBtns.length > 0) {
    donationPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        donationPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const amount = btn.getAttribute('data-amount');
        if (customAmountInput) customAmountInput.value = amount;
        if (impactText && impacts[amount]) {
          impactText.textContent = impacts[amount];
        }
      });
    });
  }

  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      donationPresetBtns.forEach(b => b.classList.remove('active'));
      const val = customAmountInput.value.trim();
      if (impacts[val]) {
        if (impactText) impactText.textContent = impacts[val];
      } else if (val && parseInt(val, 10) > 0) {
        if (impactText) impactText.textContent = `Your compassionate contribution of ₹${parseInt(val, 10).toLocaleString('en-IN')} directly empowers migrant welfare and community service.`;
      }
    });
  }

  // Handle Donation Pledge Submission
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('donorName')?.value.trim() || 'Supporter';
      const phone = document.getElementById('donorPhone')?.value.trim() || '';
      const email = document.getElementById('donorEmail')?.value.trim() || '';
      const amount = customAmountInput?.value.trim() || '1000';
      const cause = document.getElementById('donationCause')?.value || 'General Welfare & Emergency Fund';

      const successModal = document.getElementById('donationSuccessModal');
      if (successModal) {
        document.getElementById('receiptDonorName').textContent = name;
        document.getElementById('receiptAmount').textContent = `₹${parseInt(amount, 10).toLocaleString('en-IN')}`;
        document.getElementById('receiptCause').textContent = cause;
        successModal.classList.add('active');
      }

      // Prepare WhatsApp verification link
      const waMsg = encodeURIComponent(
        `Namaste Jharkhandvasi Parivartan Sangh,\n\nI have initiated a donation pledge of ₹${amount} for "${cause}".\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nPlease share official bank/UPI verification details. Thank you.`
      );
      const waLink = document.getElementById('waConfirmBtn');
      if (waLink) {
        waLink.href = `https://wa.me/919022288222?text=${waMsg}`;
      }
    });
  }

  // 12. VOLUNTEER & CONTACT FORM SUBMISSIONS
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vName')?.value.trim();
      const phone = document.getElementById('vPhone')?.value.trim();
      const city = document.getElementById('vCity')?.value.trim();
      const interest = document.getElementById('vInterest')?.value;

      const waMsg = encodeURIComponent(
        `Namaste Jharkhandvasi Parivartan Sangh,\n\nI want to volunteer with JPS.\nName: ${name}\nPhone: ${phone}\nLocation: ${city}\nArea of Interest: ${interest}\n\nLooking forward to contributing!`
      );
      window.open(`https://wa.me/919022288222?text=${waMsg}`, '_blank');

      alert(`Thank you, ${name}! Your volunteer interest has been received. Our team will contact you shortly.`);
      volunteerForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName')?.value.trim();
      const phone = document.getElementById('cPhone')?.value.trim();
      const subject = document.getElementById('cSubject')?.value.trim();
      const msg = document.getElementById('cMessage')?.value.trim();

      const waMsg = encodeURIComponent(
        `Namaste Jharkhandvasi Parivartan Sangh,\n\nNew Inquiry from Website:\nName: ${name}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${msg}`
      );
      window.open(`https://wa.me/919022288222?text=${waMsg}`, '_blank');

      alert(`Thank you, ${name}! Your message has been sent. We will respond within 24 hours.`);
      contactForm.reset();
    });
  }

  // 13. BACK TO TOP BUTTON
  const backToTop = document.querySelector('.btn-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 14. COPY TO CLIPBOARD HELPER
  const copyButtons = document.querySelectorAll('.btn-copy-clipboard');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Copied! ✓</span>';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      });
    });
  });
});
