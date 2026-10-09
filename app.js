(() => {
  'use strict';

  const PHONE = '5595808352';
  const EMAIL = 'brown.rickey95@gmail.com';

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById('quote-form');
  const errorBox = document.getElementById('form-error');
  const textButton = document.getElementById('send-text');
  const emailButton = document.getElementById('send-email');

  function normalize(value) {
    return String(value || '').trim();
  }

  function validateQuote() {
    if (!form) return null;

    const data = new FormData(form);
    const fields = {
      name: normalize(data.get('name')),
      phone: normalize(data.get('phone')),
      email: normalize(data.get('email')),
      zip: normalize(data.get('zip')),
      service: normalize(data.get('service')),
      details: normalize(data.get('details')),
      timing: normalize(data.get('timing')) || 'Flexible',
      scopeConfirm: data.get('scope_confirm') === 'on'
    };

    if (!fields.name || !fields.phone || !fields.zip || !fields.service || !fields.details) {
      throw new Error('Please complete all required fields before sending your quote request.');
    }

    if (!/^\d{5}(-\d{4})?$/.test(fields.zip)) {
      throw new Error('Please enter a valid 5-digit ZIP code.');
    }

    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      throw new Error('Please enter a valid email address or leave the email field blank.');
    }

    if (!fields.scopeConfirm) {
      throw new Error('Please confirm that you understand our non-licensed handyman service scope.');
    }

    return fields;
  }

  function buildMessage(fields) {
    return [
      'Brown West Handyman Services — Quote Request',
      '',
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      `Email: ${fields.email || 'Not provided'}`,
      `ZIP: ${fields.zip}`,
      `Service: ${fields.service}`,
      `Preferred timing: ${fields.timing}`,
      '',
      'Job details:',
      fields.details
    ].join('\n');
  }

  function withValidation(callback) {
    try {
      const fields = validateQuote();
      if (errorBox) errorBox.textContent = '';
      callback(fields);
    } catch (error) {
      if (errorBox) errorBox.textContent = error.message;
      const firstInvalid = form?.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  }

  if (textButton) {
    textButton.addEventListener('click', () => withValidation((fields) => {
      const body = encodeURIComponent(buildMessage(fields));
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const separator = isIOS ? '&' : '?';
      window.location.href = `sms:${PHONE}${separator}body=${body}`;
    }));
  }

  if (emailButton) {
    emailButton.addEventListener('click', () => withValidation((fields) => {
      const subject = encodeURIComponent(`Quote Request — ${fields.service}`);
      const body = encodeURIComponent(buildMessage(fields));
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }));
  }
})();
