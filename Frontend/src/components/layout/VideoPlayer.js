export default function VideoPlayer({ content }) {
  if (!content) {
    return <div>Loading...</div>;
  }

  const embedUrl =
    content.videoLink && content.videoLink.includes("youtube.com")
      ? content.videoLink.replace("watch?v=", "embed/")
      : "";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{content.name}</h2>
          <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">i</span>
          </div>
        </div>
      </div>
      {embedUrl && (
        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {content.documentLink != "" && (
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Tài liệu đi kèm:</h3>
            {/* <span className="text-lg font-bold">Tải về</span> */}
          </div>

          <div className="mt-4 flex items-center text-blue-500">
            <a
              href={content.documentLink}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <span>Tài liệu đính kèm</span>
              <svg
                className="w-6 h-6 ml-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
