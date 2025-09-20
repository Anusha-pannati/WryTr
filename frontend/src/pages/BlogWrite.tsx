import { useState } from 'react';
import { Edit3, Bot, Eye, Send, Save, ArrowLeft, Loader2 } from 'lucide-react';
// import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Appbar } from '../components/Appbar';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BlogWriter = () => {
  const [mode, setMode] = useState('write'); // 'write', 'generate', 'preview'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiContext, setAiContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  // Mock API endpoints - replace with your actual endpoints
  const API_BASE = BACKEND_URL;
  
  const generateBlog = async () => {
    if (!aiPrompt.trim()) {
      setMessage({ type: 'error', text: 'Please enter a title/prompt for AI generation' });
      return;
    }

    setIsGenerating(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/blog/generate`,
        {
          title: aiPrompt,
          content: aiContext
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
            'Content-Type': 'application/json'
          }
        }
      );

      if (response) {
        const data = await response.data;
        setTitle(data.title);
        setContent(data.content);
        setMode('write');
        setMessage({ type: 'success', text: 'Blog generated successfully! You can now edit and preview it.' });
      } else {
        throw new Error('Failed to generate blog');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to generate blog. Please try again.' });
    } finally {
      setIsGenerating(false);
    }
  };

  // post blog

  const postBlog = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage({ type: 'error', text: 'Please fill in both title and content' });
      return;
    }

    setIsPosting(true);
    setMessage({ type: '', text: '' });

    try {
          const response = await axios.post(
            `${API_BASE}/api/v1/blog`,
              {
                title,
                content
              },
              {
                headers: {
                  Authorization: localStorage.getItem("Authorization"),
                  'Content-Type': 'application/json'
                }
              }
          );

      if (response) {
        setMessage({ type: 'success', text: 'Blog posted successfully!' });
        navigate(`/blogs`);
      } else {
        throw new Error('Failed to post blog');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to post blog. Please try again.' });
    } finally {
      setIsPosting(false);
    }
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setAiPrompt('');
    setAiContext('');
    setMessage({ type: '', text: '' });
  };

  const formatPreviewContent = (text:any) => {
    return text
      .split('\n\n')
      .map((paragraph:any, index:any) => (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 mb-6">
          <div className="p-6 border-b border-green-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Writer</h1>
            
            {/* Mode Selector */}
            <div className="flex space-x-2">
              <button
                onClick={() => setMode('write')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'write'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Edit3 size={20} />
                <span>Write</span>
              </button>
              <button
                onClick={() => setMode('generate')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'generate'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bot size={20} />
                <span>AI Generate</span>
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'preview'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={!title && !content}
              >
                <Eye size={20} />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mx-6 mt-4 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {mode === 'write' && (
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Write Your Blog</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your blog title..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      Blog Content
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Start writing your blog content..."
                      rows={20}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {mode === 'generate' && (
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Blog Generation</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="aiPrompt" className="block text-sm font-medium text-gray-700 mb-2">
                      Blog Title/Topic
                    </label>
                    <input
                      type="text"
                      id="aiPrompt"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Enter the topic or title for AI to generate..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="aiContext" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Context (Optional)
                    </label>
                    <textarea
                      id="aiContext"
                      value={aiContext}
                      onChange={(e) => setAiContext(e.target.value)}
                      placeholder="Provide additional context, tone, target audience, or specific points to cover..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <button
                    onClick={generateBlog}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Bot size={20} />
                        <span>Generate Blog</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === 'preview' && (
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <button
                    onClick={() => setMode('write')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-700"
                  >
                    <ArrowLeft size={20} />
                    <span>Back to Edit</span>
                  </button>
                </div>
                
                <article className="prose prose-lg max-w-none">
                  {title && (
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                      {title}
                    </h1>
                  )}
                  
                  {content ? (
                    <div className="text-gray-700 leading-relaxed">
                      {formatPreviewContent(content)}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No content to preview. Please add some content first.</p>
                  )}
                </article>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={postBlog}
                  disabled={isPosting || !title.trim() || !content.trim()}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
                >
                  {isPosting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Publish Blog</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setMode('preview')}
                  disabled={!title && !content}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
                >
                  <Eye size={20} />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={clearForm}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2 font-medium"
                >
                  <Save size={20} />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogWriter;
