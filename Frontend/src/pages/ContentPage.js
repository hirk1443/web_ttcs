import React, { useEffect, useState, useMemo } from "react";
import ContentHeader from "../components/layout/ContentHeader";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import ContentList from "../components/layout/ContentList";
import { Outlet, useLocation } from "react-router-dom";
export default function ContentPage() {
  const { detailsId } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const location = useLocation();
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
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [detailsId]);

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
        if (dataResult.respCode === "000") {
          setDetails(dataResult.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [detailsId]);

  const isPlayerPage = location.pathname.includes("/player/");
  return (
    <>
      {!isPlayerPage && (
        <>
          <ContentHeader details={details} content={content} />
          <ContentList content={content} details={details} />
        </>
      )}
      <Outlet />
    </>
  );
}
