/* ============================================================
   OBSTETRIC ANESTHESIA TLVMC – app.js
   Handles: tab navigation, card rendering, search, GA tracking
   ============================================================ */

// ── Metadata (sourced from metadata.json content) ──────────────────────
const METADATA = {
  "literature": [
    {
      "filename": "Acog Practice Bulletin Hypertensive Disease pregnancy.pdf",
      "title": "ACOG Practice Bulletin: Hypertensive Disorders in Pregnancy",
      "summary": "ACOG clinical management guidelines for obstetrician-gynecologists providing evidence-based recommendations on the diagnosis and management of hypertensive disorders complicating pregnancy."
    },
    {
      "filename": "Anesthesia & Breastfeeding Infographic.pdf",
      "title": "Anesthesia & Breastfeeding – Patient Infographic",
      "summary": "A visual infographic summarizing the evidence on the safety of anesthetic agents for breastfeeding mothers, including data from a randomized controlled trial on fentanyl dose and breastfeeding success."
    },
    {
      "filename": "Bauer SOAP_Thrombocytopenia_Consensus_Statement_FINAL.pdf",
      "title": "SOAP Consensus Statement: Neuraxial Anesthesia in Thrombocytopenia (Bauer)",
      "summary": "A consensus statement from the Society for Obstetric Anesthesia and Perinatology (SOAP) weighing the risks of neuraxial techniques against the morbidity of general anesthesia in obstetric patients with thrombocytopenia."
    },
    {
      "filename": "ERC 2025 cardiac arrest guidelines.pdf",
      "title": "ERC 2025 Guidelines: Cardiac Arrest in Special Circumstances",
      "summary": "European Resuscitation Council 2025 guidelines on resuscitation in special circumstances, including cardiac arrest in pregnancy, based on the International Liaison Committee on Resuscitation consensus on science."
    },
    {
      "filename": "ESAIC Guidelines Failed Block.pdf",
      "title": "ESAIC Guidelines: Management of the Failing Epidural in Labour",
      "summary": "ESAIC focused clinical guidelines providing evidence-based recommendations for the systematic management of an inadequate or failing epidural block during labour analgesia."
    },
    {
      "filename": "Failure of communication a patient's story.pdf",
      "title": "Failure of Communication – A Patient's Story",
      "summary": "A first-person narrative describing a patient's experience of pain during caesarean section under neuraxial anaesthesia, highlighting the critical importance of communication between the anesthesiologist and the patient."
    },
    {
      "filename": "GA for Non OB Surgery.pdf",
      "title": "General Anaesthesia for Non-Obstetric Surgery in Pregnancy",
      "summary": "A narrative review summarising 20 years of literature on anaesthetic management and outcomes of non-obstetric surgery performed under general anaesthesia during pregnancy."
    },
    {
      "filename": "Intraoperative CD Pain.pdf",
      "title": "Intraoperative Pain During Cesarean Delivery Under Neuraxial Anesthesia",
      "summary": "A clinical review of the challenging scenario of breakthrough pain during cesarean section under neuraxial anesthesia, with a framework for swift decision-making based on obstetric urgency and surgical context."
    },
    {
      "filename": "Labor Analgesia Review.pdf",
      "title": "Labor Analgesia: Comprehensive Narrative Review",
      "summary": "A comprehensive narrative review by Stanford University discussing recent evidence surrounding the use of regional anaesthesia techniques for labor analgesia and their clinical implications."
    },
    {
      "filename": "Maternal Mortality.pdf",
      "title": "Maternal Mortality and the Role of Neuraxial Anesthesia",
      "summary": "A review examining anesthesia-related maternal morbidity and mortality, highlighting that neuraxial anesthesia and analgesia is considered the technique of choice for labor and cesarean delivery."
    },
    {
      "filename": "Neurologic and Neuromuscular Disease.pdf",
      "title": "Neurologic & Neuromuscular Disease in Pregnancy: Anesthetic Management",
      "summary": "A comprehensive reference covering obstetric and anesthetic management of pregnant patients with a wide range of neurological and neuromuscular conditions, including multiple sclerosis, poliomyelitis, and intracranial hypertension."
    },
    {
      "filename": "Nitrous Oxide for Labor.pdf",
      "title": "Nitrous Oxide for Labor Analgesia: Pro-Con Debate",
      "summary": "An evidence-based Pro-Con debate providing clinicians with the knowledge to determine whether to employ inhaled nitrous oxide as a labor analgesic technique in the obstetrical suite."
    },
    {
      "filename": "Non Neuraxial Labor Analgesia.pdf",
      "title": "Update on Non-Neuraxial Labor Analgesia",
      "summary": "A current review of non-neuraxial pharmacological and non-pharmacological options for labor analgesia, providing an up-to-date evidence base for clinical decision-making."
    },
    {
      "filename": "NonObstetric Surgery.pdf",
      "title": "Anesthetic Management for Non-Obstetric Surgery in Pregnancy",
      "summary": "A systematic review from KU Leuven examining anesthetic techniques and maternal-fetal outcomes for non-obstetric surgical procedures performed during pregnancy."
    },
    {
      "filename": "OB Anesthesia Cardiac Disease.pdf",
      "title": "Obstetric Anesthesia in Cardiac Disease",
      "summary": "An in-depth review of obstetric anesthesia and analgesia considerations for the growing population of pregnant women with cardiovascular disease, covering both congenital and acquired cardiac conditions."
    },
    {
      "filename": "OB Emergency Manual Stanford.pdf",
      "title": "OB Emergency Manual – Stanford Anesthesia (OBLS)",
      "summary": "A concise clinical emergency manual from Stanford OB Anesthesia covering critical obstetric emergencies including maternal cardiac arrest, amniotic fluid embolism, hemorrhage, difficult airway, and local anesthetic systemic toxicity."
    },
    {
      "filename": "Obstetric Airway.pdf",
      "title": "The Anticipated Difficult Airway in Obstetric General Anaesthesia",
      "summary": "A narrative literature review and practical management recommendations for the anticipated difficult airway encountered during obstetric general anaesthesia."
    },
    {
      "filename": "PDPH Editorial on Guidelines.pdf",
      "title": "PDPH Guidelines: Editorial Commentary",
      "summary": "An editorial commentary on the development of post-dural puncture headache guidelines, emphasizing the importance of informed consent, patient education, and structured follow-up for PDPH after neuraxial procedures."
    },
    {
      "filename": "PDPH Guidelines.pdf",
      "title": "Post-Dural Puncture Headache (PDPH): Clinical Practice Guidelines",
      "summary": "Comprehensive clinical practice guidelines on post-dural puncture headache, covering its occurrence after unintentional dural puncture during epidural techniques or intentional puncture during spinal anesthesia."
    },
    {
      "filename": "PPH How I Do It.pdf",
      "title": "Postpartum Hemorrhage – How I Do It",
      "summary": "A practical 'how I do it' guide to managing postpartum hemorrhage, including the use of viscoelastic monitoring (thromboelastography) and laboratory tests to assess maternal coagulation in real time."
    },
    {
      "filename": "Pain Management.pdf",
      "title": "Pain Management in Obstetrics",
      "summary": "A review of pharmacological and non-pharmacological options for obstetric pain relief, establishing neuraxial techniques such as the epidural as the gold standard against which all other labor analgesic modalities are compared."
    },
    {
      "filename": "Placenta Accreta management.pdf",
      "title": "Placenta Accreta Spectrum: Anesthetic Management",
      "summary": "An article co-authored from Tel Aviv Sourasky Medical Center reviewing the anesthetic management strategies for placenta accreta spectrum disorder, focusing on hemorrhage risk and perioperative planning."
    },
    {
      "filename": "Remifentanil for Labor.pdf",
      "title": "Remifentanil for Labor Analgesia",
      "summary": "A manuscript from KU Leuven and Stanford reviewing the pharmacology, clinical application, and safety considerations of remifentanil patient-controlled analgesia for labor pain management."
    },
    {
      "filename": "Review GA for CD.pdf",
      "title": "Review: General Anaesthesia for Cesarean Delivery",
      "summary": "A comprehensive review of general anaesthesia for cesarean delivery, examining anaesthesia-related maternal mortality data and the risks of airway complications during emergence and recovery."
    },
    {
      "filename": "SOAP neuraxial thrombocytopenia AA2021.pdf",
      "title": "SOAP Interdisciplinary Consensus: Neuraxial Procedures in Thrombocytopenia (2021)",
      "summary": "The Society for Obstetric Anesthesia and Perinatology (SOAP) 2021 interdisciplinary consensus statement on the safety thresholds and decision-making framework for neuraxial procedures in obstetric patients with thrombocytopenia."
    },
    {
      "filename": "Society_for_Obstetric_Anesthesia_and_Perinatology_.95413.pdf",
      "title": "SOAP Consensus Statement on Obstetric Anesthesia Management",
      "summary": "A SOAP consensus statement incorporating evidence-based management strategies for obstetric patients, including recommendations aligned with guidelines from ACOG and the American Society of Anesthesiologists."
    },
    {
      "filename": "Spinal Hypotension Consensus Statement.pdf",
      "title": "International Consensus: Vasopressor Management of Spinal Hypotension at Cesarean",
      "summary": "An international consensus statement providing guidelines on the management of hypotension with vasopressors during caesarean section performed under spinal anaesthesia."
    },
    {
      "filename": "US in OB Practice.pdf",
      "title": "Ultrasound in Obstetric Anesthesia Practice",
      "summary": "A review of point-of-care ultrasound applications in obstetric anesthesia, including its role in facilitating early labor epidural placement and potentially reducing the need for general anesthesia."
    }
  ],
  "protocols": [
    {
      "filename": "Doses.jpeg",
      "title": "Drug Doses Quick Reference",
      "summary": "A quick-reference chart of drug doses used in obstetric anesthesia at TLVMC.",
      "type": "image"
    },
    {
      "filename": "Manual Lysis Protocol Tel Aviv Medical Center.pdf",
      "title": "Manual Lysis / Retained Placenta Protocol – TLVMC",
      "summary": "The Tel Aviv Medical Center protocol for anesthetic management of manual lysis of retained placenta after vaginal delivery, with decision pathways based on patient stability and risk for postpartum hemorrhage."
    }
  ]
};

