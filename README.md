# Rully W H - Professional Portfolio

A modern, SEO-friendly Jekyll website for showcasing professional experience and resume, optimized for GitHub Pages deployment.

## 🚀 Features

- **SEO Optimized**: Comprehensive meta tags, structured data, and search engine optimization
- **Responsive Design**: Mobile-first approach with beautiful styling across all devices
- **Fast Loading**: Optimized assets and performance-focused development
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **GitHub Pages Ready**: Configured for easy deployment to GitHub Pages
- **Professional Design**: Modern, clean layout perfect for professional portfolios

## 📋 Pages Included

1. **Homepage**: Hero section with call-to-action buttons
2. **About Me**: Comprehensive professional summary and background
3. **Resume**: Download page for your professional resume (PDF)

## 🛠️ Setup Instructions

### 1. Prerequisites
- Ruby 2.7 or higher
- Bundler gem installed
- GitHub account (for GitHub Pages deployment)

### 2. Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

### 3. Configuration

Edit `_config.yml` to customize your information:

```yaml
# Update these fields
author:
  name: "Your Full Name"
  email: "your.email@example.com"
  linkedin: "your-linkedin-username"
  github: "your-github-username"

url: "https://yourusername.github.io" # Your GitHub Pages URL
```

### 4. Add Your Resume

1. Place your resume PDF file in the `assets/files/` directory
2. Ensure the filename is: `resume-RULLY_W_H-v6.9.pdf`
3. The file will be automatically available for download on the Resume page

## 📁 Project Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/             # Page templates
│   ├── default.html      # Base layout with SEO meta tags
│   └── page.html         # Standard page layout
├── _includes/            # Reusable components
│   ├── header.html       # Site header with navigation
│   └── footer.html       # Site footer
├── assets/
│   ├── css/style.scss    # Main stylesheet (SCSS)
│   ├── js/main.js        # JavaScript functionality
│   └── files/            # Resume and other files
├── index.html            # Homepage
├── about.md              # About Me page
├── resume.md             # Resume download page
├── Gemfile               # Ruby dependencies
└── README.md             # This file
```

## 🎯 SEO Features

- **Meta Tags**: Comprehensive Open Graph and Twitter Card tags
- **Structured Data**: JSON-LD schema markup for better search indexing
- **Sitemap**: Automatic XML sitemap generation
- **Canonical URLs**: Proper canonical link tags
- **Page Speed**: Optimized for Core Web Vitals

## 📱 Responsive Design

- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly navigation
- Optimized typography for all screen sizes

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast ratios
- Screen reader compatible

## 🚀 Deployment to GitHub Pages

1. **Create Repository**: Create a new repository on GitHub named `yourusername.github.io`

2. **Push Code**: Push your code to the main branch

3. **Enable GitHub Pages**: 
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: Deploy from a branch
   - Choose main branch and / (root) folder

4. **Wait for Deployment**: GitHub will automatically build and deploy your site

5. **Access Your Site**: Visit `https://yourusername.github.io`

## 🔧 Customization

### Colors
Edit the SCSS variables in `assets/css/style.scss`:

```scss
$primary-color: #2563eb;    // Main brand color
$secondary-color: #64748b;    // Secondary text color
$accent-color: #f59e0b;       // Accent/highlight color
```

### Content
- Edit `index.html` for homepage content
- Modify `about.md` for your professional summary
- Update `resume.md` for resume page content

### Fonts
The site uses Inter font from Google Fonts. Change in `assets/css/style.scss`:

```scss
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap');
```

## 📊 Performance Optimization

- **Minified CSS**: SCSS compilation with compression
- **Optimized Images**: Use WebP format for better performance
- **Lazy Loading**: Images load when needed
- **Caching**: Proper cache headers configured

## 🔒 Security

- Content Security Policy headers
- HTTPS enforcement
- Safe external link handling
- No inline JavaScript

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Check the GitHub Issues section
- Review Jekyll documentation at [jekyllrb.com](https://jekyllrb.com/docs/)
- Consult GitHub Pages documentation

---

**Built with ❤️ using Jekyll and optimized for GitHub Pages**