/**
 * Featured projects (large cards + case-study modal).
 * - Add a project: copy an object, give it a unique `slug`, set `featured: true`.
 * - Remove a project: delete its object.
 * - `links.github` / `links.live`: leave empty ('') to hide the buttons.
 * - `visual`: one of 'twin' | 'rag' | 'mqtt' | 'pos' | 'audio' (abstract SVG art).
 * All figures below come from the CV. Keep it that way when editing.
 */
export const projects = [
  {
    slug: 'planttwin-ai',
    title: 'PlantTwin AI',
    category: 'Industrial digital twin',
    context: 'Built at 360 Technology LLC',
    tagline:
      'A digital twin of a plant floor: live PLC telemetry streams into time-series storage, and AI agents watch it for faults before they become downtime.',
    visual: 'twin',
    featured: true,
    domains: ['ai', 'backend', 'realtime'],
    stack: [
      'Python',
      'FastAPI',
      'TimescaleDB',
      'MQTT',
      'OPC-UA',
      'Siemens S7-1200',
      'WebSockets',
      'REST',
      'LLMs',
      'Docker',
      'PyTest',
    ],
    highlights: [
      'Streaming ingestion of 1,200+ telemetry events/sec at sub-40ms latency',
      'TimescaleDB hypertables with chunk partitioning: 45% faster analytical queries',
      'LLM-driven anomaly diagnostics and root-cause analysis at 94.2% alert precision',
    ],
    metrics: [
      { value: '1,200+', label: 'telemetry events/sec' },
      { value: '<40ms', label: 'end-to-end latency' },
      { value: '−45%', label: 'analytical query time' },
      { value: '94.2%', label: 'fault-alert precision' },
      { value: '99.9%', label: 'pipeline reliability' },
    ],
    overview:
      'PlantTwin AI is an industrial intelligence platform that mirrors physical equipment in software. It connects to real PLC hardware, keeps a live model of every sensor, and uses autonomous AI agents to detect anomalies, explain their likely cause and estimate remaining useful life.',
    problem:
      'Plant data is high-frequency, noisy and spread across industrial protocols that were never designed for the web. Operators need alerts they can trust, fast enough to act on, with a reason attached — not another dashboard of raw numbers.',
    solution:
      'A layered pipeline: PLC signals are read over OPC-UA and MQTT, normalised by backend microservices, written to TimescaleDB, and pushed to dashboards over MQTT-over-WebSockets. AI agents run on the same stream to diagnose multi-sensor anomalies and dispatch severity-ranked alerts.',
    architecture: [
      {
        name: 'Siemens S7-1200 PLC',
        detail: 'Physical source of sensor and equipment state, used for hardware-in-the-loop validation.',
      },
      { name: 'OPC-UA + MQTT ingestion', detail: 'Protocol adapters read PLC tags and publish normalised telemetry events.' },
      { name: 'Backend microservices', detail: 'Stream processing and agent orchestration services handling 1,200+ events/sec.' },
      { name: 'TimescaleDB', detail: 'Hypertables with chunk partitioning for high-frequency time-series storage.' },
      { name: 'AI agents', detail: 'LLM-driven anomaly diagnostics, root-cause analysis and predictive maintenance.' },
      { name: 'Operator dashboards', detail: 'Real-time state sync and alert dispatch over MQTT-over-WebSockets and REST.' },
    ],
    decisions: [
      'TimescaleDB over a general-purpose store: hypertables and chunk partitioning keep time-range queries fast as sensor history grows.',
      'MQTT-over-WebSockets for the browser path, so dashboards subscribe to the same pub/sub topics as backend services instead of polling.',
      'Agents consume the processed stream, not raw tags, so diagnostics work on clean, timestamped, unit-consistent data.',
      'Testing against real PLC hardware, not only simulators, inside a Dockerized CI/CD pipeline with PyTest suites.',
    ],
    challenges: [
      'Holding sub-40ms latency while ingesting 1,200+ events/sec from industrial protocols.',
      'Keeping alert precision high enough (94.2%) that operators act on alerts instead of muting them.',
      'Deploying continuously during hardware-in-the-loop testing without downtime.',
    ],
    links: { github: '', live: '' },
  },
  {
    slug: 'agentic-rag',
    title: 'Agentic RAG Knowledge Engine',
    category: 'Generative AI · Retrieval',
    tagline:
      'An asynchronous retrieval-augmented generation system where agents decide what to retrieve, call tools on their own, and cite the sources behind every answer.',
    visual: 'rag',
    featured: true,
    domains: ['ai', 'backend'],
    stack: ['Python', 'LangChain', 'ChromaDB', 'Dense embeddings', 'Docker', 'PyTest', 'Streamlit'],
    highlights: [
      'Multi-agent orchestration with autonomous tool-calling and conversational memory',
      'Recursive semantic chunking + persistent ChromaDB vector storage',
      '28% higher retrieval precision than naive semantic search',
    ],
    metrics: [
      { value: '+28%', label: 'retrieval precision vs naive search' },
      { value: '85%+', label: 'test coverage across API and retrieval' },
    ],
    overview:
      'A domain-specific question-answering engine built on retrieval-augmented generation. Instead of a single retrieve-then-answer step, agents plan retrieval, call tools when needed and keep conversational state, with every answer attributed to its source documents.',
    problem:
      'Naive semantic search returns chunks that look similar but miss the answer, and plain LLM responses can sound confident without a source. For domain Q&A, both are failures.',
    solution:
      'Documents are split with recursive semantic chunking, embedded densely and persisted in ChromaDB. An orchestration layer of agents performs dynamic retrieval and tool-calling asynchronously, keeps conversation memory, and returns answers with source attribution.',
    architecture: [
      { name: 'Ingestion', detail: 'Recursive semantic chunking of source documents.' },
      { name: 'Embedding + ChromaDB', detail: 'Dense vector embeddings in persistent vector storage.' },
      { name: 'Agent orchestration', detail: 'Multiple agents plan retrieval and call tools autonomously, asynchronously.' },
      { name: 'Memory + attribution', detail: 'Conversational state memory and source-grounded citations.' },
      { name: 'Interfaces', detail: 'Streamlit UI and CLI with structured JSON logging.' },
    ],
    decisions: [
      'Recursive semantic chunking instead of fixed-size windows, so chunks follow the structure of the content.',
      'Persistent ChromaDB storage so the index survives restarts and does not need re-embedding.',
      'Source attribution as a first-class output, making every answer checkable.',
      'Containerized with Docker and covered by a PyTest suite for repeatable runs.',
    ],
    challenges: [
      'Improving retrieval quality measurably — 28% over a naive semantic-search baseline.',
      'Reducing hallucinations in domain-specific answers by grounding responses in retrieved sources.',
      'Keeping configuration and logs manageable across UI, CLI and API entry points.',
    ],
    links: { github: '', live: '' },
  },
  {
    slug: 'mqtt-chat-engine',
    title: 'High-Throughput MQTT Real-Time Chat Engine',
    category: 'Real-time systems',
    tagline: 'Event-driven messaging over MQTT-over-WebSockets, built to keep delivering when the network does not cooperate.',
    visual: 'mqtt',
    featured: true,
    domains: ['realtime', 'backend'],
    stack: ['MQTT', 'WebSockets', 'JavaScript (ES6)', 'Pub/Sub', 'HTML', 'CSS'],
    highlights: [
      'Multi-topic chat rooms on MQTT pub/sub over WebSockets',
      'Automatic reconnect with exponential backoff and message persistence',
      'Sub-25ms delivery across 100+ concurrent simulated sessions',
    ],
    metrics: [
      { value: '<25ms', label: 'message delivery latency' },
      { value: '99.9%', label: 'delivery reliability on unstable networks' },
      { value: '100+', label: 'concurrent simulated sessions' },
    ],
    overview:
      'A low-latency chat system that uses MQTT, a protocol designed for unreliable IoT networks, as the transport for browser-based messaging across multiple topic-based rooms.',
    problem:
      'Real-time chat breaks in predictable ways: connections drop, messages get lost in the gap, and rendering slows down as traffic grows.',
    solution:
      'Clients subscribe to room topics over MQTT-over-WebSockets. A reconnect strategy with exponential backoff and client-side message persistence closes the gaps, while lightweight Base64 payloads and targeted DOM updates keep delivery fast.',
    architecture: [
      { name: 'Browser client', detail: 'Modular ES6 networking layer, separate from presentation.' },
      { name: 'MQTT over WebSockets', detail: 'Pub/sub transport with one topic per chat room.' },
      { name: 'Broker', detail: 'Routes messages to every subscriber of a topic.' },
      { name: 'Resilience layer', detail: 'Reconnect with exponential backoff and message persistence.' },
      { name: 'Rendering', detail: 'Base64 payload decoding and dynamic DOM rendering.' },
    ],
    decisions: [
      'MQTT instead of a custom WebSocket protocol: topics, QoS and lightweight framing come built in.',
      'Exponential backoff on reconnect so a flaky network does not turn into a reconnect storm.',
      'Strict separation of networking and presentation layers to keep each testable on its own.',
    ],
    challenges: [
      'Maintaining 99.9% message delivery under unstable network conditions.',
      'Keeping latency under 25ms with 100+ concurrent simulated browser sessions.',
    ],
    links: { github: '', live: '' },
  },
  {
    slug: 'cafe-pos',
    title: 'Enterprise Cafe Order & Billing System',
    category: 'Full-stack · Transactions',
    tagline:
      'A point-of-sale app with role-based access, a normalised transactional database and an analytics engine that shortened checkout.',
    visual: 'pos',
    featured: true,
    domains: ['backend'],
    stack: ['Python', 'Flask', 'SQLite', 'SQL', 'Bcrypt', 'JavaScript', 'Fetch API'],
    highlights: [
      'Session auth with Bcrypt and RBAC separating Admin and Cashier',
      '3NF schema with ACID transactions and parameterized queries',
      'Sales analytics with audit trails; checkout time cut by 40%',
    ],
    metrics: [
      { value: '−40%', label: 'checkout processing time' },
      { value: '3NF', label: 'normalised schema with ACID guarantees' },
    ],
    overview:
      'A full-stack POS system for cafe ordering and billing, designed around correctness: who can do what, and making sure every order and payment is recorded exactly once.',
    problem:
      'Billing software has to be fast at the counter and correct in the books. Shared logins, inconsistent records and slow checkout all cost real money.',
    solution:
      'Session-based authentication with Bcrypt-hashed passwords and role-based access for Admin and Cashier, on top of a normalised SQLite schema with transactional writes. An analytics engine builds sales history and audit trails, and the frontend updates orders asynchronously.',
    architecture: [
      { name: 'Frontend', detail: 'Responsive UI with asynchronous fetch calls for live order updates.' },
      { name: 'Auth + RBAC', detail: 'Bcrypt session authentication; Admin and Cashier permissions.' },
      { name: 'Order + billing service', detail: 'Transactional order and payment handling.' },
      { name: 'SQLite (3NF)', detail: 'Normalised schema, ACID compliance, parameterized queries.' },
      { name: 'Analytics engine', detail: 'Automated sales analytics and historical audit trails.' },
    ],
    decisions: [
      'Third normal form to avoid update anomalies in menu, order and payment data.',
      'Parameterized queries everywhere to rule out SQL injection by construction.',
      'Roles enforced on the server, not only hidden in the UI.',
    ],
    challenges: [
      'Keeping transactional integrity while making checkout 40% faster.',
      'Producing audit trails without slowing the order path.',
    ],
    links: { github: '', live: '' },
  },
  {
    slug: 'deeptrust',
    title: 'DeepTrust',
    category: 'AI API · Audio forensics',
    tagline:
      'An audio authenticity monitoring API that streams live deepfake-detection scores to dashboards as they are computed.',
    visual: 'audio',
    featured: true,
    domains: ['ai', 'backend', 'realtime'],
    stack: ['Python', 'Flask', 'REST', 'Server-Sent Events', 'CORS', 'Rate limiting'],
    highlights: [
      'High-concurrency Flask REST API serving real-time detection scores',
      'Server-Sent Events stream live prediction probabilities',
      'Under 80ms UI latency on the dashboard',
    ],
    metrics: [{ value: '<80ms', label: 'UI latency for live predictions' }],
    overview:
      'DeepTrust exposes deepfake audio detection as an API. Clients submit audio and receive authenticity scores, and dashboards watch prediction probabilities update live.',
    problem:
      'Synthetic audio is getting harder to spot by ear. Detection is only useful if it can be integrated into other products and returns results quickly enough to act on.',
    solution:
      'A Flask REST API with CORS and rate limiting serves detection scores, while Server-Sent Events push prediction probabilities to frontends as they arrive. Preprocessing, inference workers and the HTTP layer are separate modules.',
    architecture: [
      { name: 'HTTP layer', detail: 'Flask REST API with CORS and rate limiting.' },
      { name: 'Audio preprocessing', detail: 'Prepares incoming audio for the model.' },
      { name: 'Inference workers', detail: 'Run the detection model and produce probabilities.' },
      { name: 'SSE stream', detail: 'Pushes live predictions to dashboards with <80ms UI latency.' },
    ],
    decisions: [
      'Server-Sent Events instead of WebSockets: the data only flows one way, so SSE is simpler and works over plain HTTP.',
      'Inference workers separated from the HTTP layer so slow predictions do not block requests.',
      'Rate limiting at the API edge to keep a high-concurrency service stable.',
    ],
    challenges: [
      'Serving many concurrent clients without inference blocking the API.',
      'Keeping live dashboard updates under 80ms.',
    ],
    links: { github: '', live: '' },
  },
];

