# 🎯 SlidesFire

A presentation framework built by developers, for developers. Create stunning presentations using React, Framer Motion, and TailwindCSS. Because PowerPoint is so 2005! 😎

> Built for React developers who prefer writing JSX over clicking through GUI editors.

## 🎯 Perfect For Developers Who:
- Love coding and want to create presentations programmatically
- Need fine-grained control over animations and transitions
- Want to use React components in their slides
- Prefer Git version control over cloud storage
- Enjoy the flexibility of JSX over rigid slide editors

## 🌟 Features

- 🎨 Beautiful animations powered by Framer Motion
- 🌓 Dark/Light mode with a fun toggle
- ⌨️ Keyboard navigation (arrow keys & spacebar)
- 📱 Responsive design
- 🎮 Interactive elements
- 🎆 Confetti celebrations!
- 🔍 Text selection toggle
- 🎥 Fullscreen mode
- 🎪 Floating blob backgrounds

## 🚀 Developer Experience
- Write slides in TSX/JSX
- Use React components and hooks
- Hot module reloading for instant preview
- Component-based architecture
- Type-safe slide creation
- Easy to extend and customize
- Git-friendly format
- Import npm packages directly into slides
- Use any React library or component

## 🚀 Getting Started!

1. Clone this repository:
```bash
git clone https://github.com/DaksshDev/SlidesFire-React-Sample-Presentation
cd SlidesFire-React-Sample-Presentation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎮 Controls

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `H` | Toggle controls visibility |
| `F11` | Toggle fullscreen |
| Mouse icon | Toggle text selection |

## 🛠️ Tech Stack

- [React](https://reactjs.org/) - UI Framework
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide Icons](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build Tool

## 📁 Project Structure

```
slidex-react/
├── public/
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── Presentation/
│   │   │   ├── Slide.tsx
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   └── ...
│   │   └── ui/
│   ├── config/
│   │   └── slides.tsx
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## 💡 The Story

It all started with a school project! Instead of making a regular PowerPoint presentation for my Civics project, I thought "Why not make something cooler?" 🤔

Being a young developer who loves React, I decided to turn this challenge into an opportunity. I wanted to:
1. Make learning more engaging for my classmates 📚
2. Show that students can innovate with technology 💡
3. Create something that others could use too 🌟

What started as a simple school presentation evolved into a full-fledged presentation framework! I combined:
- React for the structure
- Framer Motion for smooth animations
- TailwindCSS for beautiful design
- And lots of fun features like dark mode and confetti! 🎉

Why build yet another presentation framework? Because:
1. PowerPoint doesn't have cool animations 🎭
2. Google Slides doesn't have dark mode 🌙
3. Regular presentations don't spark joy ✨
4. I wanted to show that kids can code cool stuff too! 👨‍💻

The best part? My teachers and classmates loved it! They were amazed to see how technology could make learning more interactive and fun. This project taught me that:
- Age is just a number when it comes to coding
- School projects can be opportunities for innovation
- Learning is more fun when you're creative!

Now I'm sharing this with everyone, hoping it inspires other students to think outside the box and create something unique for their projects! 🚀

## 🎨 Customization

### Adding New Slides

Add your slides in `src/config/slides.tsx`:

```tsx
export const slides = [
  {
    id: 1,
    content: (
      <div className="text-center space-y-8">
        <motion.h1>Your Slide Content</motion.h1>
      </div>
    ),
  },
  // ... more slides
];
```

### Changing Theme

Modify the theme in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your colors */ }
      }
    }
  }
}
```

## 📝 License

MIT - Feel free to use this for your own presentations!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Shoutout to the React community for awesome tools
- High five to everyone who makes learning fun!

---

Made with ❤️ by [Dakssh](https://github.com/DaksshDev)

*P.S. If you're reading this, you're awesome! Star the repo if you liked it! ⭐*

## 🎯 Important Notes

### Scroll Control
FireSlides offers two display modes:

1. **Fixed Mode (Default)**
   - Professional presentation style
   - Content stays within viewport
   - No scrolling for clean slide transitions
   - Recommended for final presentations

2. **Scroll Mode (Optional)**
   - Enabled via the scroll toggle button
   - Allows scrolling for overflow content
   - Useful during development
   - Can be toggled on/off at any time

**Best Practice:** Design slides to fit within viewport when using fixed mode for the most professional presentation experience.

## 🎪 Examples

See FireSlides in action with these demo presentations:

### 1. Feature Demo
[slidesfire.netlify.app](https://slidesfire.netlify.app/)
- Comprehensive showcase of FireSlides features
- Animation examples
- Interactive components
- Code snippets and documentation
- Perfect for developers to explore capabilities

### 2. Civics Project
[fireslides-demo.netlify.app](https://fireslides-demo.netlify.app/)
- The original presentation that inspired FireSlides
- Real-world example of a school project
- Shows how coding can make learning more engaging
- Demonstrates practical application in education

> 💡 These examples show how FireSlides can be used for both technical documentation and educational content, making presentations more interactive and engaging!

---
```
