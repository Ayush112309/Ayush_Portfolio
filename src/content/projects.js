/**
 * Featured projects (large cards + case-study modal) and the compact "More experiments" list.
 *
 * - Add a project: copy an object, give it a unique `slug`, set `featured: true`.
 * - Remove a project: delete its object. Order here = order on the page.
 * - `links.github` / `links.live` / `links.video`: leave empty ('') to hide the button.
 * - `visual`: 'twin' | 'invoice' | 'rag' | 'md' | 'gan' | 'mqtt' | 'pos' | 'audio' (abstract SVG art).
 * - `domains`: links the project into "How I think about systems" ('ai' | 'backend' | 'realtime').
 *
 * Every figure below is either from the internship (CV) or reproducible from the linked repository.
 * Keep it that way: interviewers open the repo.
 */
export const projects = [
  {
    slug: 'planttwin-ai',
    title: 'PlantTwin AI',
    category: 'Industrial digital twin',
    context: 'Internship · 360 Technology LLC, USA',
    tagline:
      'A digital twin for process plants: live PLC telemetry flows into a time-series historian, and AI agents watch it to flag faults, explain their likely cause and estimate remaining equipment life.',
    visual: 'twin',
    featured: true,
    domains: ['ai', 'backend', 'realtime'],
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'TimescaleDB',
      'MQTT',
      'OPC-UA',
      'Siemens S7-1200',
      'WebSockets',
      'LangChain',
      'React',
      'TypeScript',
      'Docker',
      'PyTest',
    ],
    highlights: [
      'Streaming pipeline handling 1,200+ telemetry events/sec at sub-40ms latency, validated on real PLC hardware',
      'TimescaleDB hypertables with chunk partitioning cut analytical query time by 45%',
      'LLM-driven anomaly diagnosis and root-cause analysis at 94.2% alert precision',
    ],
    metrics: [
      { value: '1,200+', label: 'telemetry events/sec' },
      { value: '<40ms', label: 'end-to-end latency' },
      { value: '−45%', label: 'analytical query time' },
      { value: '94.2%', label: 'fault-alert precision' },
      { value: '99.9%', label: 'pipeline reliability' },
      { value: '10 wks', label: 'concept to validated release' },
    ],
    overview:
      'PlantTwin AI mirrors physical plant equipment in software. It reads live signals from a Siemens S7-1200 PLC, stores every reading in a time-series historian, and runs AI agents on the stream that detect anomalies, explain the likely root cause in plain language and estimate remaining useful life. Around it sits an operations platform: an ISA-95 asset hierarchy (enterprise → site → area → line → equipment → sensor tag), JWT-secured role-based access for operators, engineers and managers, and live dashboards fed over WebSockets.',
    problem:
      'Process plants produce high-frequency, noisy data through industrial protocols that were never designed for the web. Most alarm systems either fire too often, so operators learn to ignore them, or fire too late to prevent downtime. Operators need alerts they trust, fast enough to act on, with a reason attached.',
    solution:
      'A layered pipeline. Protocol adapters read PLC tags over OPC-UA and MQTT; backend microservices normalise and timestamp each event; TimescaleDB stores them in partitioned hypertables; dashboards subscribe over MQTT-over-WebSockets. An agent layer consumes the clean stream, correlates multiple sensors to diagnose anomalies, and dispatches severity-ranked alerts with a suggested root cause. Everything was tested against the physical PLC in a hardware-in-the-loop setup.',
    architecture: [
      {
        name: 'Siemens S7-1200 PLC',
        detail: 'Physical source of sensor and equipment state; the hardware-in-the-loop test bench.',
      },
      { name: 'OPC-UA + MQTT adapters', detail: 'Read PLC tags and publish normalised, timestamped telemetry events.' },
      {
        name: 'FastAPI microservices',
        detail: 'Stream processing, asset hierarchy, auth and agent orchestration at 1,200+ events/sec.',
      },
      { name: 'TimescaleDB historian', detail: 'Hypertables with chunk partitioning for fast time-range and aggregate queries.' },
      { name: 'AI agent layer', detail: 'LLM-driven multi-sensor anomaly diagnosis, root-cause analysis and RUL estimation.' },
      { name: 'Operator dashboards', detail: 'Real-time state sync and alert dispatch over MQTT-over-WebSockets and REST.' },
    ],
    decisions: [
      'TimescaleDB over a general-purpose database: hypertables keep time-range queries fast as sensor history grows, without running a second data store next to PostgreSQL.',
      'MQTT-over-WebSockets for the browser path, so dashboards subscribe to the same topics as backend services instead of polling.',
      'Agents read the processed stream, not raw PLC tags, so diagnosis works on clean, unit-consistent, timestamped data.',
      'Tested on real PLC hardware, not only simulators, inside a Dockerized CI/CD pipeline with PyTest suites, which kept deployments at zero downtime.',
    ],
    challenges: [
      'Holding latency under 40ms while ingesting 1,200+ events/sec from industrial protocols.',
      'Keeping alert precision high enough (94.2%) that operators act on alerts instead of muting them.',
      'Shipping continuously during hardware-in-the-loop testing without interrupting the data stream.',
    ],
    links: {
      // The public repo is mostly the platform scaffold; add it here once it includes the ingestion pipeline.
      github: '',
      live: '',
      video: '',
    },
  },
  {
    slug: 'invoicedesk',
    title: 'InvoiceDesk',
    category: 'Agentic workflow · FinTech',
    context: 'Zamp AI Solutions Analyst case study · deployed',
    tagline:
      'From vendor invoice PDF to payment decision. AI reads the document, deterministic rules decide, and every one of the 8 stages streams live with an auditable reason.',
    visual: 'invoice',
    featured: true,
    domains: ['ai', 'backend'],
    stack: ['Python', 'FastAPI', 'Server-Sent Events', 'SQLite', 'Vision LLMs', 'Docker', 'Render'],
    highlights: [
      'Text parser first, vision LLM only when needed: cheap on clean PDFs, robust on scans',
      'Infers missing PO numbers and catches re-sent duplicates in different formats',
      'Handles 9 real-world edge cases, from split billing to bank-change fraud signals',
    ],
    metrics: [
      { value: '8', label: 'validation stages, streamed live' },
      { value: '9', label: 'edge-case scenarios handled end to end' },
      { value: '4', label: 'interchangeable AI providers with fallback' },
      { value: '0', label: 'payments approved without full verification' },
    ],
    overview:
      'InvoiceDesk automates accounts-payable review for an Indian company. Upload a vendor invoice and it reads the PDF, checks it against the vendor master, the purchase-order register and the payment ledger, and returns Approve, Hold or Reject with the reason, the next step and, when the vendor has to fix something, a draft email. Each run is saved to a history dashboard, and approved invoices post to the ledger so the PO balance updates.',
    problem:
      'An AP clerk opens every PDF, finds the matching PO in a spreadsheet and decides what to do. Invoices arrive in every layout, some are scans, tax is sometimes baked into prices, PO numbers go missing and vendors split one PO across several invoices. The expensive mistakes, such as double payments, overbilling and fraud, are exactly the ones a tired person misses.',
    solution:
      'One principle: AI reads, rules decide. A rule-based parser reads clean digital PDFs instantly and for free, and its result is kept only if every required field is present and the totals reconcile. Anything else escalates to a vision LLM. The decision itself is plain Python, so every payment outcome is repeatable and explainable to an auditor. Eight stages run in order and stream to the browser as they happen.',
    architecture: [
      { name: 'Receive', detail: 'Detects whether the PDF has a text layer or is a scanned image.' },
      {
        name: 'Read',
        detail: 'Text parser first; vision LLM (Groq, Gemini, Claude or any OpenAI-compatible model) with retries and fallback.',
      },
      {
        name: 'Check the invoice',
        detail: 'Required fields, line-item maths, subtotal + GST = total; normalises to the pre-tax amount.',
      },
      {
        name: 'Verify the vendor',
        detail: 'Matches by GSTIN then name; blocked vendors rejected; GSTIN mismatch or new bank details held.',
      },
      {
        name: 'Match the PO',
        detail: 'Uses the quoted PO, or infers one (70% amount fit, 30% description overlap) above 80% confidence.',
      },
      {
        name: 'Detect duplicates',
        detail: 'Normalised invoice numbers (NCS/2026/0412 ≡ NCS-2026-412) plus amount and date checks.',
      },
      {
        name: 'Amount vs PO',
        detail: 'Compares against the remaining balance, within 2% and ₹5,000; large totals need a manager.',
      },
      {
        name: 'Decide and record',
        detail: 'Approve posts to the ledger; Hold returns a reason, next step and vendor email draft.',
      },
    ],
    decisions: [
      'The LLM never makes the payment decision. Reading is probabilistic; approving money must be deterministic and auditable.',
      'Cheapest reliable reader first: most digital invoices never touch an API, and if every AI provider is down, scans are routed to a person instead of guessed.',
      'Checks run against the PO’s remaining balance, not its original value, which is what catches split-billing overruns.',
      'Tolerances and limits live in rules.json, so finance can tune them without a code change.',
      'Server-Sent Events stream each stage to the UI; the app runs as a long-lived service on Render because serverless can’t hold the stream.',
    ],
    challenges: [
      'Catching a duplicate that was re-sent with a different number format, after the first copy was already paid.',
      'Inferring the right PO when none is printed, without guessing when two POs are equally likely.',
      'Flagging likely fraud: a bank-detail change combined with a GSTIN that is off by one character.',
    ],
    links: {
      github: 'https://github.com/Ayush112309/Zamp_InvoiceDesk',
      live: 'https://invoice-desk-9hxy.onrender.com',
      video: 'https://youtu.be/tuJX-TK3ZlA',
    },
  },
  {
    slug: 'agentic-rag',
    title: 'Agentic RAG Knowledge Engine',
    category: 'Generative AI · Retrieval',
    tagline:
      'A document Q&A agent that answers only from your files, cites the source of every answer, and says so plainly when the answer isn’t there.',
    visual: 'rag',
    featured: true,
    domains: ['ai', 'backend'],
    stack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI', 'Ollama (Llama 3)', 'sentence-transformers', 'Streamlit', 'PyTest'],
    highlights: [
      'LangChain functions agent that decides when to call retrieval or a calculator tool',
      'Grounded answers with source citations and an explicit “not in the documents” refusal',
      'Runs on GPT-4o-mini or fully offline on Llama 3, with swappable embedding backends',
    ],
    metrics: [
      { value: '+28%', label: 'retrieval precision vs naive semantic search' },
      { value: '28', label: 'automated PyTest cases' },
      { value: '2', label: 'LLM backends: cloud and fully local' },
    ],
    overview:
      'A retrieval-augmented generation system that ingests PDFs, text files and CSVs, indexes them in a persistent ChromaDB vector store, and answers questions through a LangChain agent. Every answer carries its sources and similarity scores, so a user can check exactly which passage it came from. It ships with a Streamlit chat UI and a full CLI.',
    problem:
      'Plain LLM answers about a company’s own documents sound confident whether or not they are true, and naive similarity search often returns passages that look related but don’t contain the answer. For internal knowledge, an unsourced answer is worse than no answer.',
    solution:
      'Documents are split recursively (800-character chunks, 150 overlap), embedded and persisted. At question time an agent chooses its tools: it retrieves the top 4 chunks above a 0.30 similarity threshold, or uses a calculator for arithmetic. The prompt restricts it to retrieved context; if nothing relevant clears the threshold, it answers “I could not find relevant information in the provided documents.” A windowed memory keeps the last 10 turns for follow-up questions.',
    architecture: [
      { name: 'Ingestion', detail: 'PDF, TXT and CSV loaders with metadata for source attribution and deduplication.' },
      {
        name: 'Chunking + embedding',
        detail: 'Recursive splitting; OpenAI text-embedding-3-small or local sentence-transformers.',
      },
      { name: 'ChromaDB', detail: 'Persistent vector store with cosine-similarity search and relevance scores.' },
      {
        name: 'LangChain agent',
        detail: 'Functions agent with retrieval and calculator tools; falls back to a simple chain if needed.',
      },
      { name: 'Memory', detail: 'Conversation buffer window of 10 turns.' },
      { name: 'Interfaces', detail: 'Streamlit chat with retrieved-chunk inspection; CLI for ingest, query, status and reset.' },
    ],
    decisions: [
      'A similarity threshold plus an explicit refusal message: the system is allowed to say it doesn’t know.',
      'Every setting (model, chunk size, overlap, k, threshold, memory window) comes from environment config, so experiments need no code changes.',
      'Local Llama 3 via Ollama and sentence-transformers as a full offline path, for private documents or zero API cost.',
      'Modular packages (ingestion, embeddings, retrieval, agents, memory) behind one pipeline facade, each covered by tests.',
    ],
    challenges: [
      'Measurably improving retrieval quality over naive semantic search.',
      'Stopping the model from filling gaps with plausible-sounding but unsupported answers.',
    ],
    links: {
      github: 'https://github.com/Ayush112309/Agentic-RAG-System-',
      live: '',
      video: '',
    },
  },
  {
    slug: 'ml-cv-metadynamics',
    title: 'ML-Learned Collective Variables for Molecular Dynamics',
    category: 'Scientific ML · Simulation',
    context: 'Course project · Accelerating Molecular Dynamics with AI/ML',
    tagline:
      'Molecular simulations get stuck behind energy barriers. A model I wrote from scratch learns which motion matters, then biases the simulation along it, reaching a rare state 1,311 times where plain MD reached it zero times.',
    visual: 'md',
    featured: true,
    domains: ['ai'],
    stack: ['Python', 'NumPy', 'SciPy', 'OpenMM', 'TICA', 'Metadynamics', 'Matplotlib'],
    highlights: [
      'TICA implemented from scratch as a generalised eigenvalue problem in NumPy',
      'Learned the slow coordinate without being told which angle matters, then recovered it',
      '2× more transitions than metadynamics on the expert-chosen variable',
    ],
    metrics: [
      { value: '1,311', label: 'rare-state transitions in 20 ns (plain MD: 0)' },
      { value: '2×', label: 'transitions vs the expert-chosen CV (654)' },
      { value: '1.99 ± 0.04', label: 'ΔF in kcal/mol, matching the expert reference (2.14 ± 0.03)' },
    ],
    overview:
      'Alanine dipeptide has two conformations separated by a high free-energy barrier. At 300 K, plain molecular dynamics stays in one of them for the whole run. This project learns a collective variable (CV) from data, with no prior knowledge of the molecule, and uses well-tempered metadynamics along it to sample both states and measure the free-energy difference between them.',
    problem:
      'Enhanced-sampling methods only work if you push the simulation along the right coordinate, and choosing that coordinate usually takes expert intuition about the specific molecule. That doesn’t scale to systems nobody has studied yet.',
    solution:
      'Run a short, hot (800 K) simulation where barriers are crossed easily. Fit TICA, time-lagged independent component analysis, to dihedral features to find the slowest-changing combination. Use that learned CV for well-tempered metadynamics at 300 K, then reweight to recover the free-energy landscape and validate against both plain MD and metadynamics on the expert-chosen angle φ.',
    architecture: [
      { name: 'High-temperature MD', detail: 'Short 800 K OpenMM run to observe barrier crossings cheaply.' },
      { name: 'Feature extraction', detail: 'sin/cos of the φ and ψ backbone dihedrals.' },
      {
        name: 'TICA (from scratch)',
        detail: 'Time-lagged covariance and a generalised eigenvalue solve to find the slowest mode.',
      },
      {
        name: 'Well-tempered metadynamics',
        detail: 'Bias deposited along the learned CV at 300 K via a custom OpenMM CV force.',
      },
      { name: 'Reweighting + analysis', detail: 'Free-energy profiles, transition counts and ΔF with error bars.' },
      {
        name: 'Reproducible package',
        detail: 'Five scripted steps, executed notebook, report, slides and a rendered simulation video.',
      },
    ],
    decisions: [
      'Wrote TICA from first principles instead of calling a library, so every step of the method could be checked and explained.',
      'Validated against the known answer: the learned CV came out dominated by sin φ (weights 1.00 sin φ, 0.38 cos φ, under 0.07 on ψ), which is the coordinate chemists already use.',
      'Compared three methods over the same 20 ns window so the transition counts are a fair comparison.',
      'Packaged the whole study to rerun end to end in about 35 minutes on one CPU core.',
    ],
    challenges: [
      'Learning a useful coordinate from a short trajectory without overfitting to noise.',
      'Recovering unbiased free energies from a deliberately biased simulation.',
    ],
    links: {
      github: 'https://github.com/Ayush112309/ML-Learned-CV-Metadynamics',
      live: '',
      video: '',
    },
  },
  {
    slug: 'seattngan',
    title: 'Text-to-Image Synthesis with SEAttnGAN',
    category: 'Generative AI · Research',
    tagline:
      'Generating 256×256 bird images from text descriptions, and testing four ideas for making them better. One cut FID by 15%; two didn’t work, and the write-up explains why.',
    visual: 'gan',
    featured: true,
    domains: ['ai'],
    stack: ['Python', 'PyTorch', 'GANs', 'CLIP (ViT-B/32)', 'InfoNCE', 'WGAN-GP', 'ResNet-18'],
    highlights: [
      'Contrastive InfoNCE loss (λ = 0.1) cut FID from 139.79 to 118.76',
      'Four controlled experiments, about 230 GPU-hours on a T4',
      'Honest negative results: WGAN-GP and CLIP variants diagnosed, not hidden',
    ],
    metrics: [
      { value: '−15%', label: 'FID (139.79 → 118.76), lower is better' },
      { value: '4', label: 'controlled experiments' },
      { value: '~230', label: 'GPU-hours of training' },
    ],
    overview:
      'SEAttnGAN is a parameter-efficient attention GAN for text-to-image generation. Using the CUB-200 dataset (11,788 bird images, 10 captions each), I reproduced the baseline and ran three modifications aimed at better text–image alignment and more stable training, measuring each with Fréchet Inception Distance.',
    problem:
      'Text-to-image GANs often produce images that look plausible but don’t match the caption, and their adversarial training is notoriously unstable.',
    solution:
      'Word-level cross-attention aligns words with image regions, and sentence-level affine modulation conditions the generator. On top of the baseline, I added a contrastive InfoNCE loss to pull matching image–caption pairs together, tried a pretrained ResNet-18 discriminator with WGAN-GP, and swapped the BiLSTM text encoder for CLIP ViT-B/32 with an adapter.',
    architecture: [
      { name: 'Text encoder', detail: 'BiLSTM baseline; CLIP ViT-B/32 + adapter in experiment 4.' },
      { name: 'SEA attention block', detail: 'Word-level attention and sentence-level affine modulation.' },
      { name: 'Generator', detail: 'Progressive upsampling to 256×256.' },
      { name: 'Discriminator', detail: 'CNN with residual layers and text fusion; ResNet-18 + WGAN-GP in experiment 3.' },
      { name: 'Losses', detail: 'Hinge adversarial, matching-aware, InfoNCE contrastive, gradient penalty.' },
    ],
    decisions: [
      'Changed one thing per experiment against the same baseline, so each result is attributable.',
      'Chose InfoNCE because the main failure was text–image mismatch, not image quality alone.',
      'Kept and analysed the failed variants: the strong pretrained discriminator let the generator exploit it, which required rebalancing updates.',
    ],
    challenges: [
      'Training budgets of 40–70 hours per run on a single T4 GPU.',
      'Balancing generator and discriminator when the discriminator starts out much stronger.',
    ],
    links: {
      github: 'https://github.com/Ayush112309/Text-to-Image_Synthesis-SEAttnGAN',
      live: '',
      video: '',
    },
  },
];

