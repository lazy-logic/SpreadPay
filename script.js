// ==========================================================================
// MOOVON SpreadPay™ - Next-Gen Client Logic & Interaction Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initSpreadPayCalculator();
  initPartnerSearch();
  initFAQAccordion();
  initFAQSearch();
  initContactForm();
  initPortalAccessForm();
  initCopyButtons();
  initScrollAnimations();
  initModalListeners();
});

// ==========================================================================
// 1. Live Interactive SpreadPay Calculator Engine
// ==========================================================================
function initSpreadPayCalculator() {
  const primaryInput = document.getElementById('calcPremiumInput');
  const sliderInput = document.getElementById('calcSlider');
  const presetBtns = document.querySelectorAll('.calc-preset-btn');

  if (!primaryInput) return;

  // Preset Buttons
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amount = parseFloat(btn.getAttribute('data-amount')) || 900;
      primaryInput.value = amount;
      if (sliderInput) sliderInput.value = Math.min(amount, 50000);
      calculateSpreadPay(amount);
    });
  });

  // Numeric Input
  primaryInput.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value) || 0;
    presetBtns.forEach(b => b.classList.remove('active'));
    if (sliderInput) sliderInput.value = Math.min(val, 50000);
    calculateSpreadPay(val);
  });

  // Slider Input
  if (sliderInput) {
    sliderInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 0;
      primaryInput.value = val;
      presetBtns.forEach(b => b.classList.remove('active'));
      calculateSpreadPay(val);
    });
  }

  // Initial calculation
  calculateSpreadPay(parseFloat(primaryInput.value) || 900);
}

