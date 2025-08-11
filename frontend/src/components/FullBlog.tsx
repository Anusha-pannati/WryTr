import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const authorName = blog.author.name || "Anonymous";
  const publishedDate =  blog.createdAt || " ";

  return (
    <div>
      <Appbar />
      
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              {blog.title}
            </div>
            
            <div className="text-slate-500 mb-6">
              Posted on {publishedDate}
            </div>
            
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              {blog.content}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8">
              <div className="text-slate-600 text-lg font-semibold mb-4">
                Author
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Avatar name={authorName} size="big" />
                </div>
                
                <div className="flex-1">
                  <div className="text-xl font-bold text-gray-900 mb-2">
                    {authorName}
                  </div>
                  <div className="text-slate-500 text-sm leading-relaxed">
                    Random catch phrase about the author's ability to grab the user's attention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};