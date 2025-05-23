import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeHamburger } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    const searchQuery = searchParams.get('search_query');
    console.log("SearchResults component rendered", { searchQuery });

  useEffect(() => {
    dispatch(closeHamburger());
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, dispatch]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual YouTube search API
      // For now, I'm using a placeholder API structure
    //   const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(searchQuery)}&key=YOUTUBE_VDOS_API`;
      
      const response = await fetch(`${YOUTUBE_SEARCH_API}&q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error('Search API Error:', err);
      setError(err.message);
      // For demo purposes, setting mock data
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count?.toString() || '0';
  };

  const getTimeAgo = (publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffTime = Math.abs(now - published);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      const weeks = Math.ceil(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const months = Math.ceil(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.ceil(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <div className="pt-20 px-4">
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-600">Searching for "{searchQuery}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 px-4">
        <div className="flex justify-center items-center h-96">
          <p className="text-red-600">Error loading search results: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Search results for "{searchQuery}"
      </h1>
      
      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No results found for "{searchQuery}"</p>
          <p className="text-sm text-gray-500 mt-2">Try different keywords or check your spelling</p>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <Link
              key={video.id?.videoId || video.id}
              to={`/watch?v=${video.id?.videoId || video.id}`}
              className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <img
                  src={video.snippet?.thumbnails?.medium?.url || 'https://via.placeholder.com/320x180'}
                  alt={video.snippet?.title}
                  className="w-80 h-45 rounded-lg object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {video.snippet?.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  {formatViewCount(video.statistics?.viewCount)} views • {getTimeAgo(video.snippet?.publishedAt)}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{video.snippet?.channelTitle}</span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.snippet?.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;