import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Appbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded w-32 animate-pulse"></div>
          </div>
          
          {/* Loading Cards */}
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-lg border border-green-100 shadow-sm">
                <BlogSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Your Feed
              </h1>
              <p className="text-gray-600 mt-1">
                Discover stories from writers around the world
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              There are no published articles yet. Be the first to share your thoughts!
            </p>
            <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors font-medium">
              Write Your First Article
            </button>
          </div>
        ) : (
                      /* Blog Feed */
            <div className="space-y-6">
              {Object.values(blogs)
                .reverse()
                .map((blog) => (
                  <div key={blog.id} className="bg-white rounded-lg border border-green-100 hover:border-green-200 transition-all duration-200 hover:shadow-md">
                    <BlogCard
                      id={blog.id}
                      authorName={blog.author.name || "Anonymous"}
                      title={blog.title}
                      content={blog.content}
                      publishedDate={blog.createdAt}
                    />
                  </div>
                ))}
            </div>

        )}

        {/* End Indicator */}
        {blogs.length > 0 && (
          <div className="text-center mt-12 py-8">
            <div className="inline-flex items-center space-x-3 text-gray-400">
              <div className="h-px bg-gray-200 w-12"></div>
              <span className="text-sm">You're all caught up!</span>
              <div className="h-px bg-gray-200 w-12"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