function calculateSpreadPay(premium) {
  const tierBadge = document.getElementById('calcTierBadge');
  const depositEl = document.getElementById('calcDeposit');
  const setupFeeEl = document.getElementById('calcSetupFee');
  const financedEl = document.getElementById('calcFinancedBalance');
  const monthlyEl = document.getElementById('calcMonthlyPayment');
  const tenureEl = document.getElementById('calcTenure');
  const noteEl = document.getElementById('calcNotice');

  if (!tierBadge || !depositEl) return;

  if (premium <= 0) {
    tierBadge.textContent = 'Enter Premium Amount';
    tierBadge.dataset.tier = 'none';
    depositEl.textContent = 'GH₵0';
    setupFeeEl.textContent = 'GH₵0';
    financedEl.textContent = 'GH₵0';
    monthlyEl.textContent = 'GH₵0 / mo';
    tenureEl.textContent = '0 Months';
    if (noteEl) noteEl.textContent = 'Please enter a valid motor insurance premium.';
    return;
  }

  // Below the product floor — quote nothing rather than a misleading schedule.
  if (premium < 330) {
    tierBadge.textContent = 'Below SpreadPay Minimum';
    tierBadge.dataset.tier = 'none';
    depositEl.textContent = '—';
    setupFeeEl.textContent = '—';
    financedEl.textContent = '—';
    monthlyEl.textContent = 'Enter GH₵330 or more';
    tenureEl.textContent = '—';
    if (noteEl) noteEl.textContent = 'SpreadPay starts at a GH₵330 annual premium. Premiums below this are payable directly to your insurer.';
    return;
  }

  // Tier 1: Essential (GH₵330 - GH₵1,500)
  if (premium <= 1500) {
    const deposit = Math.min(100, premium);
    const setupFee = 25;
    const financed = Math.max(0, premium - deposit);
    const month1 = financed * 0.35;
    const remainingMonth = (financed - month1) / 2;

    tierBadge.textContent = 'Essential Tier (GH₵330 – GH₵1,500)';
    tierBadge.dataset.tier = 'essential';
    depositEl.textContent = `GH₵${deposit.toLocaleString()} min.`;
    setupFeeEl.textContent = `GH₵${setupFee.toLocaleString()}`;
    financedEl.textContent = `GH₵${financed.toLocaleString()}`;
    monthlyEl.textContent = `Month 1: GH₵${Math.round(month1)} (35%) • M2-M3: GH₵${Math.round(remainingMonth)}`;
    tenureEl.textContent = 'Up to 3 Months';
    if (noteEl) noteEl.textContent = 'Fast & affordable for Third Party motor policies. GH₵50 late penalty applies if unpaid after 4 weeks.';
  }
  // Tier 2: Flex (GH₵1,501 - GH₵15,000)
  else if (premium <= 15000) {
    const deposit = premium * 0.20;
    const setupFee = premium * 0.02;
    const financed = premium - deposit;
    const monthly = financed / 6;

    tierBadge.textContent = 'Flex Tier (GH₵1,501 – GH₵15,000)';
    tierBadge.dataset.tier = 'flex';
    depositEl.textContent = `GH₵${Math.round(deposit).toLocaleString()} (20%)`;
    setupFeeEl.textContent = `GH₵${Math.round(setupFee).toLocaleString()} (2%)`;
    financedEl.textContent = `GH₵${Math.round(financed).toLocaleString()}`;
    monthlyEl.textContent = `GH₵${Math.round(monthly).toLocaleString()} / month (6 equal repayments)`;
    tenureEl.textContent = 'Up to 6 Months';
    if (noteEl) noteEl.textContent = 'Flexible repayments with early settlement benefits. If an installment is unpaid after 4 weeks, a 3.5% flat monthly penalty — calculated on the original financed amount — applies for that month.';
  }
  // Tier 3: Fixed (above GH₵15,000)
  else {
    const deposit = premium * 0.40;
    const setupFee = premium * 0.01;
    const facilityFee = 900;
    const financed = premium - deposit;
    const monthly = financed / 3;
    // Ops guide §3: approval is triggered by the financed balance, not the premium.
    const needsRmApproval = financed > 50000;

    tierBadge.textContent = needsRmApproval
      ? 'Fixed Tier • Requires RM Approval (financed balance >GH₵50,000)'
      : 'Fixed Tier (GH₵15,001 – GH₵50,000+)';
    tierBadge.dataset.tier = 'fixed';
    depositEl.textContent = `GH₵${Math.round(deposit).toLocaleString()} (40%)`;
    setupFeeEl.textContent = `GH₵${Math.round(setupFee).toLocaleString()} (1%) + GH₵${facilityFee} Facility Fee`;
    financedEl.textContent = `GH₵${Math.round(financed).toLocaleString()}`;
    monthlyEl.textContent = `3 Fixed Repayments of GH₵${Math.round(monthly).toLocaleString()} / mo`;
    tenureEl.textContent = '3 Months Fixed';
    if (noteEl) {
      noteEl.textContent = needsRmApproval
        ? '⚠️ A financed balance above GH₵50,000 requires Insurance Partner Relationship Manager approval.'
        : 'Predictable corporate financing on a fixed 3-month schedule. No monthly penalty during those 3 repayments — a 4% flat monthly penalty applies only if the balance is still in default after Month 3.';
    }
  }
}

