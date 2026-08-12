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
const MOOVON_PARTNERS = [
  { name: 'Activa International Insurance', short: 'Activa', desc: 'Comprehensive & Third Party Motor', logo: 'logo_activa.png', categories: 'comprehensive thirdparty' },
  { name: 'Enterprise Insurance', short: 'Enterprise', desc: "Ghana's Leading Motor Insurer", logo: 'logo_enterprise.png', categories: 'comprehensive thirdparty commercial' },
  { name: 'Ghana Union Assurance (GUA)', short: 'Ghana Union Assurance', desc: 'Commercial & Private Vehicle Policies', logo: 'logo_gua.png', categories: 'comprehensive commercial' },
  { name: 'Glico General Insurance', short: 'Glico', desc: 'Motor Third Party & Comprehensive', logo: 'logo_glico.png', categories: 'comprehensive thirdparty' },
  { name: 'Hollard Insurance Ghana', short: 'Hollard', desc: 'Flexible Motor Cover with SpreadPay', logo: 'logo_hollard.png', categories: 'comprehensive thirdparty fleets' },
  { name: 'NSIA Insurance Ghana', short: 'NSIA', desc: 'Private & Commercial Fleet Protection', logo: 'logo_nsia.png', categories: 'commercial fleets' },
  { name: 'Priority Insurance Company', short: 'Priority', desc: 'Fast Motor Policy Financing', logo: 'logo_priority.png', categories: 'thirdparty commercial' },
  { name: 'Provident Insurance Company', short: 'Provident', desc: 'Affordable Motor Protection', logo: 'logo_provident.png', categories: 'thirdparty' },
  { name: 'Star Assurance Ghana', short: 'Star Assurance', desc: 'Solid Protection & Fleet Financing', logo: 'logo_star.png', categories: 'comprehensive fleets' },
  { name: 'SUNU Assurances Ghana', short: 'SUNU', desc: 'Pan-African Motor Policy Financing', logo: 'logo_sunu.png', categories: 'comprehensive commercial' }
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
          <img src="assets/logos/${p.logo}" alt="" width="48" height="34" loading="lazy" decoding="async">
          <div><h5>${p.name}</h5><p>${p.desc}</p></div>
          <a href="${partnerWhatsAppLink(p)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm partner-modal-cta"
             aria-label="Ask for SpreadPay with ${p.name} on WhatsApp (opens in a new tab)">Ask for SpreadPay</a>
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
             target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">Chat with us and we'll route you</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      if (href === 'contact.html' && link.classList.contains('nav-link')) {
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
          <a href="index.html" class="brand-logo-group" aria-label="Moovon SpreadPay Home">
            <svg class="brand-logo-svg" viewBox="0 0 190 38" fill="none" xmlns="http://www.w3.org/2000/svg" style="height:32px;">
              <text x="0" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="29" fill="#0B2265" letter-spacing="-0.5">MOOVON</text>
              <path d="M77 31 L82 37 L87 31 H84.5 L82 33.5 L79.5 31 Z" fill="#E51937" />
            </svg>
          </a>
          <button class="mobile-drawer-close" id="closeMobileDrawer" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B2265" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <nav class="mobile-drawer-nav">
          <ul class="mobile-nav-list">
            <li><a href="how-it-works.html" class="mobile-nav-link">How It Works</a></li>
            
            <li class="mobile-nav-item-dropdown">
              <button class="mobile-dropdown-toggle" aria-expanded="false">
                <span>For Customers</span>
                <svg class="mobile-dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="mobile-submenu">
                <a href="products.html#essential" class="mobile-sublink">
                  <strong>Essential Tier</strong>
                  <span>Third Party from GH₵330</span>
                </a>
                <a href="products.html#flex" class="mobile-sublink">
                  <strong>Flex Tier</strong>
                  <span>Installments up to 6 months</span>
                </a>
                <a href="products.html#fixed" class="mobile-sublink">
                  <strong>Fixed Tier</strong>
                  <span>Commercial & fleets</span>
                </a>
              </div>
            </li>

            <li class="mobile-nav-item-dropdown">
              <button class="mobile-dropdown-toggle" aria-expanded="false">
                <span>For Partners</span>
                <svg class="mobile-dropdown-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="mobile-submenu">
                <a href="partners.html" class="mobile-sublink">
                  <strong>Participating Partners</strong>
                  <span>View all 10 Ghana partner insurers</span>
                </a>
                <a href="for-partners.html" class="mobile-sublink">
                  <strong>Operations Guide</strong>
                  <span>Settlement rules & underwriting</span>
                </a>
                <a href="for-partners.html#portal" class="mobile-sublink">
                  <strong>Partner Portal Sign In</strong>
                  <span>Insurer & broker portal</span>
                </a>
              </div>
            </li>

            <li><a href="faqs.html" class="mobile-nav-link">FAQs</a></li>
            <li><a href="contact.html" class="mobile-nav-link">Contact Us</a></li>
          </ul>
        </nav>

        <div class="mobile-drawer-footer">
          <button onclick="openPartnerModal(); closeMobileNavDrawer();" class="btn btn-find-partner" style="width:100%; justify-content:center; padding:12px; margin-bottom:10px;">Find a Partner</button>
          <a href="for-partners.html#portal" class="btn btn-signin" style="width:100%; text-align:center; justify-content:center; padding:12px; margin-bottom:14px;">Partner Sign In</a>
          
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
// Modern Superhero Floating Chat Widget & Speech Quote Bubble
// ==========================================================================
function injectChatWidget() {
  // Remove any legacy floating widget if present in DOM
  const existingLegacy = document.querySelectorAll('.floating-whatsapp-widget, #moovonChatWidget');
  existingLegacy.forEach(w => w.remove());

  const widget = document.createElement('div');
  widget.id = 'moovonChatWidget';
  widget.className = 'moovon-chat-widget-wrap';
  widget.innerHTML = `
    <!-- Top Floating Section: Floating Superhero Mascot on Left + Speech Bubble on Right -->
    <div class="moovon-hero-top-stage">
      <!-- The 3D Superhero Mascot Floating Above the Widget on Left -->
      <div class="moovon-mascot-float-box" aria-hidden="true">
        <img src="assets/graphics/mr_moovon_waving_avatar.png" 
             alt="Mr. Moovon Superhero" 
             class="moovon-mascot-floating-img"
             loading="eager">
        <div class="moovon-mascot-shadow"></div>
      </div>

      <!-- Floating Quote / Speech Bubble pointing to Mr. Moovon -->
      <div class="moovon-chat-bubble" id="moovonChatBubble">
        <button class="moovon-chat-bubble-close" id="closeChatBubble" aria-label="Dismiss chat quote">&times;</button>
        <div class="moovon-chat-bubble-badge">
          <span class="hero-live-pulse"></span> Online Now
        </div>
        <p class="moovon-chat-bubble-quote">“Need help spreading your insurance? <strong>Chat with us!</strong> 👋”</p>
        <div class="moovon-chat-bubble-arrow"></div>
      </div>
    </div>

    <!-- Floating Action Button Pill Below Mascot -->
    <a href="https://wa.me/233593293040?text=${encodeURIComponent('Hi Mr. Moovon, I want to ask about Moovon SpreadPay.')}" 
       target="_blank" 
       rel="noopener" 
       class="moovon-hero-widget-btn" 
       id="moovonWidgetTrigger"
       aria-label="Chat with Mr. Moovon on WhatsApp">
      
      <div class="moovon-wa-pill-badge">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.12-1.341c1.472.802 3.13 1.225 4.887 1.226h.005c5.506 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.924-7.062A9.923 9.923 0 0 0 12.012 2z"/>
          <path fill="#FFFFFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </div>

      <div class="moovon-hero-text-col">
        <div class="moovon-hero-name">Chat with Mr. Moovon</div>
        <div class="moovon-hero-sub">
          <span class="moovon-sub-tag">Chat with us</span> • Instant Reply
        </div>
      </div>

      <div class="moovon-wa-action-circle" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </a>
  `;

  document.body.appendChild(widget);

  // Close bubble trigger
  const closeBtn = document.getElementById('closeChatBubble');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const bubble = document.getElementById('moovonChatBubble');
      if (bubble) {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px) scale(0.9)';
        setTimeout(() => bubble.remove(), 250);
      }
    });
  }
}
window.injectChatWidget = injectChatWidget;
