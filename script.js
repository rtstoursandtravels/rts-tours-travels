(() => {
  const pages = [...document.querySelectorAll('.page')];
  const pageIds = new Set(pages.map(p => p.id));

  function currentPage() {
    const id = location.hash.replace('#', '');
    return pageIds.has(id) ? id : 'home';
  }
  function showPage(id, push = true) {
    if (!pageIds.has(id)) id = 'home';
    pages.forEach(page => {
      const active = page.id === id;
      page.classList.toggle('active', active);
      page.setAttribute('aria-hidden', String(!active));
    });
    if (push && location.hash !== `#${id}`) history.pushState({page:id}, '', `#${id}`);
    window.scrollTo({top:0, left:0, behavior:'auto'});
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-go]');
    if (!link) return;
    event.preventDefault();
    showPage(link.dataset.go);
  });
  window.addEventListener('popstate', () => showPage(currentPage(), false));
  window.addEventListener('hashchange', () => showPage(currentPage(), false));
  showPage(currentPage(), false);

  document.querySelectorAll('.pax-select').forEach(select => {
    for (let n=1; n<=20; n++) {
      const option = document.createElement('option');
      option.value = String(n);
      option.textContent = String(n);
      select.appendChild(option);
    }
  });

  const hotelPax = document.getElementById('hotel-pax');
  const passengerList = document.getElementById('passenger-list');
  function makePassengerRow(index) {
    const row = document.createElement('div');
    row.className = 'passenger-row';
    row.dataset.index = String(index);
    const title = document.createElement('select');
    title.name = `Passenger ${index+1} Title`;
    title.setAttribute('aria-label', `Passenger ${index+1} title`);
    ['Mr','Mrs','Ms','Miss','Master'].forEach(value => {
      const opt = document.createElement('option'); opt.value=value; opt.textContent=value; title.appendChild(opt);
    });
    const given = document.createElement('input');
    given.name = `Passenger ${index+1} Given Name`;
    given.placeholder = 'Given name'; given.required = true;
    given.setAttribute('aria-label', `Passenger ${index+1} given name`);
    const surname = document.createElement('input');
    surname.name = `Passenger ${index+1} Surname`;
    surname.placeholder = 'Surname'; surname.required = true;
    surname.setAttribute('aria-label', `Passenger ${index+1} surname`);
    row.append(title, given, surname);
    return row;
  }
  function renderPassengers() {
    if (!passengerList) return;
    passengerList.replaceChildren();
    const count = Math.max(1, Math.min(20, Number(hotelPax.value) || 1));
    for (let i=0; i<count; i++) passengerList.appendChild(makePassengerRow(i));
  }
  hotelPax?.addEventListener('change', renderPassengers);
  renderPassengers();

  const WHATSAPP_NUMBER = '919326685517';
  function formDataLines(form, serviceName) {
    // Visa / office-purpose WhatsApp message: send the request details only.
    // Do not append the extra confirmation/disclaimer paragraph.
    if (form.id === 'visa-form') {
      const data = new FormData(form);
      const lines = ['Service: Visa / Office Purpose Dummy Ticket Request'];
      for (const key of ['Departure Sector', 'Arrival Sector', 'Number of Pax', 'Date of Travel', 'Additional Details']) {
        const value = String(data.get(key) || '').trim();
        if (value) lines.push(`${key}: ${value}`);
      }
      return lines;
    }

    const data = new FormData(form);
    const lines = [`NEW ${serviceName.toUpperCase()} REQUEST`, `Service: ${serviceName}`];
    for (const [key, value] of data.entries()) {
      if (String(value).trim()) lines.push(`${key}: ${String(value).trim()}`);
    }
    lines.push('', 'Please confirm the available genuine, verifiable itinerary or reservation and applicable details. This is a request only, not a confirmed booking.');
    return lines;
  }
  function sendToWhatsApp(form, serviceName) {
    if (!form.reportValidity()) return;
    const lines = formDataLines(form, serviceName);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  }
  function attachSubmit(id, name, extraCheck) {
    const form = document.getElementById(id);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (extraCheck && !extraCheck(form)) return;
      sendToWhatsApp(form, name);
    });
  }
  attachSubmit('travel-form', 'Airport / Immigration Dummy Ticket Request', form => {
    const date = new Date(`${form.elements['Date of Travel'].value}T00:00:00`);
    const today = new Date(); today.setHours(0,0,0,0);
    if (date < today) { alert('Please select today or a future travel date.'); return false; }
    return true;
  });
  attachSubmit('visa-form', 'Visa / Office Purpose Dummy Ticket Request', form => {
    const date = new Date(`${form.elements['Date of Travel'].value}T00:00:00`);
    const today = new Date(); today.setHours(0,0,0,0);
    if (date < today) { alert('Please select today or a future travel date.'); return false; }
    return true;
  });
  attachSubmit('hotel-form', 'Hotel Booking Request', form => {
    const checkIn = new Date(`${form.elements['Check-in Date'].value}T00:00:00`);
    const checkOut = new Date(`${form.elements['Check-out Date'].value}T00:00:00`);
    if (checkOut <= checkIn) { alert('Check-out date must be after check-in date.'); return false; }
    const today = new Date(); today.setHours(0,0,0,0);
    if (checkIn < today) { alert('Please select today or a future check-in date.'); return false; }
    return true;
  });
})();