// ==========================================================================
// 2. Partner Directory Search & Category Filters
// ==========================================================================
function initPartnerSearch() {
  const searchInput = document.getElementById('partnerSearchInput');
  const catTabs = document.querySelectorAll('.partner-cat-tab');
  // Directory cards only — the modal keeps its own search so page filters
  // can never empty the modal behind the overlay.
  const cards = document.querySelectorAll('.partner-dir-card');
  const countEl = document.getElementById('partnerResultCount');
  const emptyEl = document.getElementById('partnerDirEmpty');

  if (!cards.length) return;

  let activeCategory = 'all';
  let activeQuery = '';

  function applyFilters() {
    let visible = 0;
    cards.forEach(card => {
      const matchesQuery = !activeQuery || card.textContent.toLowerCase().includes(activeQuery);
      const cardCats = card.getAttribute('data-categories') || '';
      const matchesCat = activeCategory === 'all' || cardCats.includes(activeCategory);
      const show = matchesQuery && matchesCat;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) countEl.textContent = `Showing ${visible} of ${cards.length} partners`;
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');
      activeCategory = tab.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  applyFilters();
}

// Modal-only search. Bound separately from the directory so the two can
// never filter each other's DOM.
function initModalPartnerSearch() {
  const input = document.getElementById('partnerSearchInputModal');
  if (!input) return;
  const items = document.querySelectorAll('.partner-modal-item');
  const empty = document.getElementById('partnerModalEmpty');

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visible = 0;
    items.forEach(item => {
      const name = (item.getAttribute('data-partner') || item.textContent).toLowerCase();
      const show = !query || name.includes(query);
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  });
}

// ==========================================================================
// 3. FAQ Accordion, Category Filtering & Instant Search Engine
// ==========================================================================
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const catTabs = document.querySelectorAll('.faq-cat-link');
  const searchInput = document.getElementById('faqSearchInput');
  const emptyState = document.getElementById('faqEmptyState');

  // Accordion Toggle
  faqItems.forEach((item, index) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn) return;

    if (answer) {
      if (!answer.id) answer.id = `faq-answer-${index + 1}`;
      btn.setAttribute('aria-controls', answer.id);
      answer.setAttribute('role', 'region');
    }
    btn.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      item.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // Keep aria-expanded truthful when search/category filters toggle .active.
  const syncObserver = new MutationObserver(mutations => {
    mutations.forEach(m => {
      const item = m.target;
      const btn = item.querySelector && item.querySelector('.faq-question');
      if (btn) btn.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
    });
  });
  faqItems.forEach(item => syncObserver.observe(item, { attributes: true, attributeFilter: ['class'] }));

  // Category Filtering
  catTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');

      if (searchInput) searchInput.value = '';
      if (emptyState) emptyState.style.display = 'none';

      faqItems.forEach((item, index) => {
        if (cat === 'all') {
          item.style.display = '';
          if (index === 0) item.classList.add('active');
        } else {
          const itemCat = item.getAttribute('data-category') || '';
          if (itemCat.includes(cat)) {
            item.style.display = '';
            item.classList.add('active');
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });

  // Handle URL Hash if present (e.g. faqs.html#claims)
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const matchingTab = document.querySelector(`.faq-cat-link[data-category="${hash}"]`);
    if (matchingTab) {
      matchingTab.click();
    } else {
      const targetItem = document.getElementById(hash);
      if (targetItem) {
        targetItem.classList.add('active');
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}

function initFAQSearch() {
  const searchInputs = document.querySelectorAll('#faqSearchInput, .faq-search-input, .faq-hero-input');
  const faqItems = document.querySelectorAll('.faq-item');
  const catTabs = document.querySelectorAll('.faq-cat-link');
  const emptyState = document.getElementById('faqEmptyState');
  if (!searchInputs.length) return;

  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      searchInputs.forEach(other => {
        if (other !== input && other.value !== e.target.value) {
          other.value = e.target.value;
        }
      });

      if (query.length > 0) {
        catTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
      }

      faqItems.forEach((item, index) => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(query);
        item.style.display = matches ? '' : 'none';
        if (matches) {
          visibleCount++;
          item.classList.toggle('active', query.length >= 2 || (query.length === 0 && index === 0));
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

function setFAQSearch(keyword) {
  const searchInputs = document.querySelectorAll('#faqSearchInput, .faq-search-input, .faq-hero-input');
  if (searchInputs.length) {
    searchInputs.forEach(input => {
      input.value = keyword;
    });
    searchInputs[0].dispatchEvent(new Event('input'));
    searchInputs[0].focus();
  }
}
window.setFAQSearch = setFAQSearch;

// ==========================================================================
// 4. Contact Form Handler & WhatsApp Referral
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contactInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Customer';
    const phone = document.getElementById('contactPhone')?.value || '';
    const type = document.getElementById('contactType')?.value || 'Inquiry';
    const msg = document.getElementById('contactMessage')?.value || '';

    const text = encodeURIComponent(`Hi Moovon, my name is ${name} (${phone}). Inquiry type: ${type}. Message: ${msg}`);
    window.open(`https://wa.me/233593293040?text=${text}`, '_blank');
  });
}

// ==========================================================================
// 4b. Partner Portal Access Request
//     Replaces a sign-in form that collected real passwords and submitted
//     them to an alert(). No credentials are handled here.
// ==========================================================================
function initPortalAccessForm() {
  const form = document.getElementById('portalAccessForm');
  if (!form) return;
  const status = document.getElementById('portalAccessStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('portalName')?.value.trim() || '';
    const org = document.getElementById('portalInsurer')?.value.trim() || '';
    const email = document.getElementById('portalEmail')?.value.trim() || '';

    const text = encodeURIComponent(
      `Partner Portal access request — ${name}, ${org} (${email}). Please set up SpreadPay portal credentials.`
    );
    if (status) status.textContent = 'Opening WhatsApp with your request…';
    window.location.href = `https://wa.me/233593293040?text=${text}`;

    setTimeout(() => {
      if (status) {
        status.innerHTML =
          'Request prepared. If WhatsApp did not open, email ' +
          '<a href="mailto:support@moovon.insure?subject=Partner%20Portal%20Access%20Request">support@moovon.insure</a>.';
      }
      form.reset();
    }, 1200);
  });
}

// ==========================================================================
// 5. Copy to Clipboard Utility
// ==========================================================================
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '✓ Copied!';
          setTimeout(() => btn.innerHTML = original, 2000);
        });
      }
    });
  });
}

