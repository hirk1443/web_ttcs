import CategoryCard from "../layout/CategoryCard";
const ListCategory = ({ categories }) => {
  return (
    <>
      <div className="container mx-auto mt-10 bg-white p-4 shadow-md rounded-md">
        <div>
          <h2 className="font-bold text-xl text-gray-800 border-b pb-2 mb-4">
            📚 DANH MỤC
          </h2>
        </div>
        <div className="mt-4 grid md:grid-cols-1 grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 transition-all rounded-md p-2 cursor-pointer"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListCategory;
