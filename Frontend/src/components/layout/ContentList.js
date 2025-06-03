import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ContentList({ content }) {
  const navigate = useNavigate();
  const handleCardClick = (value) => {
    navigate(`player/${value}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>

      {content.map((section) => (
        <div className="border rounded-md mb-4 overflow-hidden">
          <div className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <span className="bg-black text-white p-1 text-xs mr-2">
                {section.name}
              </span>
            </div>
            <div className="text-blue-500 text-sm">
              {section.videoLink != "" ? "Có bài giảng" : "Chưa có bài giảng"} •{" "}
              {section.documentLink != "" ? "Có tài liệu" : "Chưa có tài liệu"}
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="border-t pt-2">
              {section.videoLink != "" && (
                <div
                  className="flex items-center justify-between py-2"
                  onClick={() => handleCardClick(section.id)}
                >
                  <div className="flex items-center">
                    <Play size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">Video bài giảng </span>
                  </div>
                  <span className="text-gray-500 text-sm">48:25</span>
                </div>
              )}
              {section.documentLink != "" && (
                <a
                  href={section.documentLink}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-gray-500"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span className="text-gray-700">Tài liệu</span>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
