import Link from 'next/link'

export default function Main({ darkMode }: { darkMode: boolean }) {
  return (
    <main>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              The Professional Network <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">for Developers</span>
            </h1>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Showcase your projects, connect with peers, and accelerate your career. DevLinks helps developers build their professional identity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md font-medium hover:from-blue-700 hover:to-indigo-600 transition-all text-center"
              >
                Get Started - Free Forever
              </Link>
              <Link 
                href="/features" 
                className={`px-6 py-3 border rounded-md font-medium text-center ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                See How It Works
              </Link>
            </div>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-white'} border-2`}
                  ></div>
                ))}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Join <span className="font-semibold">10,000+</span> developers already building with DevLinks
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className={`relative rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex items-center justify-between`}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  profile.devlinks.io
                </div>
                <div className="w-6"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                    JD
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">John Developer</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Senior Full Stack Engineer</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="font-bold text-2xl mb-1">42</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projects</div>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="font-bold text-2xl mb-1">1.2k</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Followers</div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
                  <h4 className="font-bold mb-2">Featured Project</h4>
                  <div className={`p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex items-center mb-2">
                      <div className={`w-10 h-10 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} mr-3 flex items-center justify-center`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">DevLinks API</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Node.js, TypeScript, GraphQL</div>
                      </div>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      A scalable API service for developer profiles and project management.
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    View Profile
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md text-sm font-medium hover:from-blue-700 hover:to-indigo-600 transition-all">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Developer Brand</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to showcase your work and connect with the right opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} transition-all shadow-sm`}>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Portfolio Showcase</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Present your projects with rich descriptions, tech stack details, and view analytics to understand your reach.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} transition-all shadow-sm`}>
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Network</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Build meaningful connections with other developers, follow industry leaders, and grow your professional circle.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} transition-all shadow-sm`}>
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Career Growth</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Get discovered by recruiters and companies looking for your exact skills and experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
              <h2 className="text-2xl font-bold mb-6">Experience DevLinks</h2>
              
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Title</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="My Awesome Project"
                />
              </div>
              
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tech Stack</label>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'TypeScript'].map((tech) => (
                    <span 
                      key={tech} 
                      className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'}`}
                    >
                      {tech}
                    </span>
                  ))}
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'} flex items-center`}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea 
                  className={`w-full px-4 py-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  rows={4}
                  placeholder="Describe your project..."
                ></textarea>
              </div>
              
              <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md font-medium hover:from-blue-700 hover:to-indigo-600 transition-all">
                Create Project
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Designed for <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Developers</span></h2>
            <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              DevLinks provides the tools you need to effectively showcase your work and connect with the right people in the tech industry.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Customizable Profile</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Personalize your profile with your bio, avatar, and links to your other professional platforms.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Engagement Analytics</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Track views, likes, and bookmarks to understand how your work is being received.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discover Talent</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Find and connect with other developers based on shared technologies and interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Developer Profile</span>?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of developers who are building their professional presence with DevLinks.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md font-medium hover:from-blue-700 hover:to-indigo-600 transition-all text-lg"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </main>
  )
}