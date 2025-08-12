# Johnny Xmas Website - Svelte Version

This is the Svelte-powered version of the Johnny Xmas website, optimized for GitHub Pages deployment.

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Local Development

1. Install dependencies:
```bash
cd svelte-site
npm install
```

2. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

To build the site for production:

```bash
npm run build
```

This will create a `dist` directory with the production-ready files.

### Deploying to GitHub Pages

#### Option 1: Manual Deployment
1. Build the site: `npm run build`
2. Copy the contents of `dist` to the root directory
3. Commit and push to GitHub

#### Option 2: Automatic Deployment (GitHub Actions)
The repository includes a GitHub Actions workflow that automatically builds and deploys the site when you push to the main branch.

To enable automatic deployment:
1. Go to your repository settings on GitHub
2. Navigate to Pages settings
3. Set Source to "GitHub Actions"
4. Push changes to the main branch

## Project Structure

```
svelte-site/
├── src/
│   ├── App.svelte       # Main application component
│   ├── app.css          # Global styles
│   └── main.js          # Application entry point
├── public/
│   ├── assets/          # Static assets (images, videos)
│   └── CNAME           # Custom domain configuration
├── dist/               # Production build output
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment workflow
```

## Features

- **Responsive Design**: Optimized for all screen sizes
- **Video Player**: Interactive video with mute/unmute functionality
- **Terminal Theme**: Hacker-inspired green-on-black aesthetic
- **CRT Effect**: Retro TV display with scan lines and flicker effects
- **Fast Loading**: Optimized Svelte build for minimal bundle size

## Customization

### Updating Content
- Edit link sections in `src/App.svelte`
- Modify styles in `src/app.css`
- Replace video in `public/assets/vid/`
- Update CRT overlay image in `public/assets/img/`

### Changing Domain
Update the CNAME file in `public/` with your custom domain.

## Technologies Used

- [Svelte](https://svelte.dev/) - Reactive UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Bootstrap 3](https://getbootstrap.com/docs/3.4/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons

## License

© 2025 Johnny Xmas