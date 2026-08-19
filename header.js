// ==========================================================================
// MOOVON SpreadPay™ - Uniform Header & Mobile Navigation Controller
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  highlightCurrentPage();
  initUniformMobileDrawer();
  injectPartnerModal();
  injectChatWidget();
});

// ==========================================================================
// Participating Partners - single source of truth for the directory,
// the finder modal and every "10 partners" count on the site.
// ==========================================================================
// Descriptions are neutral policy-type labels only. The brand rules forbid
// ranking, recommending or comparative claims between participating insurers,
// so no insurer carries a promotional tagline here.
const MOOVON_PARTNERS = [
  { name: 'Activa International Insurance', short: 'Activa', desc: 'Comprehensive & Third Party motor', logo: 'logo_activa.png', categories: 'comprehensive thirdparty' },
  { name: 'Enterprise Insurance', short: 'Enterprise', desc: 'Comprehensive, Third Party & commercial motor', logo: 'logo_enterprise.png', categories: 'comprehensive thirdparty commercial' },
  { name: 'Ghana Union Assurance (GUA)', short: 'Ghana Union Assurance', desc: 'Private & commercial vehicle policies', logo: 'logo_gua.png', categories: 'comprehensive commercial' },
  { name: 'Glico General Insurance', short: 'Glico', desc: 'Comprehensive & Third Party motor', logo: 'logo_glico.png', categories: 'comprehensive thirdparty' },
  { name: 'Hollard Insurance Ghana', short: 'Hollard', desc: 'Comprehensive, Third Party & fleet motor', logo: 'logo_hollard.png', categories: 'comprehensive thirdparty fleets' },
  { name: 'NSIA Insurance Ghana', short: 'NSIA', desc: 'Private, commercial & fleet motor', logo: 'logo_nsia.png', categories: 'commercial fleets' },
  { name: 'Priority Insurance Company', short: 'Priority', desc: 'Third Party & commercial motor', logo: 'logo_priority.png', categories: 'thirdparty commercial' },
  { name: 'Provident Insurance Company', short: 'Provident', desc: 'Third Party motor', logo: 'logo_provident.png', categories: 'thirdparty' },
  { name: 'Star Assurance Ghana', short: 'Star Assurance', desc: 'Comprehensive & fleet motor', logo: 'logo_star.png', categories: 'comprehensive fleets' },
  { name: 'SUNU Assurances Ghana', short: 'SUNU', desc: 'Comprehensive & commercial motor', logo: 'logo_sunu.png', categories: 'comprehensive commercial' }
];
window.MOOVON_PARTNERS = MOOVON_PARTNERS;

function partnerWhatsAppLink(partner, context) {
  let msg = `Hi, I want to apply for SpreadPay with ${partner.short}`;
  if (context) msg += ` (${context})`;
  msg += '.';
  return `https://wa.me/233593293040?text=${encodeURIComponent(msg)}`;
}
window.partnerWhatsAppLink = partnerWhatsAppLink;

