import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
        
        <div className="flex items-center">
          
          <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
          
          <div className="pl-2">
            <div className="h-3 bg-gray-200 rounded-full w-20" />
          </div>
          
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          
          <div className="pl-2">
            <div className="h-3 bg-gray-200 rounded-full w-16" />
          </div>
        </div>

        <div className="pt-4">
          <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-2" />
        </div>

        <div className="pt-2 space-y-2">
          <div className="h-4 bg-gray-200 rounded-full w-full" />
          <div className="h-4 bg-gray-200 rounded-full w-full" />
          <div className="h-4 bg-gray-200 rounded-full w-2/3" />
        </div>

        <div className="pt-4">
          <div className="h-3 bg-gray-200 rounded-full w-24" />
        </div>
      </div>
      
      <span className="sr-only">Loading...</span>
    </div>
  );
};