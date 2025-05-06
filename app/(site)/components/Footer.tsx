export default function Footer({ darkMode }: { darkMode: boolean }) {
    return (
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-6 md:mb-0">
              DevLinks
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center md:text-right`}>
              © {new Date().getFullYear()} DevLinks. All rights reserved.<br />
              Built for developers, by developers.
            </div>
          </div>
        </div>
      </footer>
    );
}