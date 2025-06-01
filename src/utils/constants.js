const REACT_APP_googleApiKey = import.meta.env.VITE_GOOGLE_API
export const REACT_APP_YOUTUBE_VDOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" + REACT_APP_googleApiKey;

export const YOUTUBE_SEARCH_SUGGESTIONS_API = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

// Endpoint for search results (used in SearchResults)
export const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=" + REACT_APP_googleApiKey;
export const YOUTUBE_VIDEO_DETAILS_API = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&key=" + REACT_APP_googleApiKey;

export const LIVE_CHAT_COUNT = 25;