// ── MCQ Data (keyed by PDF filename) ──────────────────────────────────
const MCQ_DATA = {
  "Bauer SOAP_Thrombocytopenia_Consensus_Statement_FINAL.pdf": {
    "title": "SOAP Consensus: Neuraxial Procedures in Thrombocytopenia",
    "description": "Reading focus: rationale for neuraxial anesthesia, the platelet cutoff, and when it may be reasonable to go lower.",
    "mcqs": [
      {
        "question": "What platelet count is generally considered low risk for neuraxial procedures in obstetric thrombocytopenia?",
        "options": { "A": "≥50,000 × 10⁶/L", "B": "≥70,000 × 10⁶/L", "C": "≥100,000 × 10⁶/L", "D": "≥150,000 × 10⁶/L" },
        "correct": "B",
        "explanation": "The SOAP consensus statement supports ≥70,000 × 10⁶/L as the platelet count at which the risk of spinal epidural hematoma is likely to be very low in appropriate obstetric patients."
      },
      {
        "question": "When might neuraxial anesthesia be considered below 70,000 × 10⁶/L?",
        "options": { "A": "Never", "B": "Only if platelet function testing is normal", "C": "When competing risks make avoiding general anesthesia important", "D": "Only after prophylactic platelet transfusion" },
        "correct": "C",
        "explanation": "In selected cases, particularly around 50,000–70,000 × 10⁶/L, neuraxial anesthesia may be considered if competing risks make avoidance of general anesthesia important."
      },
      {
        "question": "Why is the decision not based on the platelet count alone?",
        "options": { "A": "Platelet counts are irrelevant in pregnancy", "B": "General anesthesia may also carry important maternal and fetal risks", "C": "Spinal hematoma is common in obstetrics", "D": "Platelet transfusion removes all neuraxial risk" },
        "correct": "B",
        "explanation": "The decision should include platelet count, etiology, trend, bleeding history, urgency, airway risk, and patient preferences."
      }
    ]
  },
  "Spinal Hypotension Consensus Statement.pdf": {
    "title": "International Consensus: Vasopressor Management of Spinal Hypotension",
    "description": "Reading focus: why prophylaxis is used, blood pressure targets, and when prophylaxis should be modified.",
    "mcqs": [
      {
        "question": "Why are vasopressors commonly used prophylactically after spinal anesthesia for cesarean delivery?",
        "options": { "A": "Hypotension is rare but dangerous", "B": "Hypotension is frequent, predictable, and often preventable", "C": "Vasopressors improve the quality of surgical anesthesia", "D": "Vasopressors prevent failed spinal anesthesia" },
        "correct": "B",
        "explanation": "Spinal anesthesia commonly causes hypotension during cesarean delivery. Prophylactic vasopressors are used because hypotension is frequent and predictable, and proactive treatment can reduce hypotension and associated maternal symptoms."
      },
      {
        "question": "What blood pressure target is recommended?",
        "options": { "A": "Maintain systolic BP above 70% baseline", "B": "Maintain systolic BP at ≥90% baseline and avoid <80% baseline", "C": "Treat only if systolic BP falls below 80 mmHg", "D": "Treat only if the patient becomes symptomatic" },
        "correct": "B",
        "explanation": "The consensus statement recommends maintaining systolic arterial pressure at ≥90% of baseline and avoiding a fall to <80% of baseline."
      },
      {
        "question": "When might prophylactic vasopressor infusion not be required, or be started lower?",
        "options": { "A": "In pre-eclampsia", "B": "In elective cesarean delivery", "C": "In twin pregnancy", "D": "In patients with nausea" },
        "correct": "A",
        "explanation": "Women with pre-eclampsia develop less hypotension after spinal anesthesia. If prophylaxis is used, it may need a lower starting rate."
      }
    ]
  },
  "Intraoperative CD Pain.pdf": {
    "title": "Pain During Cesarean Delivery Under Neuraxial Anesthesia",
    "description": "Reading focus: believe the patient, do not dismiss reported pain, and have a structured plan if the block is insufficient or fails.",
    "mcqs": [
      {
        "question": "What is the first principle when a patient reports pain during cesarean delivery?",
        "options": { "A": "Reassure her that pressure is normal", "B": "Believe her and act", "C": "Wait until delivery is complete", "D": "Increase oxytocin" },
        "correct": "B",
        "explanation": "Pain, anxiety, and discomfort expressed by the patient must be taken seriously. The clinician should listen, believe, and respond."
      },
      {
        "question": "What should be in place before incision?",
        "options": { "A": "A fixed plan to avoid general anesthesia", "B": "A rescue plan if the block is insufficient", "C": "Routine intravenous opioids for all patients", "D": "No further testing once the spinal is inserted" },
        "correct": "B",
        "explanation": "Before incision, the block should be assessed appropriately and the team should have a clear plan for what to do if anesthesia is insufficient."
      },
      {
        "question": "If pain occurs after surgery has started, what is the best next step?",
        "options": { "A": "Continue surgery without interruption", "B": "Ask the obstetrician to hurry and ignore the pain", "C": "Communicate and select a rescue strategy together, including offering general anesthesia", "D": "Tell the patient pain is expected" },
        "correct": "C",
        "explanation": "The response should be structured and shared: believe the patient, communicate with the obstetric team, and choose a rescue strategy together — options may include supplementation or conversion to general anesthesia."
      }
    ]
  }
};

