const currentPath = window.location.pathname.split('/').pop();
const sidebarLinks = document.querySelectorAll('.sidebar-links a, .article-sidebar-links a');

if (sidebarLinks.length) {
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === `#${currentPath}`) {
      link.classList.add('active');
    }
  });
  
  // For the sidebar, match .html files
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(currentPath)) {
      link.classList.add('active');
      
      // Open parent details elements
      let parent = link.closest('details');
      while (parent) {
        parent.setAttribute('open', '');
        parent = parent.parentElement.closest('details');
      }
    }
  });
}

const navLinks = document.querySelectorAll('.nav-links a');
if (navLinks.length) {
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(currentPath)) {
      link.classList.add('active');
    }
  });
}

// Search functionality with suggestions
const articles = [
  { title: 'Sign Up & Onboarding', url: 'help/sign-up-onboarding.html', keywords: ['sign up', 'account', 'team', 'invite', 'onboarding'] },
  { title: 'Getting Started', url: 'help/getting-started.html', keywords: ['getting started', 'dashboard', 'feedback', 'types'] },
  { title: 'Installation & Implementation', url: 'help/implementation.html', keywords: ['installation', 'implementation', 'code', 'snippet', 'gtm', 'google tag manager'] },
  { title: 'Feedback Button', url: 'help/feedback-button.html', keywords: ['feedback button', 'passive form', 'floating', 'button'] },
  { title: 'Trigger-based Forms', url: 'help/web-campaigns.html', keywords: ['trigger-based', 'campaigns', 'triggered', 'behavior', 'survey'] },
  { title: 'Targeting Options for Trigger-based Forms', url: 'help/web-campaigns-targeting.html', keywords: ['targeting', 'targeting rules', 'campaign targeting', 'targeting options'] },
  { title: 'Embedded Forms', url: 'help/embedded-survey.html', keywords: ['embedded', 'in-page', 'widget', 'form'] },
  { title: 'Analyse Your Results', url: 'help/analyse-results.html', keywords: ['analyse', 'analysis', 'results', 'data', 'dashboard'] },
  { title: 'Team Management', url: 'help/team-management.html', keywords: ['team', 'management', 'members', 'roles', 'permissions'] },
  { title: 'Custom Variables', url: 'help/custom-variables.html', keywords: ['custom', 'variables', 'metadata', 'user tier'] },
  { title: 'CSP Configuration', url: 'help/csp-configuration.html', keywords: ['csp', 'security', 'content security policy', 'configuration'] }
];

function performSearch(query) {
  const results = [];
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return results;
  
  articles.forEach(article => {
    const titleMatch = article.title.toLowerCase().includes(lowerQuery);
    const keywordMatch = article.keywords.some(keyword => keyword.includes(lowerQuery));
    
    if (titleMatch || keywordMatch) {
      results.push(article);
    }
  });
  
  return results;
}

function showSuggestions(searchContainer, results) {
  // Remove existing suggestions
  const existingSuggestions = searchContainer.querySelector('.search-suggestions');
  if (existingSuggestions) {
    existingSuggestions.remove();
  }
  
  if (results.length === 0) {
    return;
  }
  
  const isArticlePage = window.location.pathname.includes('/help/');
  
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.className = 'search-suggestions';
  
  results.forEach(result => {
    const link = document.createElement('a');
    const adjustedUrl = isArticlePage ? result.url.replace('help/', '') : result.url;
    link.href = adjustedUrl;
    link.className = 'search-suggestion-item';
    link.innerHTML = `<span class="search-suggestion-title">${result.title}</span><span class="search-suggestion-url">${result.url}</span>`;
    suggestionsDiv.appendChild(link);
  });
  
  searchContainer.appendChild(suggestionsDiv);
}

function hideSuggestions(searchContainer) {
  const suggestions = searchContainer.querySelector('.search-suggestions');
  if (suggestions) {
    suggestions.remove();
  }
}

// Attach search functionality to all search inputs
const searchInputs = document.querySelectorAll('.search-box input, .search-hero input, .page-search input');
searchInputs.forEach(input => {
  const searchContainer = input.closest('.search-box') || input.closest('.search-hero') || input.closest('.page-search');
  
  input.addEventListener('input', (e) => {
    const query = input.value;
    const results = performSearch(query);
    
    if (results.length > 0) {
      showSuggestions(searchContainer, results);
    } else {
      hideSuggestions(searchContainer);
    }
  });
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const results = performSearch(input.value);
      if (results.length > 0) {
        const isArticlePage = window.location.pathname.includes('/help/');
        const adjustedUrl = isArticlePage ? results[0].url.replace('help/', '') : results[0].url;
        window.location.href = adjustedUrl;
      }
    }
  });
  
  input.addEventListener('blur', () => {
    setTimeout(() => {
      hideSuggestions(searchContainer);
    }, 200);
  });
});
