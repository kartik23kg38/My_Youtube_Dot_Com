const googleApiKey = import.meta.env.VITE_GOOGLE_API
export const YOUTUBE_VDOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + googleApiKey;