/**
 * Smaller projects, listed compactly under the featured work.
 * Set `link` to a repo or write-up to make the row clickable; leave empty to hide.
 */
export const archive = [
  {
    title: 'Mask-DINO Vision System',
    area: 'Computer vision',
    summary:
      'Object detection and instance segmentation with a Mask-DINO transformer, fine-tuned with OpenCV preprocessing and spatial augmentation.',
    result: '46.8 mAP at 38 FPS',
    stack: ['PyTorch', 'OpenCV', 'Transformers'],
  },
  {
    title: 'Text-to-Image Synthesis with SEAttnGAN',
    area: 'Generative AI',
    summary: '256×256 text-conditioned image generation on CUB-200 with cross-attention and an InfoNCE contrastive loss.',
    result: 'FID 139.79 → 118.76',
    stack: ['PyTorch', 'GANs', 'CLIP'],
  },
  {
    title: 'Multi-Label Scientific Text Classification',
    area: 'NLP',
    summary:
      'Classified ~21K research articles across 6 domains, benchmarking logistic regression, FastText, CNN + BiLSTM and LSTM models.',
    result: '~0.81 micro-F1',
    stack: ['Python', 'Word2Vec', 'LSTM'],
  },
  {
    title: 'AI-Assisted Liquid–Liquid Extraction',
    area: 'Process ML',
    summary:
      'Ternary phase equilibria and stage-wise mass balances, with an ANN surrogate replacing iterative stage calculations.',
    result: 'R² = 0.952, 99.4% faster optimisation',
    stack: ['Python', 'Neural networks', 'Simulation'],
  },
  {
    title: 'Steam Methane Reforming Reactor Model',
    area: 'Scientific computing',
    summary: 'Plug-flow reactor model coupling species-balance ODEs with kinetics and temperature-dependent gas properties.',
    result: '84.6% CH₄ conversion at 850°C, 25 bar',
    stack: ['Julia', 'DifferentialEquations.jl'],
  },
  {
    title: 'Solar Panel Thermal Control',
    area: 'Control systems',
    summary:
      'First-principles thermal model with a tuned PID and a constrained Model Predictive Controller under irradiance disturbances.',
    result: '38% lower overshoot, 42% faster settling vs PID',
    stack: ['MPC', 'PID', 'Dynamic modelling'],
  },
];
