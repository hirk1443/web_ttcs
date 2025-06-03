import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import fetchWithAuth from "../../helps/fetchWithAuth";
import { useParams } from "react-router-dom";
import summaryApi from "../../common";

export default function CommentBox() {
  const { contentId } = useParams();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector((state) => state?.user?.user);

  // Lấy comment từ API khi component mount hoặc contentId thay đổi
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetchWithAuth(
          `${summaryApi.getCommentByContentId.url}/${contentId}`,
          {
            method: summaryApi.getCommentByContentId.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setComments(data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (contentId) fetchComments();
  }, [contentId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const newComment = {
        body: input,
        author: {
          id: user.id,
          email: user.email,
          name: user.name || null,
          profile_img: user.profile_img || "/user-default.jpg", // Hình ảnh mặc định nếu không có
        },
        id: Date.now(), // Tạm thời dùng timestamp làm id
        created_at: new Date().toISOString(), // Nếu muốn hiện ngay cho comment mới
      };

      // Gửi comment lên server
      await fetchWithAuth(summaryApi.addComment.url, {
        method: summaryApi.addComment.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.refreshToken}`,
        },
        body: JSON.stringify({
          body: input,
          userId: user.id,
          contentId: contentId,
        }),
      });

      // Cập nhật state với comment mới
      setComments((prevComments) => [newComment, ...prevComments]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-6">
      <div
        style={{
          borderRadius: 12,
          background: "#fff",
          width: "66%",
          boxSizing: "border-box",
          boxShadow: "0 2px 8px rgba(31, 41, 55, 0.08)",
          padding: 24,
          border: "none",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 16,
          }}
        >
          Comment
        </div>
        <div style={{ minHeight: 80, marginBottom: 20 }}>
          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                gap: 12,
                padding: 16,
                marginBottom: 16,
                borderRadius: 12,
                background: "#f9fafb", // Nhẹ hơn màu nền tổng thể
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <img
                src={c.author.profile_img || "../assets/img/user-default.png"}
                alt={c.author.name || c.author.email}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1.5px solid #e5e7eb",
                  objectFit: "cover",
                  background: "#f3f4f6",
                }}
              />
              <div style={{ flex: 1 }}>
                {/* Header: Tên tác giả bên trái, ngày đăng bên phải */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#111827",
                    }}
                  >
                    {c.author.name || c.author.email}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#6b7280",
                    }}
                  >
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString()
                      : ""}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 15,
                    color: "#374151",
                    wordBreak: "break-word",
                  }}
                >
                  {c.body}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #f3f4f6",
            paddingTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <input
            type="text"
            placeholder="Write your comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 20px",
              border: "none",
              borderRadius: "999px 0 0 999px",
              outline: "none",
              background: "#f7f7f7",
              fontSize: 16,
              color: "#222",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              height: 44,
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              padding: "0 24px",
              height: 44,
              border: "none",
              borderRadius: "0 999px 999px 0",
              background: "linear-gradient(90deg, #1ed6c3 0%, #23c6e6 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
