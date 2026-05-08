document.addEventListener('DOMContentLoaded', () => {

  // ── Lenis smooth scroll ──
  const lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 0.85 });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── Navbar ──
  window.addEventListener('scroll', () => document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 60), { passive: true });

  // ── Hero parallax ──
  gsap.to('.hero-bg', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // ── Counter animation ──
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target, suffix = el.dataset.suffix || '';
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => {
      gsap.to({ v: 0 }, { v: target, duration: 2, ease: 'power3.out', onUpdate() { el.textContent = Math.floor(this.targets()[0].v) + suffix; } });
    }});
  });

  // ══════════════════════════════════════════════════════
  // ── CINEMATIC PINNED COUNTRY SECTIONS ──
  // Each country pins in place. User scrolls through 2-3
  // images with zoom/parallax before moving to next country.
  // ══════════════════════════════════════════════════════
  document.querySelectorAll('.country-panel').forEach(panel => {
    const imgs = panel.querySelectorAll('.panel-img');
    const info = panel.querySelector('.panel-info');
    const visual = panel.querySelector('.panel-visual');
    const imgCount = imgs.length;

    // Pin this panel for extended scroll distance
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top top',
        end: `+=${imgCount * 100}%`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1
      }
    });

    // Start: all images stacked, first visible
    gsap.set(imgs[0], { opacity: 1, scale: 1.12 });
    imgs.forEach((img, i) => { if (i > 0) gsap.set(img, { opacity: 0, scale: 1.2 }); });

    // Animate through images based on scroll progress
    const segmentDuration = 1 / imgCount;
    imgs.forEach((img, i) => {
      // Zoom the current image slowly
      pinTl.to(img, { scale: 1, ease: 'none', duration: segmentDuration }, i * segmentDuration);

      // Fade out current image at end of its segment (except last)
      if (i < imgCount - 1) {
        pinTl.to(img, { opacity: 0, duration: segmentDuration * 0.3 }, (i + 1) * segmentDuration - segmentDuration * 0.3);
        // Fade in next image
        pinTl.to(imgs[i + 1], { opacity: 1, duration: segmentDuration * 0.3 }, (i + 1) * segmentDuration - segmentDuration * 0.3);
      }
    });

    // Content: fade in at start
    pinTl.fromTo(info, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0);
    if (visual) pinTl.fromTo(visual, { opacity: 0, x: 40, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.2, ease: 'power2.out' }, 0.05);

    // Content: fade out at end
    pinTl.to(info, { opacity: 0, y: -30, duration: 0.12 }, 0.88);
    if (visual) pinTl.to(visual, { opacity: 0, x: -30, duration: 0.12 }, 0.88);
  });

  // ══════════════════════════════════════════════════════
  // ── TRENDING SECTION — Drag-to-scroll ──
  // ══════════════════════════════════════════════════════
  const track = document.querySelector('.trending-track');
  if (track) {
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', e => { isDown = true; track.classList.add('dragging'); startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
    track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - track.offsetLeft; track.scrollLeft = scrollLeft - (x - startX) * 1.5; });
  }

  // ── Generic reveals ──
  document.querySelectorAll('.reveal').forEach(el => {
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => el.classList.add('visible') });
  });

  // ── Showcase image parallax ──
  document.querySelectorAll('.sc-img img').forEach(img => {
    gsap.fromTo(img, { yPercent: -6, scale: 1.04 }, { yPercent: 6, scale: 1, ease: 'none',
      scrollTrigger: { trigger: img.closest('.showcase'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // ══════════════════════════════════════════════════════
  // ── COMPACT MODAL ──
  // ══════════════════════════════════════════════════════
  const bg = document.querySelector('.modal-bg');
  const data = {
    thailand: { name:'Thailand', flag:'🇹🇭', img:'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=75', processing:'24–72 Hrs', type:'TDAC, Tourist, Business', price:'From ₹80/pax', validity:'30–90 Days', entries:'Single / Multiple', stay:'Up to 60 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Flight Itinerary','Hotel Booking','Travel Insurance'] },
    malaysia: { name:'Malaysia', flag:'🇲🇾', img:'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=75', processing:'48–96 Hrs', type:'eVisa, eNTRI, Sticker', price:'From ₹120/pax', validity:'30 Days', entries:'Single Entry', stay:'15–30 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Return Tickets','Hotel Reservation','Bank Statement (3 months)'] },
    hongkong: { name:'Hong Kong', flag:'🇭🇰', img:'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=75', processing:'24–48 Hrs', type:'PAR, Tourist, Transit', price:'From ₹150/pax', validity:'14–90 Days', entries:'Single / Double', stay:'14–90 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Confirmed Tickets','Hotel Booking','Proof of Funds'] },
    singapore: { name:'Singapore', flag:'🇸🇬', img:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=75', processing:'5–7 Days', type:'Tourist, Business', price:'From ₹200/pax', validity:'30 Days', entries:'Single / Multiple', stay:'30 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Cover Letter','Flight Itinerary','Hotel Booking','Bank Statement'] },
    vietnam: { name:'Vietnam', flag:'🇻🇳', img:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=75', processing:'3–5 Days', type:'e-Visa, VOA', price:'From ₹90/pax', validity:'30–90 Days', entries:'Single / Multiple', stay:'30–90 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Flight Itinerary','Hotel Confirmation'] },
    dubai: { name:'Dubai (UAE)', flag:'🇦🇪', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=75', processing:'3–4 Days', type:'Tourist, Transit', price:'From ₹180/pax', validity:'30–90 Days', entries:'Single / Multiple', stay:'30–90 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Confirmed Tickets','Hotel Booking','Bank Statement','Travel Insurance'] },
    srilanka: { name:'Sri Lanka', flag:'🇱🇰', img:'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75', processing:'24–48 Hrs', type:'ETA, Tourist', price:'From ₹60/pax', validity:'30 Days', entries:'Double Entry', stay:'30 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Return Tickets','Hotel Booking'] },
    indonesia: { name:'Indonesia', flag:'🇮🇩', img:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=75', processing:'Instant–48 Hrs', type:'e-VOA, Tourist', price:'From ₹70/pax', validity:'30 Days', entries:'Single Entry', stay:'30 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Return Tickets','Hotel Booking'] },
    japan: { name:'Japan', flag:'🇯🇵', img:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=75', processing:'7–10 Days', type:'Tourist, Business', price:'From ₹350/pax', validity:'15–90 Days', entries:'Single / Multiple', stay:'15–90 Days',
      docs:['Valid Passport (6+ months)','Passport-size Photo','Cover Letter','Flight Itinerary','Hotel Booking','Bank Statement (6 months)','ITR (2 years)'] }
  };

  // ── Track active country for redirect ──
  let currentCountryName = '';
  const processBtn = document.querySelector('.cm-btn');

  window.openModal = key => {
    const d = data[key]; if (!d) return;
    currentCountryName = d.name;
    document.getElementById('mImg').src = d.img;
    document.getElementById('mFlag').textContent = d.flag;
    document.getElementById('mName').textContent = d.name;
    document.getElementById('mProc').textContent = d.processing;
    document.getElementById('mType').textContent = d.type;
    document.getElementById('mPrice').textContent = d.price;
    document.getElementById('mVal').textContent = d.validity;
    document.getElementById('mEnt').textContent = d.entries;
    document.getElementById('mStay').textContent = d.stay;
    document.getElementById('mDocs').innerHTML = d.docs.map(x => `<li><i class="fas fa-circle-check"></i>${x}</li>`).join('');
    // Reset button state
    if (processBtn) {
      processBtn.classList.remove('is-loading');
      processBtn.disabled = false;
      processBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Start Processing';
    }
    bg.classList.add('open'); lenis.stop();
  };

  // ── Dynamic redirect to AskVisa portal ──
  window.startProcessing = () => {
    if (!currentCountryName || !processBtn) return;
    // Premium loading state
    processBtn.classList.add('is-loading');
    processBtn.disabled = true;
    processBtn.innerHTML = '<span class="btn-spinner"></span> Redirecting to AskVisa...';
    // Build redirect URL dynamically from active country
    const encodedCountry = encodeURIComponent(currentCountryName);
    const redirectUrl = `https://askvisa.in/?country=${encodedCountry}&source=b2b`;
    // Brief delay for visual feedback before redirect
    setTimeout(() => { window.location.href = redirectUrl; }, 1000);
  };

  window.closeModal = () => {
    bg.classList.remove('open'); lenis.start();
    // Reset button if modal is closed during loading
    if (processBtn) {
      processBtn.classList.remove('is-loading');
      processBtn.disabled = false;
      processBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Start Processing';
    }
  };
  bg?.addEventListener('click', e => { if (e.target === bg || e.target.closest('.cm-close')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Smooth anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) lenis.scrollTo(t); });
  });
});
