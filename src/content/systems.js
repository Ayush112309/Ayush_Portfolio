/**
 * Content for "How I think about systems". Projects are linked automatically
 * by matching each project's `domains` field in projects.js.
 */
export const systemDomains = [
  {
    id: 'ai',
    name: 'AI intelligence',
    short: 'Decide',
    summary:
      'Models and agents that turn data into decisions — and can explain them. Useful AI is grounded in retrieved facts or measured signals, not just fluent output.',
    concepts: [
      'Retrieval-augmented generation',
      'Agent orchestration & tool-calling',
      'Anomaly detection & RCA',
      'Evaluation & error analysis',
    ],
    technologies: ['LangChain', 'ChromaDB', 'PyTorch', 'TensorFlow', 'OpenCV', 'scikit-learn'],
    workflow: [
      'Ingest documents or signals',
      'Embed and index',
      'Agent plans and retrieves',
      'Reason with tools',
      'Answer with sources',
    ],
  },
  {
    id: 'backend',
    name: 'Backend infrastructure',
    short: 'Store & serve',
    summary:
      'The services and storage that make intelligence reliable: clear API contracts, the right database for each access pattern, and tests that run on every change.',
    concepts: [
      'Microservices & API design',
      'Time-series & relational modelling',
      'Auth, RBAC & transactions',
      'Containerization & CI/CD',
    ],
    technologies: ['FastAPI', 'PostgreSQL', 'TimescaleDB', 'SQLite', 'Docker', 'PyTest'],
    workflow: [
      'Request arrives',
      'Authenticate and validate',
      'Service logic',
      'Transactional write / indexed read',
      'Respond and log',
    ],
  },
  {
    id: 'realtime',
    name: 'Real-time systems',
    short: 'Move',
    summary:
      'Getting data from where it happens to where it matters, fast. Event-driven pipelines, industrial protocols and live interfaces that survive flaky networks.',
    concepts: ['Pub/sub & event-driven design', 'Industrial protocols', 'Backpressure, retries & reconnects', 'Latency budgets'],
    technologies: ['MQTT', 'OPC-UA', 'WebSockets', 'Server-Sent Events', 'Siemens S7 PLC'],
    workflow: ['Sensor or client emits', 'Publish to topic', 'Broker routes', 'Subscribers process', 'Dashboard updates live'],
  },
];
