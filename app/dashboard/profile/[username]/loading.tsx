import { Loader2 } from 'lucide-react'; 

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading, please wait...
        </h1>
        <div className="w-48 h-2 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}