// ── Tab Navigation ─────────────────────────────────────────────────────
function switchTab(tabName) {
  // Deactivate all
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Activate target
  const btn = document.getElementById('tab-' + tabName);
  const panel = document.getElementById('panel-' + tabName);
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected', 'true'); }
  if (panel) { panel.classList.add('active'); }

  // Track tab switch in GA
  if (typeof gtag !== 'undefined') {
    gtag('event', 'tab_switch', { tab_name: tabName });
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ── PDF Icon SVG ────────────────────────────────────────────────────────
function pdfIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
    <line x1="9" y1="17" x2="15" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>`;
}

function externalLinkSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>`;
}

// ── Sanitize filename for use as HTML ID ───────────────────────────────
function slugify(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}

// ── GA4 Click Tracking ─────────────────────────────────────────────────
function trackDocOpen(filename, title, category) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'document_open', {
      document_filename: filename,
      document_title: title,
      document_category: category,
      event_label: filename
    });
  }
}

function trackDownload(filename) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'file_download', {
      file_name: filename,
      link_text: 'Download Rotation Instructions'
    });
  }
}

function trackExternal(label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      link_url: 'https://accesscd.github.io/ManualLysis/',
      link_text: label,
      outbound: true
    });
  }
}

// ── Render Literature Cards ────────────────────────────────────────────
function renderLiteratureCards(items) {
  const grid = document.getElementById('literature-grid');
  if (!grid) return;
  grid.innerHTML = '';

  items.forEach((doc, idx) => {
    const safeTitle = doc.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const rowId = 'lit-row-' + slugify(doc.filename);
    const folder = 'Literature/';
    const href = folder + encodeURIComponent(doc.filename);
    const hasMcq = !!MCQ_DATA[doc.filename];

    const row = document.createElement('a');
    row.href = href;
    row.target = '_blank';
    row.rel = 'noopener';
    row.className = 'lit-row' + (hasMcq ? ' lit-row--has-mcq' : '');
    row.id = rowId;
    row.setAttribute('aria-label', 'Open ' + doc.title);
    row.setAttribute('data-title', doc.title);
    row.setAttribute('data-summary', doc.summary.toLowerCase());
    row.innerHTML =
      '<div class="lit-row-left">' +
        '<div class="lit-row-icon">' + pdfIconSVG() + '</div>' +
        '<span class="lit-row-title">' + safeTitle + '</span>' +
      '</div>' +
      '<div class="lit-row-right">' +
        (hasMcq
          ? '<button class="btn-mcq btn-mcq--sm" id="mcq-btn-' + slugify(doc.filename) + '" aria-label="Reading MCQs for ' + doc.title + '">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-mcq-icon"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
              '<span class="btn-mcq-label">MCQs</span>' +
            '</button>'
          : '') +
        '<svg class="lit-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</div>';

    row.addEventListener('click', function() {
      trackDocOpen(doc.filename, doc.title, 'literature');
    });

    if (hasMcq) {
      const mcqBtn = row.querySelector('.btn-mcq');
      mcqBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openMCQModal(doc.filename);
        if (typeof gtag !== 'undefined') {
          gtag('event', 'mcq_open', { document_filename: doc.filename, document_title: doc.title });
        }
      });
    }

    grid.appendChild(row);
  });
}

