import { Play, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function VideoPlayerContentList({
  contentList,
  setSelectedContent,
  selectedContent,
}) {
  const navigate = useNavigate();
  const { detailsId} = useParams();
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 text-white flex items-center">
        <h2 className="text-lg font-bold">Danh sách bài học</h2>
      </div>

      <div className="divide-y  max-h-[600px] overflow-y-auto">
        {contentList.map((content) => (
          <div
            key={content.id}
            className={`p-4 flex items-center justify-between ${
              selectedContent.id === content.id ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() => {
              // setSelectedContent(content);
              navigate(`/details/${detailsId}/player/${content.id}`);
            }}
          >
            <div className="flex items-center">
              <Play
                className={`mr-3 ${
                  selectedContent.id === content.id
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
                size={20}
              />
              <span
                className={`${
                  selectedContent.id === content.id ? "font-medium" : ""
                }`}
              >
                {content.name}
              </span>
            </div>

            <div className="flex items-center">
              {content.documentLink && (
                <FileText
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  size={18}
                />
              )}
              {content.videoLink && (
                <Play
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  size={18}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
