import VideoFeed from "@/components/video/VideoFeed";
import { getVideos } from "@/lib/actions/videos";
import { auth } from "@/auth";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage() {
  const session = await auth();

  const result = await getVideos(10);

  if (!result.success) {
    throw new Error(result.message);
  }

  const { videos, nextCursor, hasNextPage } = result;

  // Only show videos uploaded after 27 Aug 2025, 9 PM
  const cutoffDate = new Date("2025-08-27T13:00:00");
  const filteredVideos = videos.filter(
    (video) => new Date(video.createdAt) > cutoffDate
  );

  return (
    <div className="h-[calc(100vh-66px)] bg-gradient-to-br from-black via-gray-900 to-purple-900 py-6">
      {filteredVideos.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-xl shadow-2xl p-10 text-center max-w-md mx-4 border border-purple-500">
            <div className="text-purple-200 mb-4">
              <svg
                className="mx-auto h-14 w-14 text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">
              No videos yet
            </h3>
            <p className="text-purple-200">
              Be the first to upload a video and share it with the world!
            </p>
            {session && (
              <div className="mt-6">
                <Link
                  href="/upload"
                  className="inline-flex items-center px-5 py-2 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition"
                >
                  Upload Your First Video
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Suspense fallback={<></>}>
          <VideoFeed
            videos={filteredVideos}
            nextCursor={nextCursor}
            hasNextPage={hasNextPage}
          />
        </Suspense>
      )}
    </div>
  );
}