// ── Search / Filter ────────────────────────────────────────────────────
let allLiterature = METADATA.literature;

function filterLiterature(query) {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? allLiterature.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q)
      )
    : allLiterature;

  renderLiteratureCards(filtered);

  const label = document.getElementById('doc-count-label');
  if (label) label.textContent = filtered.length + ' document' + (filtered.length !== 1 ? 's' : '');

  const noResults = document.getElementById('no-results-msg');
  if (noResults) {
    noResults.classList.toggle('hidden', filtered.length > 0);
  }
}

// ── Render Protocol Cards ──────────────────────────────────────────────
function renderProtocolCards() {
  const grid = document.getElementById('protocols-grid');
  if (!grid) return;
  grid.innerHTML = '';

  METADATA.protocols.forEach(doc => {
    const isImage = doc.type === 'image' || /\.(jpeg|jpg|png|gif|webp)$/i.test(doc.filename);
    const folder = 'Protocols/';
    const cardId = 'proto-card-' + slugify(doc.filename);

    if (isImage) {
      // Image card with lightbox
      const card = document.createElement('div');
      card.className = 'img-card';
      card.id = cardId;
      const imgSrc = folder + encodeURIComponent(doc.filename);
      card.innerHTML = `
        <img src="${imgSrc}" alt="${doc.title}" class="img-card-img" loading="lazy" />
        <div class="img-card-body">
          <h3 class="img-card-title">${doc.title}</h3>
          <p class="img-card-summary">${doc.summary}</p>
        </div>
      `;
      card.addEventListener('click', function() {
        openLightbox(imgSrc, doc.title);
        trackDocOpen(doc.filename, doc.title, 'protocol-image');
      });
      grid.appendChild(card);
    } else {
      // PDF card
      const href = folder + encodeURIComponent(doc.filename);
      const card = document.createElement('a');
      card.href = href;
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'doc-card';
      card.id = cardId;
      card.setAttribute('aria-label', 'Open ' + doc.title);
      card.innerHTML = `
        <div class="doc-card-header">
          <div class="doc-card-pdf-icon">${pdfIconSVG()}</div>
          <div>
            <div class="doc-card-type">PDF · Protocol</div>
          </div>
        </div>
        <div class="doc-card-body">
          <h3 class="doc-card-title">${doc.title}</h3>
          <p class="doc-card-summary">${doc.summary}</p>
        </div>
        <div class="doc-card-footer">
          <span class="doc-card-open-link">Open PDF ${externalLinkSVG()}</span>
        </div>
      `;
      card.addEventListener('click', function() {
        trackDocOpen(doc.filename, doc.title, 'protocol');
      });
      grid.appendChild(card);
    }
  });
}

