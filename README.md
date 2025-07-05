# FONS Marketing Website

A modern, responsive marketing website built with HTML, CSS, and JavaScript featuring 3D animations, smooth interactions, and a beautiful purple-themed design.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **3D Animations**: Interactive Three.js elements and CSS 3D transforms
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: CSS animations and scroll-triggered effects
- **Performance Optimized**: Fast loading with lazy loading and optimized assets
- **SEO Friendly**: Semantic HTML and meta tags for better search visibility
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 📁 Project Structure

\`\`\`
fons-marketing-website/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── portfolio.html          # Portfolio page
├── blog.html              # Blog page
├── contact.html           # Contact page
├── css/
│   ├── main.css           # Main styles with CSS variables
│   ├── components.css     # Reusable component styles
│   └── animations.css     # Animation definitions
├── js/
│   ├── utils.js           # Utility functions
│   ├── 3d-animations.js   # Three.js 3D animations
│   └── main.js            # Main JavaScript functionality
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
└── README.md             # Project documentation
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Deep violet (#6B46C1)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Light purple (#C084FC)
- **Lavender**: Light lavender (#E9D5FF)

### Typography
- **Primary Font**: Inter (body text)
- **Display Font**: Playfair Display (headings)

### Spacing Scale
- Uses a consistent 8px grid system
- CSS custom properties for maintainable spacing

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/fons-marketing-website.git
cd fons-marketing-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The website will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build optimized production files
- `npm run optimize` - Optimize images, CSS, and JavaScript
- `npm run deploy` - Deploy to Vercel production
- `npm run preview` - Deploy to Vercel preview

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy to production:
\`\`\`bash
npm run deploy
\`\`\`

### Manual Deployment

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Upload the `dist/` folder to your hosting provider

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization Features
- Lazy loading for images
- CSS and JavaScript minification
- Efficient 3D rendering with Three.js
- Optimized font loading
- Compressed assets

## 🎯 SEO Features

- Semantic HTML structure
- Open Graph meta tags
- Structured data markup
- Optimized images with alt text
- Clean URL structure
- XML sitemap ready

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- ARIA labels and roles

## 🔧 Customization

### Colors
Update the CSS custom properties in `css/main.css`:

\`\`\`css
:root {
  --color-primary: #6B46C1;
  --color-secondary: #8B5CF6;
  /* ... other colors */
}
\`\`\`

### Typography
Modify font imports in HTML head and update CSS variables:

\`\`\`css
:root {
  --font-family-primary: 'Your Font', sans-serif;
  --font-family-display: 'Your Display Font', serif;
}
\`\`\`

### 3D Animations
Customize Three.js animations in `js/3d-animations.js`:

\`\`\`javascript
// Modify colors, shapes, or animation parameters
const materials = [
  new THREE.MeshPhongMaterial({ color: 0x6B46C1 }),
  // Add your custom materials
];
\`\`\`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email hello@fonsmarketing.com or create an issue in the repository.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Google Fonts](https://fonts.google.com/) for typography
- [Vercel](https://vercel.com/) for hosting
- Design inspiration from modern marketing agencies

---

Built with ❤️ by the FONS Marketing team
\`\`\`
