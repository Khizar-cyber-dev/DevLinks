'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof features>('projects')

  const features = {
    projects: {
      title: "Project Showcase",
      description: "Highlight your work with detailed project presentations",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      items: [
        {
          title: "Rich Project Details",
          description: "Add titles, descriptions, and images to showcase your work",
          model: "Project { title, description, imageUrl }"
        },
        {
          title: "Tech Stack Tagging",
          description: "Tag projects with the technologies you used",
          model: "TechStack { name } ← Project"
        },
        {
          title: "View Analytics",
          description: "Track how many people view your projects",
          model: "Project { viewCount }"
        }
      ]
    },
    profile: {
      title: "Developer Profile",
      description: "Build your professional developer identity",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      items: [
        {
          title: "Personal Information",
          description: "Add your name, username, bio, and avatar",
          model: "User { name, username, bio, avatarUrl }"
        },
        {
          title: "External Links",
          description: "Connect your GitHub, portfolio, and social media",
          model: "ExternalLink { title, url } ← User"
        },
        {
          title: "Professional Stats",
          description: "Track your projects, followers, and activity",
          model: "User { projects, followers, following }"
        }
      ]
    },
    engagement: {
      title: "Engagement",
      description: "Interact with other developers and projects",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      items: [
        {
          title: "Like Projects",
          description: "Show appreciation for projects you admire",
          model: "Like { user, project }"
        },
        {
          title: "Bookmark Content",
          description: "Save projects to revisit later",
          model: "Bookmark { user, project }"
        },
        {
          title: "Follow Developers",
          description: "Stay updated with developers you respect",
          model: "Follow { follower, following }"
        }
      ]
    },
    community: {
      title: "Community",
      description: "Connect with other developers",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      items: [
        {
          title: "Discover Developers",
          description: "Find developers by tech stack or interests",
          model: "User { techStacks, projects }"
        },
        {
          title: "Network Growth",
          description: "Build your professional connections",
          model: "User { followers, following }"
        },
        {
          title: "Activity Feed",
          description: "See what's happening in your network",
          model: "Like, Bookmark, Follow events"
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              DevLinks <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to showcase your work, connect with peers, and grow as a developer
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(features).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof features)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${activeTab === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {features[key as keyof typeof features].title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-indigo-500 p-8 text-white">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                {features[activeTab].icon}
              </div>
              <h2 className="text-2xl font-bold mb-2">{features[activeTab].title}</h2>
              <p className="text-blue-100">{features[activeTab].description}</p>
              <div className="mt-8">
                <Link 
                  href="/signup" 
                  className="inline-block px-6 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-opacity-90 transition-all"
                >
                  Try It Now
                </Link>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {features[activeTab].items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm text-gray-700 overflow-x-auto">
                      {item.model}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Complete Feature Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(features).map(([key, feature]) => (
              <div 
                key={key} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveTab(key as keyof typeof features)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  {feature.items.length} key features →
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to build your developer presence?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of developers who are showcasing their work and growing their network on DevLinks
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md font-medium hover:from-blue-700 hover:to-indigo-600 transition-all"
          >
            Create Your Free Account
          </Link>
        </div>
      </main>
    </div>
  )
}