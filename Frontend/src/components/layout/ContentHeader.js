export default function ContentHeader({ content, details }) {
  console.log(details);

  return (
    <div className="bg-white dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
            <p className="mb-6">
              {details?.description == "" ? "Chương này không có mô tả" : details?.description}
            </p>
            <h2 className="text-xl font-bold mb-4">{content.length} bài học</h2>

          </div>

          <div className="md:w-1/3">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={details?.imageURL}
                  alt="Khóa luyện đề"
                  width={400}
                  height={200}
                  className="w-full h-auto"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