// Builds the Partner Finder modal once, on every page, from MOOVON_PARTNERS.
// Replaces the seven hand-copied modals that had drifted out of sync.
function injectPartnerModal() {
  if (document.getElementById('partnerModal')) return;

  const modal = document.createElement('div');
  modal.id = 'partnerModal';
  modal.className = 'modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'partnerModalTitle');

  const rows = MOOVON_PARTNERS.map(p => `
        <div class="partner-modal-item" data-categories="${p.categories}" data-partner="${p.short}">
          <img src="assets/logos/${p.logo}?v=2" alt="" width="48" height="34" loading="lazy" decoding="async">
          <div><h5>${p.name}</h5><p>${p.desc}</p></div>
          <a href="${partnerWhatsAppLink(p)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm partner-modal-cta"
             aria-label="Ask for SpreadPay with ${p.name} on WhatsApp (opens in a new tab)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" style="margin-right:6px; flex-shrink:0;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-.01 0-.01 0 0 0-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.02.79.81-2.95-.19-.3a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24m4.53 11.53c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.68 4.24 3.76.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29z"/></svg>
            Ask for SpreadPay
          </a>
        </div>`).join('');

  modal.innerHTML = `
    <div class="modal-card">
      <button class="modal-close" id="closePartnerModal" aria-label="Close partner list">&times;</button>
      <h3 class="modal-title" id="partnerModalTitle">Participating Insurance Partners</h3>
      <p class="modal-sub" id="partnerModalSub">Ask any of our ${MOOVON_PARTNERS.length} verified partner insurers or brokers for <strong>Moovon SpreadPay&trade;</strong>.</p>
      <label class="sr-only" for="partnerSearchInputModal">Search insurers by name</label>
      <input type="search" id="partnerSearchInputModal" class="modal-search-input"
             placeholder="Search insurer by name (e.g. Enterprise, Hollard, Glico)...">
      <div class="modal-partners-list" id="partnersModalList">${rows}
        <div class="partner-modal-empty" id="partnerModalEmpty" hidden>
          <p>No partner matches that name.</p>
          <a href="https://wa.me/233593293040?text=${encodeURIComponent("Hi, I couldn't find my insurer in the SpreadPay partner list — can you help me?")}"
             target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" style="margin-right:6px; flex-shrink:0;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-.01 0-.01 0 0 0-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.02.79.81-2.95-.19-.3a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24m4.53 11.53c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.68 4.24 3.76.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29z"/></svg>
            Chat with us and we'll route you
          </a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

// Reduces "/contact", "contact.html", "/contact#x" and "" to a single
// comparable slug, so link matching survives clean URLs, the .html form and
// local file:// previews alike.
function pageSlug(value) {
  if (!value) return 'index';
  let slug = value.split('#')[0].split('?')[0];
  slug = slug.substring(slug.lastIndexOf('/') + 1);
  slug = slug.replace(/\.html$/, '');
  return slug === '' ? 'index' : slug;
}

// Pages reached through a dropdown have no top-level nav item of their own,
// so they light up their parent instead.
const NAV_PARENT = {
  'partners': 'products',      // Participating Partners lives under For Customers
  'faqs': 'faqs',
  'developers': 'for-partners',
  'news': 'about',             // What's Mooving? lives under Company
  'terms': 'about',
  'privacy': 'about'
};

function highlightCurrentPage() {
  const current = pageSlug(window.location.pathname);
  const target = NAV_PARENT[current] || current;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    // Ignore pure in-page anchors ("#main") and off-site links.
    const isInternal = !href.startsWith('#') && !/^[a-z]+:/i.test(href);

    if (isInternal && pageSlug(href) === target) {
      link.classList.add('active');
      if (current === 'contact' && link.classList.contains('nav-link')) {
        link.classList.add('nav-contact-active');
      }
    } else {
      link.classList.remove('active');
      link.classList.remove('nav-contact-active');
    }
  });
}

function initUniformMobileDrawer() {
  // Ensure the mobile drawer markup exists
  let drawer = document.getElementById('mobileDrawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'mobileDrawer';
    drawer.className = 'mobile-drawer';
    drawer.innerHTML = `
      <div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop"></div>
      <div class="mobile-drawer-panel">
        <div class="mobile-drawer-header">
          <a href="/" class="brand-logo-group" aria-label="Moovon SpreadPay Home">
            <img src="assets/brand/moovon_logo_main.png" alt="Moovon" class="brand-logo-img brand-logo-drawer" width="2371" height="613">
          </a>
          <button class="mobile-drawer-close" id="closeMobileDrawer" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B5BAA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <nav class="mobile-drawer-nav">
          <ul class="mobile-nav-list">
            <li><a href="/how-it-works" class="mobile-nav-link">How It Works</a></li>
            
            <li class="mobile-nav-item-dropdown">
              <button class="mobile-dropdown-toggle" aria-expanded="false">
                <span>For Customers</span>
                <svg class="mobile-dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="mobile-submenu">
                <a href="/partners" class="mobile-sublink">
                  <strong>Participating Partners</strong>
                  <span>Choose your preferred insurer</span>
                </a>
                <a href="/products" class="mobile-sublink">
                  <strong>Flexible Ways to Pay</strong>
                  <span>Premium bands and payment periods</span>
                </a>
                <a href="/faqs" class="mobile-sublink">
                  <strong>FAQs</strong>
                  <span>Answers about your SpreadPay journey</span>
                </a>
              </div>
            </li>

            <li class="mobile-nav-item-dropdown">
              <button class="mobile-dropdown-toggle" aria-expanded="false">
                <span>For Partners</span>
                <svg class="mobile-dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="mobile-submenu">
                <a href="/for-partners" class="mobile-sublink">
                  <strong>Partner with Moovon</strong>
                  <span>For insurers, brokers and agents</span>
                </a>
                <a href="/developers" class="mobile-sublink">
                  <strong>Developers &amp; Integrations</strong>
                  <span>Secure partner APIs</span>
                </a>
                <a href="https://console.moovon.insure/login" class="mobile-sublink">
                  <strong>Partner Portal Sign In</strong>
                  <span>Approved partner access</span>
                </a>
              </div>
            </li>

            <li class="mobile-nav-item-dropdown">
              <button class="mobile-dropdown-toggle" aria-expanded="false">
                <span>Company</span>
                <svg class="mobile-dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="mobile-submenu">
                <a href="/about" class="mobile-sublink">
                  <strong>About Moovon</strong>
                  <span>Built in Ghana. Built for Africa.</span>
                </a>
                <a href="/news" class="mobile-sublink">
                  <strong>What&rsquo;s Mooving?</strong>
                  <span>News, partners and industry updates</span>
                </a>
              </div>
            </li>

            <li><a href="/faqs" class="mobile-nav-link">FAQs</a></li>
            <li><a href="/contact" class="mobile-nav-link">Contact Us</a></li>
          </ul>
        </nav>

        <div class="mobile-drawer-footer">
          <button onclick="openPartnerModal(); closeMobileNavDrawer();" class="btn btn-find-partner" style="width:100%; justify-content:center; padding:12px; margin-bottom:10px;">Find a Partner</button>
          <a href="https://console.moovon.insure/login" class="btn btn-signin" style="width:100%; text-align:center; justify-content:center; padding:12px; margin-bottom:14px;">Partner Sign In</a>
          
          <a href="https://wa.me/233593293040" target="_blank" class="mobile-drawer-wa" rel="noopener">
            <svg class="wa-green-icon" viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path fill="#25D366" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.12-1.341c1.472.802 3.13 1.225 4.887 1.226h.005c5.506 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.062A9.923 9.923 0 0 0 12.012 2z"/>
              <path fill="#FFFFFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            <span>WhatsApp: <strong>059 329 3040</strong></span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  // Toggle button in site header
  const toggles = document.querySelectorAll('.mobile-toggle');
  toggles.forEach(toggle => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobileDrawer');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileNavDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMobileNavDrawer();
    }
  });

  // Close triggers
  const closeBtn = document.getElementById('closeMobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileNavDrawer);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeMobileNavDrawer);
  }

  // Mobile submenu accordions
  const dropdownToggles = drawer.querySelectorAll('.mobile-dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.mobile-nav-item-dropdown');
      const isExpanded = parent.classList.contains('active');
      
      // Close other dropdowns
      drawer.querySelectorAll('.mobile-nav-item-dropdown').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          const t = item.querySelector('.mobile-dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      parent.classList.toggle('active', !isExpanded);
      toggle.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
    });
  });

  // Close drawer when clicking any link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNavDrawer();
    });
  });
}

function openMobileNavDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;
  drawer.classList.add('active');
  document.body.classList.add('mobile-drawer-open');
  document.querySelectorAll('.mobile-toggle').forEach(t => t.setAttribute('aria-expanded', 'true'));
  const closeBtn = document.getElementById('closeMobileDrawer');
  if (closeBtn) closeBtn.focus();
}

function closeMobileNavDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;
  const wasOpen = drawer.classList.contains('active');
  drawer.classList.remove('active');
  document.body.classList.remove('mobile-drawer-open');
  // Clear any legacy inline lock so the page can always scroll again.
  document.body.style.overflow = '';
  const toggles = document.querySelectorAll('.mobile-toggle');
  toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
  if (wasOpen && toggles.length) toggles[0].focus();
}

window.openMobileNavDrawer = openMobileNavDrawer;
window.closeMobileNavDrawer = closeMobileNavDrawer;

// ==========================================================================
// Centralized WhatsApp Superhero Widget Injection
// ==========================================================================
function injectChatWidget() {
  // Remove any legacy floating widget if present in DOM
  const existingLegacy = document.querySelectorAll('.floating-whatsapp-widget, #moovonChatWidget, .moovon-chat-widget-wrap, .moovon-pure-avatar-widget');
  existingLegacy.forEach(w => w.remove());

  const widget = document.createElement('div');
  widget.id = 'moovonChatWidget';
  widget.className = 'moovon-pure-avatar-widget';
  widget.innerHTML = `
    <!-- Redesigned Sleek Portable Speech Bubble -->
    <a href="https://wa.me/233593293040?text=${encodeURIComponent('Hi Mr. Moovon, I want to ask about Moovon SpreadPay.')}" 
       target="_blank" 
       rel="noopener" 
       class="moovon-pure-speech-bubble" 
       id="moovonChatBubble"
       aria-label="Chat with us on WhatsApp">
      <span class="bubble-pulse-dot" aria-hidden="true"></span>
      <span class="moovon-speech-text">Chat with us</span>
      <span class="moovon-speech-wa-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="#FFFFFF">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.12-1.341c1.472.802 3.13 1.225 4.887 1.226h.005c5.506 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.062A9.923 9.923 0 0 0 12.012 2z"/>
          <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </span>
      <div class="moovon-pure-bubble-arrow" aria-hidden="true"></div>
    </a>

    <!-- Full Image Superhero Avatar Link -->
    <a href="https://wa.me/233593293040?text=${encodeURIComponent('Hi Mr. Moovon, I want to ask about Moovon SpreadPay.')}" 
       target="_blank" 
       rel="noopener" 
       class="moovon-full-avatar-link"
       aria-label="Chat with Mr. Moovon on WhatsApp">
      <img src="assets/graphics/mr_moovon_full_standing_tight.png" 
           alt="Mr. Moovon - Chat with us" 
           class="moovon-full-avatar-img"
           loading="eager">
      <div class="moovon-avatar-ground-shadow"></div>
    </a>
  `;

  document.body.appendChild(widget);

  // Auto-hide bubble after 4.5 seconds; show on hover
  const bubble = widget.querySelector('#moovonChatBubble');
  if (bubble) {
    let hideTimer = setTimeout(() => {
      bubble.classList.add('bubble-autohidden');
    }, 4500);

    widget.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      bubble.classList.remove('bubble-autohidden');
    });

    widget.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => {
        bubble.classList.add('bubble-autohidden');
      }, 3000);
    });
  }
}

// Auto-run on DOMContentLoaded or immediate if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    injectPartnerModal();
    injectChatWidget();
  });
} else {
  initHeader();
  injectPartnerModal();
  injectChatWidget();
}
