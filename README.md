# DevLinks

**DevLinks** is a cutting-edge, full-stack web application built with modern technologies, designed to empower developers to showcase their projects, connect with peers, and build a vibrant community. Whether you're a seasoned developer or just starting out, DevLinks provides a seamless platform to share your work, discover inspiring projects, and network with like-minded individuals.

## 🚀 Features

DevLinks offers a comprehensive suite of features to enhance your developer experience:

### 🔐 Authentication & User Management
- Secure authentication powered by **Clerk**
- User profiles with customizable avatars, bios, and usernames
- Follow/unfollow system to build your network

### 📁 Project Showcase
- Create and manage personal projects with rich descriptions
- Add tech stacks, GitHub/live links, and project images
- View project analytics (e.g., view counts)

### 🌟 Community Engagement
- Explore featured projects from the community
- Like and bookmark projects for easy access
- Search functionality to discover relevant projects

### 🔗 External Links
- Share additional resources via external links
- Organize and display links on your profile

### 📱 Responsive Design
- Fully responsive UI built with **Tailwind CSS** and **Radix UI**
- Optimized for desktop, tablet, and mobile devices
- Dark mode support with gradient themes

### 🛠️ Developer-Friendly
- Built with **Next.js 15** and **React 19** for optimal performance
- TypeScript for type safety and better developer experience
- Server-side rendering and API routes for fast, scalable applications

## 🛠️ Tech Stack

DevLinks leverages the latest in web development technologies:

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React Icons
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (with SQLite for development)
- **Authentication**: Clerk
- **Deployment**: Vercel-ready
- **Other**: React Hook Form, Zod for validation, Sonner for notifications

## 📋 Prerequisites

Before running DevLinks locally, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database (or use SQLite for quick setup)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Khizar-cyber-dev/DevLinks
   cd Devlinks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/devlinks"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signIn
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signIn
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

   > **Note**: Replace the placeholder values with your actual Clerk keys and database URL. For quick development, you can use SQLite by setting `DATABASE_URL="file:./dev.db"`.

4. **Set up the database**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000).

## 📖 Usage

### For Users
- **Sign Up/Login**: Create an account or sign in with Clerk.
- **Dashboard**: View community members and featured projects.
- **Profile**: Customize your profile, add projects, and manage links.
- **Explore**: Discover projects, like, bookmark, and follow users.
- **Add Projects**: Share your work with the community.

### For Developers
- **API Routes**: Explore serverless API endpoints for data management.
- **Components**: Reusable UI components built with Radix UI.
- **Hooks**: Custom React hooks for state management and utilities.

## 🧪 Testing

Run the test suite (if implemented):
```bash
npm run test
```

## 🚀 Deployment

DevLinks is optimized for deployment on Vercel:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set environment variables in Vercel dashboard.
4. Deploy!

For other platforms, ensure your build command is `npm run build` and start command is `npm start`.

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Author**: Khizar Asim
- **Email**: hafizkhizarasim7@gmail.com
- **GitHub**: https://github.com/Khizar-cyber-dev
- **LinkedIn**: https://www.linkedin.com/in/khizar-asim-developer

---

**DevLinks** - Where developers connect, create, and inspire! 🌟

*Built with ❤️ using Next.js and modern web technologies.*
