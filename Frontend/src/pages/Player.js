import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import VideoPlayer from "../components/layout/VideoPlayer";
import VideoPlayerContentList from "../components/layout/VideoPlayerContentList";

export default function Player() {
  const { detailsId, contentId } = useParams();
  const [details, setDetails] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchContent = async () => {
      try {
        const contentResponse = await fetch(
          summaryApi.getContentByDetailsId.url + `/${detailsId}`,
          {
            method: summaryApi.getContentByDetailsId.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataResult = await contentResponse.json();

        if (dataResult.respCode === "000") {
          setContent(dataResult.data);
          const numericContentId = Number(contentId);
          const matchedContent = dataResult.data.find(
            (item) => item.id === numericContentId
          );
          setSelectedContent(matchedContent || null);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [detailsId, contentId]);

  useEffect(() => {
    setLoading(true);
    const fetchDetails = async () => {
      try {
        const contentResponse = await fetch(
          summaryApi.getDetailsById.url + `/${detailsId}`,
          {
            method: summaryApi.getDetailsById.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataResult = await contentResponse.json();

        if (dataResult.respCode === "000" && dataResult.data) {
          setDetails(dataResult.data);
        } else {
          console.log("Details not found");
        }
      } catch (error) {
        console.log("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [detailsId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {details && details.name ? (
        <main className="container mx-auto px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <VideoPlayer content={selectedContent} />
                </div>
                <div className="lg:col-span-4">
                  <VideoPlayerContentList
                    contentList={content}
                    setSelectedContent={setSelectedContent}
                    selectedContent={selectedContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div>No details available</div>
      )}
    </>
  );
}
