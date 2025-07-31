module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: [
        'http://localhost:4321',
        'http://localhost:4321/pakker',
        'http://localhost:4321/kontakt',
        'http://localhost:4321/faq',
        'http://localhost:4321/case'
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