// ==========================================================================
// 6. Scroll Entrance Animations (Framer-Motion style)
// ==========================================================================
function initScrollAnimations() {
  const animEls = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animEls.forEach(el => observer.observe(el));
}

// ==========================================================================
// 7. Mobile Navigation Drawer — owned entirely by header.js, which builds the
//    drawer DOM. A second controller here previously left body{overflow:hidden}
//    set whenever the drawer was dismissed via backdrop or a nav link.
// ==========================================================================
// 8. Partner Finder Modal Global Triggers
// ==========================================================================
let partnerModalInvoker = null;

// tier/premium are optional: passing them carries the customer's calculator
// context through to the WhatsApp message the partner receives.
function openPartnerModal(tier, premium) {
  const modal = document.getElementById('partnerModal');
  if (!modal) return;

  partnerModalInvoker = document.activeElement;
  applyPartnerModalContext(tier, premium);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // The overlay is visibility:hidden until .active takes effect, and a hidden
  // element cannot take focus. Force a style/layout flush so the class applies
  // in this tick, then focus.
  void modal.offsetHeight;
  const input = document.getElementById('partnerSearchInputModal');
  if (input) input.focus();
}

function applyPartnerModalContext(tier, premium) {
  const sub = document.getElementById('partnerModalSub');
  const partners = window.MOOVON_PARTNERS || [];
  if (!sub || !partners.length) return;

  let context = '';
  if (tier) {
    context = `SpreadPay ${tier}`;
    if (premium) context += ` — GH₵${Number(premium).toLocaleString()} premium`;
    sub.innerHTML = `Applying for <strong>${context}</strong>. Ask any of our ${partners.length} verified partner insurers for it.`;
  } else {
    sub.innerHTML = `Ask any of our ${partners.length} verified partner insurers or brokers for <strong>Moovon SpreadPay&trade;</strong>.`;
  }

  if (typeof window.partnerWhatsAppLink === 'function') {
    document.querySelectorAll('.partner-modal-item').forEach(item => {
      const short = item.getAttribute('data-partner');
      const cta = item.querySelector('.partner-modal-cta');
      const partner = partners.find(p => p.short === short);
      if (cta && partner) cta.href = window.partnerWhatsAppLink(partner, context);
    });
  }
}

function closePartnerModal() {
  const modal = document.getElementById('partnerModal');
  if (!modal || !modal.classList.contains('active')) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (partnerModalInvoker && typeof partnerModalInvoker.focus === 'function') {
    partnerModalInvoker.focus();
  }
  partnerModalInvoker = null;
}

function initModalListeners() {
  const modal = document.getElementById('partnerModal');
  const closeBtn = document.getElementById('closePartnerModal');

  initModalPartnerSearch();

  if (closeBtn) {
    closeBtn.addEventListener('click', closePartnerModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePartnerModal();
      }
    });

    // Keep Tab inside the dialog while it is open.
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      const visible = Array.from(focusable).filter(el => el.offsetParent !== null);
      if (!visible.length) return;
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // Guarded so Escape can never clear the scroll lock the drawer relies on.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closePartnerModal();
    }
  });
}
window.openPartnerModal = openPartnerModal;
window.closePartnerModal = closePartnerModal;
