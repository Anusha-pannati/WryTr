import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {

  const truncatedContent = content.length > 300 
    ? content.slice(0, 300) + "..." 
    : content;
  
  const readTime = Math.ceil(content.length / 100);

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-green-100 pb-4 w-screen max-w-screen-md cursor-pointer transition-colors bg-white">
        <div className="flex items-center">
          <Avatar name={authorName.toUpperCase()} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col text-gray-700">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-gray-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>

        <div className="text-xl font-semibold pt-2 text-gray-900">
          {title}
        </div>
        <div className="text-md font-thin text-gray-700">
          {truncatedContent}
        </div>
        <div className="text-gray-500 text-sm font-thin pt-4">
          {`${readTime} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return (
    <div className="h-1 w-1 rounded-full bg-gray-400" />
  );
}

export function Avatar({ 
  name, 
  size = "small" 
}: { 
  name: string; 
  size?: "small" | "big"; 
}) {
  const sizeClasses = size === "small" 
    ? "w-6 h-6 text-xs" 
    : "w-10 h-10 text-md";

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-green-700 rounded-full ${sizeClasses}`}>
      <span className="font-extralight text-xl text-white">
        {name[0]}
      </span>
    </div>
  );
}
