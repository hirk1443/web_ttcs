const statusColors = {
  PENDING: "bg-yellow-400",
  APPROVED: "bg-green-400",
  REJECTED: "bg-red-400",
};

const statusTitle = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã được duyệt",
  REJECTED: "Bị từ chối",
};

const DocumentCard = ({ document, showStatus = false }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-sm relative">
      {showStatus && (
        <div
          className={`absolute top-2 right-2 text-xs font-bold text-white px-2 py-1 rounded ${
            statusColors[document.status] || "bg-gray-400"
          }`}
        >
          {statusTitle[document.status]}
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-800">{document.name}</h2>
      <p className="text-gray-600 mt-2">{document.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-400">
          {new Date(document.createdAt).toLocaleDateString()}
        </span>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => window.open(document.documentLink, "_blank")}
        >
          Tải về
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
