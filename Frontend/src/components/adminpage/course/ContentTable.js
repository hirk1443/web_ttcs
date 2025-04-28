// Cập nhật form modal để có flow chọn Course → Details → Thêm nội dung, và thêm Upload tài liệu
import { useState, useRef } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Modal,
  Form,
  Select,
  Upload,
  message,
  Divider,
} from "antd";
import Highlighter from "react-highlight-words";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";

const { Option } = Select;
const ContentTable = ({ courseList, contentList, fetchAllContents }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();

  const searchInput = useRef(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getDetailsByCourse = async (courseId) => {
    try {
      const response = await fetchWithAuth(
        summaryApi.getDetailsByCourse.url + `/${courseId}`,
        {
          method: summaryApi.getDetailsByCourse.method,
        }
      );

      const dataResponse = await response.json();
      if (dataResponse.respCode == "000") {
        setSelectedDetails(dataResponse.data);
      } else {
        console.log("Lấy dữ liệu không thành công", dataResponse);
      }
    } catch (e) {
      console.log("Lỗi khi gọi API:", e);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetchWithAuth(
      summaryApi.deleteContent.url + `/${id}`,
      {
        method: summaryApi.deleteContent.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.respCode === "000") {
      fetchAllContents();
    } else {
      console.log(data);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    setSelectedDetails([]);
    setSelectedCourseId(null);
    setSelectedDetailId(null);
  };

  const closeModel = () => {
    setIsModalVisible(false);
    setSelectedDetails([]);
    setSelectedCourseId(null);
    setSelectedDetailId(null);
    form.resetFields();
  };

  const handleCourseChange = (value) => {
    setSelectedCourseId(value);
    getDetailsByCourse(value);
  };

  const handleDetailChange = (value) => {
    setSelectedDetailId(value);
  };

  const handleUploadFile = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "documents");

    try {
      const response = await fetch(summaryApi.uploadDocument.url, {
        method: summaryApi.uploadDocument.method,
        body: formData,
      });

      if (!response.ok) throw new Error("Upload thất bại");

      const result = await response.json();

      setTimeout(() => {
        onSuccess({
          uid: file.uid,
          name: file.name,
          status: "done",
          url: result.data.download_url,
        });
        message.success("Upload thành công!");
      }, 500);
    } catch (error) {
      console.error(error);
      message.error("Upload thất bại!");
      onError(error);
    }
  };

  const handleAddContent = async (values) => {
    console.log("Submitted Values:", values);

    try {
      const results = await Promise.all(
        values.contents.map(async (content) => {
          console.log("Tài liệu:", content.documentLink?.file?.response);

          const payload = {
            name: content.title,
            videoLink: content.videoLink || "",
            detailsId: values.detailsId,

            documentLink: content.documentLink?.file?.response?.url || "",
          };

          const response = await fetchWithAuth(summaryApi.addContent.url, {
            method: summaryApi.addContent.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (!response.ok || data.respCode !== "000") {
            throw new Error(data.message || "Thêm mục thất bại");
          }

          return data;
        })
      );

      // Nếu không có lỗi, mới show success
      message.success("Thêm tất cả các mục thành công!");
      form.resetFields();
      closeModel();
      await fetchAllContents();
    } catch (error) {
      console.error("Upload error:", error);
      message.error(error.message || "Đã có lỗi xảy ra khi thêm các mục");
    }
  };

  const downloadDocument = (documentUrl) => {
    if (!documentUrl) {
      message.warning("Không có tài liệu để tải xuống.");
      return;
    }

    // Nếu backend có route download như: /api/document/download?url=<encoded_url>
    const backendDownloadUrl = `/api/document/download?url=${encodeURIComponent(
      documentUrl
    )}`;

    // Tạo thẻ a để tự động click tải về
    const link = document.createElement("a");
    link.href = backendDownloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên đầu mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khóa học liên quan",
      dataIndex: ["details", "name"],
      key: "detailsId",
    },
    {
      title: "Video",
      dataIndex: "videoLink",
      key: "video_link",
      render: (text) => {
        return text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Xem Video
          </a>
        ) : (
          "Chưa có video"
        );
      },
    },
    {
      title: "Tài liệu",
      dataIndex: "documentLink",
      key: "document_link",
      render: (text) => {
        return text ? (
          <a href={text} download target="_blank" rel="noopener noreferrer">
            Tải về tài liệu
          </a>
        ) : (
          "Chưa có tài liệu"
        );
      },
    },
    {
      title: "Thời gian tải lên",
      dataIndex: "createdAt",
      key: "created_at",
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Chỉnh sửa lần cuối",
      dataIndex: "updatedAt",
      key: "updated_at",
      sorter: (a, b) => a.updatedAt - b.updatedAt,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <button
            type="link"
            className="text-blue-500 hover:text-blue-400 flex items-center"
            onClick={() => {
              message.error("Tính năng đang lười phát triển!");
            }}
          >
            <RiEditLine className="mr-1 text-xl" /> Chỉnh sửa
          </button>

          <Popconfirm
            title="Khi xóa nội dung, tất cả tài liệu liên quan sẽ bị xóa, tiếp tục?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button
              type="link"
              className="text-red-500 hover:text-red-400 flex items-center"
            >
              <RiDeleteBinLine className="mr-1 text-xl" /> Xoá
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusOutlined />}
        className="mb-4"
      >
        Thêm nội dung
      </Button>

      <Table
        className="rounded-lg"
        columns={columns}
        dataSource={contentList}
        rowKey="id"
      />

      <Modal
        title="Thêm nội dung bài học"
        open={isModalVisible}
        onCancel={closeModel}
        footer={null}
        width="70%"
      >
        <Form form={form} layout="vertical" onFinish={handleAddContent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Chọn khóa học"
              name="courseId"
              rules={[{ required: true, message: "Vui lòng chọn khoá học" }]}
            >
              <Select placeholder="Chọn khoá học" onChange={handleCourseChange}>
                {courseList.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Chọn chương thuộc khoá học"
              name="detailsId"
              rules={[{ required: true, message: "Vui lòng chọn chương" }]}
            >
              <Select
                placeholder="Chọn chương"
                onChange={handleDetailChange}
                disabled={!selectedDetails.length}
              >
                {selectedDetails.map((detail) => (
                  <Option key={detail.id} value={detail.id}>
                    {detail.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {selectedDetailId && (
            <Form.List name="contents">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key} className="relative mt-6">
                      {index > 0 && <Divider />}
                      <MinusCircleOutlined
                        className="absolute top-0 right-0 text-red-500 text-lg cursor-pointer"
                        onClick={() => remove(name)}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label="Tiêu đề bài học"
                          rules={[{ required: true, message: "Nhập tiêu đề" }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "videoLink"]}
                          label="Link video (tuỳ chọn)"
                        >
                          <Input placeholder="https://youtube.com/..." />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "documentLink"]}
                          label="Tải lên tài liệu"
                        >
                          <Upload.Dragger
                            customRequest={handleUploadFile}
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            maxCount={1}
                            showUploadList={true}
                          >
                            <p className="ant-upload-drag-icon">
                              <PlusOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Kéo thả hoặc bấm để chọn tài liệu
                            </p>
                          </Upload.Dragger>
                        </Form.Item>
                      </div>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className="mt-4"
                    >
                      Thêm nội dung mới
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}

          <Form.Item className="text-right mt-6">
            <Button type="primary" htmlType="submit">
              Lưu nội dung
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentTable;