/**
 * Smaller projects, listed compactly under the featured work.
 * `link` makes the row clickable; leave it empty to show the row without a link.
 */
export const archive = [
  {
    title: 'Hiring Intelligence Agent',
    area: 'Agentic AI',
    summary:
      'Multi-agent pipeline (planner, JD analyser, resume parser, matcher, decision) that ranks candidates with Pydantic-structured, explainable outputs.',
    result: 'Shortlist / Consider / Reject with confidence',
    stack: ['Python', 'Pydantic', 'Multi-agent'],
    link: 'https://github.com/Ayush112309/hiring-intelligence-agent',
  },
  {
    title: 'Pedagogical Ability Assessment of AI Tutors',
    area: 'NLP',
    summary:
      'Fine-tuned BERT and RoBERTa on tutor–student dialogues across four pedagogical tasks, comparing shared vs per-task backbones and four loss functions.',
    result: 'Accuracy up to 0.82 (exact setting)',
    stack: ['PyTorch', 'BERT', 'RoBERTa'],
    link: 'https://github.com/Ayush112309/Pedagogical-Ability-Assessment-AI-Powered-Tutors-',
  },
  {
    title: 'Cell Instance Segmentation',
    area: 'Computer vision',
    summary:
      'Group project: annotated microscopy images in COCO format and fine-tuned Mask R-CNN (Detectron2) with flip and noise augmentation.',
    result: 'Segmentation AP 44.1 (IoU 0.50:0.95)',
    stack: ['Detectron2', 'Mask R-CNN', 'OpenCV'],
    link: 'https://github.com/Ayush112309/Mask-DINO-Vision-System',
  },
  {
    title: 'Multi-Label Scientific Text Classification',
    area: 'NLP',
    summary:
      'Classified ~21K research articles across 6 domains, benchmarking logistic regression, FastText, CNN + BiLSTM and LSTM models.',
    result: '~0.81 micro-F1',
    stack: ['Python', 'Word2Vec', 'LSTM'],
    link: 'https://github.com/Ayush112309/Multilabel-Classification',
  },
  {
    title: 'AI-Assisted Liquid–Liquid Extraction',
    area: 'Process ML',
    summary:
      'Ternary phase equilibria and stage-wise mass balances, with an ANN surrogate replacing iterative stage calculations.',
    result: 'R² = 0.952, 99.4% faster optimisation',
    stack: ['Python', 'Neural networks', 'Simulation'],
    link: 'https://github.com/Ayush112309/AI-Assisted-Optimization-of-Liquid-Liquid-Extraction',
  },
  {
    title: 'Solar Panel Thermal Control',
    area: 'Control systems',
    summary:
      'First-principles thermal model with a tuned PID and a constrained Model Predictive Controller under irradiance disturbances.',
    result: '38% lower overshoot, 42% faster settling vs PID',
    stack: ['Julia', 'MPC', 'PID'],
    link: 'https://github.com/Ayush112309/Thermal-Modeling-Control-of-Solar-Panel-Temperature',
  },
  {
    title: 'Steam Methane Reforming Reactor Model',
    area: 'Scientific computing',
    summary: 'Plug-flow reactor model coupling species-balance ODEs with kinetics and temperature-dependent gas properties.',
    result: '84.6% CH₄ conversion at 850°C, 25 bar',
    stack: ['Julia', 'DifferentialEquations.jl'],
    link: '',
  },
];
