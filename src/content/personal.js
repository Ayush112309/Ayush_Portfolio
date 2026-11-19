/** Personal details and the hero / about copy. */
export const personal = {
  name: 'Ayush Jhori Prakash Satish',
  shortName: 'Ayush Jhori',
  firstName: 'Ayush',
  monogram: 'AJ',
  email: 'ch23btech11022@iith.ac.in',
  phone: '+91 84217 43800',
  location: 'Hyderabad, India',
  /** Availability pill in the hero. Set `show: false` to hide it. */
  availability: {
    show: true,
    status: 'open',
    text: 'Open to internships and new-grad roles for 2027',
  },
  hero: {
    /** Each array entry renders on its own line. */
    headline: ['Building intelligent systems.', 'Engineering what comes next.'],
    roles: ['Software Engineer', 'AI/ML Engineer', 'Systems Builder'],
    intro:
      "I'm Ayush, an engineer at IIT Hyderabad working at the intersection of AI, backend systems, and intelligent software.",
    /** Figures shown under the hero. Taken directly from the CV. */
    proof: [
      { value: '1,200+', label: 'telemetry events/sec in PlantTwin AI' },
      { value: '94.2%', label: 'precision in automated fault alerting' },
      { value: '+28%', label: 'retrieval precision over naive search' },
      { value: '2×', label: 'Institute Football League champions as captain' },
    ],
  },
  about: {
    statement: 'Trained to model plants and processes. Now I build the software that runs them.',
    paragraphs: [
      'I study Chemical Engineering at IIT Hyderabad, and most of my engineering happens in software. The two fit together better than they look: a chemical plant is a distributed system of sensors, controllers and feedback loops, and I learned to think about flows, constraints and failure before I wrote my first API.',
      'Today I work across backend engineering, AI/ML and real-time systems — streaming telemetry pipelines, agentic RAG, event-driven messaging and the databases underneath them. I care about systems that hold up in practice: measured latency, tested failure paths and outputs you can trace back to a source.',
    ],
    facts: [
      { label: 'Studying', value: 'B.Tech Chemical Engineering, IIT Hyderabad (2027)' },
      { label: 'Working on', value: 'AI agents, backend infrastructure, industrial IoT' },
      { label: 'Captain', value: 'IIT Hyderabad football team, 2024 and 2025' },
      { label: 'Won', value: 'Two consecutive Institute Football League titles' },
      { label: 'Drawn to', value: 'Engineering complete systems, from the sensor to the screen' },
    ],
    /** The three overlapping disciplines drawn in the About visual. */
    disciplines: ['Process engineering', 'Software systems', 'Machine intelligence'],
  },
};