// ── Lightbox ───────────────────────────────────────────────────────────
function openLightbox(src, alt) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close image" id="lightbox-close-btn">✕</button>
      <img src="${src}" alt="${alt}" />
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  function closeLightbox() {
    overlay.remove();
    document.body.style.overflow = '';
  }

  overlay.querySelector('#lightbox-close-btn').addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', escHandler); }
  });
}

// ── Init ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  renderLiteratureCards(allLiterature);
  renderProtocolCards();

  // Update count label
  const label = document.getElementById('doc-count-label');
  if (label) label.textContent = allLiterature.length + ' documents';
});


// ── MCQ Modal ──────────────────────────────────────────────────────────
function openMCQModal(filename) {
  const data = MCQ_DATA[filename];
  if (!data) return;

  let currentQ = 0;
  let score = 0;
  let answered = new Array(data.mcqs.length).fill(null);

  const existing = document.getElementById('mcq-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'mcq-overlay';
  overlay.id = 'mcq-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  overlay.innerHTML = `
    <div class="mcq-modal" id="mcq-modal-box">
      <div class="mcq-modal-header">
        <div class="mcq-modal-meta">
          <span class="mcq-badge-lg">Reading MCQs</span>
          <h2 class="mcq-modal-title">${data.title}</h2>
        </div>
        <button class="mcq-close-btn" id="mcq-close-btn" aria-label="Close">&#x2715;</button>
      </div>
      <div class="mcq-modal-body" id="mcq-modal-body"></div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  document.getElementById('mcq-close-btn').addEventListener('click', closeMCQ);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeMCQ(); });
  document.addEventListener('keydown', escHandler);

  renderQuestion();

  function renderQuestion() {
    const body = document.getElementById('mcq-modal-body');
    const q = data.mcqs[currentQ];
    const total = data.mcqs.length;
    const pct = Math.round((currentQ / total) * 100);
    const chosen = answered[currentQ];

    const optionKeys = Object.keys(q.options);
    const optionsHTML = optionKeys.map(function(key) {
      var val = q.options[key];
      var cls = chosen ? getOptionClass(key, q.correct, chosen) : '';
      var dis = chosen ? 'disabled' : '';
      return '<button class="mcq-option-btn' + cls + '" data-key="' + key + '" ' + dis + '>' +
        '<span class="mcq-option-key">' + key + '</span>' +
        '<span class="mcq-option-text">' + val + '</span>' +
        '</button>';
    }).join('');

    var explanationHTML = '';
    if (chosen) {
      var isCorrect = chosen === q.correct;
      var iconCorrect = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="mcq-expl-icon"><polyline points="20 6 9 17 4 12"/></svg>';
      var iconWrong = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="mcq-expl-icon"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      var labelHTML = isCorrect
        ? iconCorrect + ' Correct'
        : iconWrong + ' Incorrect &mdash; answer is <strong>' + q.correct + '</strong>';
      var prevBtn = currentQ > 0 ? '<button class="btn btn-outline mcq-nav-btn" id="mcq-prev">&#8592; Previous</button>' : '<span></span>';
      var nextBtn = currentQ < total - 1
        ? '<button class="btn btn-primary mcq-nav-btn" id="mcq-next">Next Question &#8594;</button>'
        : '<button class="btn btn-primary mcq-nav-btn" id="mcq-finish">See Results</button>';
      explanationHTML = '<div class="mcq-explanation ' + (isCorrect ? 'mcq-explanation--correct' : 'mcq-explanation--incorrect') + '">' +
        '<div class="mcq-explanation-label">' + labelHTML + '</div>' +
        '<p class="mcq-explanation-text">' + q.explanation + '</p>' +
        '</div>' +
        '<div class="mcq-nav">' + prevBtn + nextBtn + '</div>';
    }

    body.innerHTML = '<div class="mcq-progress-wrap">' +
      '<div class="mcq-progress-label">Question ' + (currentQ + 1) + ' of ' + total + '</div>' +
      '<div class="mcq-progress-bar-bg"><div class="mcq-progress-bar-fill" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<div class="mcq-question-card">' +
      '<p class="mcq-question-text">' + q.question + '</p>' +
      '<div class="mcq-options" id="mcq-options">' + optionsHTML + '</div>' +
      explanationHTML +
      '</div>';

    if (!chosen) {
      body.querySelectorAll('.mcq-option-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var pick = this.dataset.key;
          answered[currentQ] = pick;
          if (pick === q.correct) score++;
          if (typeof gtag !== 'undefined') {
            gtag('event', 'mcq_answer', { document_filename: filename, question_index: currentQ + 1, chosen_answer: pick, correct: pick === q.correct });
          }
          renderQuestion();
        });
      });
    } else {
      var prev = body.querySelector('#mcq-prev');
      var next = body.querySelector('#mcq-next');
      var finish = body.querySelector('#mcq-finish');
      if (prev) prev.addEventListener('click', function() { currentQ--; renderQuestion(); });
      if (next) next.addEventListener('click', function() { currentQ++; renderQuestion(); });
      if (finish) finish.addEventListener('click', renderResults);
    }
  }

  function getOptionClass(key, correct, chosen) {
    if (key === correct) return ' mcq-option--correct';
    if (key === chosen && chosen !== correct) return ' mcq-option--incorrect';
    return ' mcq-option--dimmed';
  }

  function renderResults() {
    var body = document.getElementById('mcq-modal-body');
    var total = data.mcqs.length;
    var pct = Math.round((score / total) * 100);
    var perfect = score === total;
    var good = score >= Math.ceil(total * 0.67);

    if (typeof gtag !== 'undefined') {
      gtag('event', 'mcq_complete', { document_filename: filename, score: score, total: total, percent: pct });
    }

    var scoreClass = perfect ? 'mcq-results-score--perfect' : good ? 'mcq-results-score--good' : 'mcq-results-score--retry';
    var scoreLabel = perfect ? '&#127881; Perfect score!' : good ? '&#10003; Well done' : '&#128218; Review the paper and try again';

    var breakdownHTML = data.mcqs.map(function(q, i) {
      var ok = answered[i] === q.correct;
      return '<div class="mcq-result-row ' + (ok ? 'mcq-result-row--correct' : 'mcq-result-row--incorrect') + '">' +
        '<span class="mcq-result-icon">' + (ok ? '&#10003;' : '&#10007;') + '</span>' +
        '<span class="mcq-result-q">Q' + (i + 1) + ': ' + q.question + '</span>' +
        '</div>';
    }).join('');

    body.innerHTML = '<div class="mcq-results">' +
      '<div class="mcq-results-score ' + scoreClass + '">' +
      '<div class="mcq-score-number">' + score + ' / ' + total + '</div>' +
      '<div class="mcq-score-label">' + scoreLabel + '</div>' +
      '</div>' +
      '<div class="mcq-results-breakdown">' + breakdownHTML + '</div>' +
      '<div class="mcq-results-actions">' +
      '<button class="btn btn-outline" id="mcq-retry-btn">Try Again</button>' +
      '<button class="btn btn-primary" id="mcq-done-btn">Done</button>' +
      '</div></div>';

    body.querySelector('#mcq-retry-btn').addEventListener('click', function() {
      currentQ = 0; score = 0; answered = new Array(data.mcqs.length).fill(null);
      renderQuestion();
    });
    body.querySelector('#mcq-done-btn').addEventListener('click', closeMCQ);
  }

  function closeMCQ() {
    var el = document.getElementById('mcq-modal-overlay');
    if (el) el.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e) { if (e.key === 'Escape') closeMCQ(); }
}
