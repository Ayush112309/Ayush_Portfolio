export const education = {
  institution: 'Indian Institute of Technology Hyderabad',
  degree: 'B.Tech in Chemical Engineering',
  start: '2023',
  end: '2027',
  score: '7.7',
  scoreLabel: 'CGPA',
  location: 'Hyderabad, India',
  coursework: [
    { group: 'AI & machine learning', courses: ['Machine Learning', 'Deep Learning', 'Artificial Intelligence'] },
    { group: 'Computer science', courses: ['Data Structures & Algorithms', 'Introduction to Programming'] },
    {
      group: 'Mathematics',
      courses: ['Probability and Random Variables', 'Linear Algebra', 'Optimization Techniques', 'Numerical Methods'],
    },
  ],
  /** Set to [] to hide school results. */
  earlier: [
    { title: 'Class XII, CBSE', school: 'Hind English Medium School', year: '2023', score: '72.80%' },
    {
      title: 'Class X, Maharashtra State Board',
      school: 'St. Sebastian High School & Jr. College',
      year: '2021',
      score: '95.20%',
    },
  ],
};
