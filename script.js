// ==========================================================================
// MOOVON SpreadPay™ - Next-Gen Client Logic & Interaction Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initSpreadPayCalculator();
  initPartnerSearch();
  initFAQAccordion();
  initFAQSearch();
  initContactForm();
  initCopyButtons();
  initScrollAnimations();
  initMobileDrawer();
  initModalListeners();
});

// ==========================================================================
// 1. Live Interactive SpreadPay Calculator Engine
// ==========================================================================
function initSpreadPayCalculator() {
  const amountInputs = document.querySelectorAll('#calcPremiumInput, #calcSlider');
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
    depositEl.textContent = 'GH₵0';
    setupFeeEl.textContent = 'GH₵0';
    financedEl.textContent = 'GH₵0';
    monthlyEl.textContent = 'GH₵0 / mo';
    tenureEl.textContent = '0 Months';
    if (noteEl) noteEl.textContent = 'Please enter a valid motor insurance premium.';
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
    tierBadge.style.color = '#0B2265';
    tierBadge.style.background = 'rgba(11, 34, 101, 0.08)';
    depositEl.textContent = `GH₵${deposit.toLocaleString()}`;
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
    tierBadge.style.color = '#E51937';
    tierBadge.style.background = 'rgba(229, 25, 55, 0.08)';
    depositEl.textContent = `GH₵${Math.round(deposit).toLocaleString()} (20%)`;
    setupFeeEl.textContent = `GH₵${Math.round(setupFee).toLocaleString()} (2%)`;
    financedEl.textContent = `GH₵${Math.round(financed).toLocaleString()}`;
    monthlyEl.textContent = `GH₵${Math.round(monthly).toLocaleString()} / month (6 equal repayments)`;
    tenureEl.textContent = 'Up to 6 Months';
    if (noteEl) noteEl.textContent = 'Flexible repayments with early settlement benefits. 3.5% monthly penalty applies only for overdue months.';
  }
  // Tier 3: Fixed (GH₵15,000 - GH₵50,000+)
  else {
    const deposit = premium * 0.40;
    const setupFee = premium * 0.01;
    const facilityFee = 900;
    const financed = premium - deposit;
    const monthly = financed / 3;

    tierBadge.textContent = premium > 50000 
      ? 'Fixed Tier • Requires RM Approval (>GH₵50,000)' 
      : 'Fixed Tier (GH₵15,000 – GH₵50,000)';
    tierBadge.style.color = '#7C3AED';
    tierBadge.style.background = 'rgba(124, 58, 237, 0.08)';
    depositEl.textContent = `GH₵${Math.round(deposit).toLocaleString()} (40%)`;
    setupFeeEl.textContent = `GH₵${Math.round(setupFee).toLocaleString()} (1%) + GH₵${facilityFee} Facility Fee`;
    financedEl.textContent = `GH₵${Math.round(financed).toLocaleString()}`;
    monthlyEl.textContent = `3 Fixed Repayments of GH₵${Math.round(monthly).toLocaleString()} / mo`;
    tenureEl.textContent = '3 Months Fixed';
    if (noteEl) {
      noteEl.textContent = premium > 50000 
        ? '⚠️ Requests above GH₵50,000 financed balance require Insurance Partner Relationship Manager approval.'
        : 'Predictable corporate financing. Fixed 3-month schedule. 4% monthly penalty applies if in default after Month 3.';
    }
  }
}

// ==========================================================================
// 2. Partner Directory Search & Category Filters
// ==========================================================================
function initPartnerSearch() {
  const searchInput = document.getElementById('partnerSearchInput');
  const catTabs = document.querySelectorAll('.partner-cat-tab');
  const cards = document.querySelectorAll('.partner-dir-card, .partner-modal-item');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      
      cards.forEach(card => {
        if (cat === 'all') {
          card.style.display = '';
        } else {
          const cardCats = card.getAttribute('data-categories') || '';
          card.style.display = cardCats.includes(cat) ? '' : 'none';
        }
      });
    });
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
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        item.classList.toggle('active', !isOpen);
      });
    }
  });

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
  const searchInput = document.getElementById('faqSearchInput');
  const faqItems = document.querySelectorAll('.faq-item');
  const catTabs = document.querySelectorAll('.faq-cat-link');
  const emptyState = document.getElementById('faqEmptyState');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    if (query.length > 0) {
      catTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
    }

    faqItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      const matches = text.includes(query);
      item.style.display = matches ? '' : 'none';
      if (matches) {
        visibleCount++;
        if (query.length >= 2) {
          item.classList.add('active');
        }
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

function setFAQSearch(keyword) {
  const searchInput = document.getElementById('faqSearchInput');
  if (searchInput) {
    searchInput.value = keyword;
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
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
// 7. Mobile Navigation Drawer
// ==========================================================================
function initMobileDrawer() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobileDrawer');
  const close = document.getElementById('closeMobileDrawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (close && drawer) {
    close.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

// ==========================================================================
// 8. Partner Finder Modal Global Triggers
// ==========================================================================
function openPartnerModal() {
  const modal = document.getElementById('partnerModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('partnerSearchInput');
    if (input) input.focus();
  }
}

function closePartnerModal() {
  const modal = document.getElementById('partnerModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  const modal = document.getElementById('partnerModal');
  const closeBtn = document.getElementById('closePartnerModal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closePartnerModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePartnerModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePartnerModal();
    }
  });
}
