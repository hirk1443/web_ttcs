import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Tabs,
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
  Descriptions,
} from "antd";

import Slideshow from "../components/homepage/Slideshow";
import fetchWithAuth from "../helps/fetchWithAuth";
import summaryApi from "../common";
import DocumentList from "../components/layout/DocumentList";
const { TabPane } = Tabs;
const { Option } = Select;
const DocumentPage = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allDocument, setAllDocument] = useState([]);
  const [userDocument, setUserDocument] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchAllDocument = async () => {
    try {
      const response = await fetchWithAuth(
        summaryApi.getDocumentByStatus.url + `?filter=APPROVED`,
        {
          method: summaryApi.getDocumentByStatus.method,
        }
      );
      const data = await response.json();
      if (data.respCode === "000") {
        setAllDocument(data.data);
      }
    } catch (e) {}
  };

  const fetchUserDocument = async () => {
    try {
      const response = await fetchWithAuth(
        summaryApi.getDocumentByUserId.url + `?author_id=${user?.id}`,
        {
          method: summaryApi.getDocumentByUserId.method,
        }
      );
      const data = await response.json();
      if (data.respCode === "000") {
        setUserDocument(data.data);
      }
    } catch (e) {}
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(summaryApi.allCategory.url, {
        method: summaryApi.allCategory.method,
      });
      const data = await response.json();
      if (data.respCode === "000") {
        setCategories(data.data);
      }
    } catch (e) {}
  };

  const handleAddDocument = async (value) => {
    try {
      const payload = {
        documentName: value.name,
        documentLink: value.documentLink?.file?.response?.url,
        description: value.description,
        categoryId: value.category,
        userId: user.id,
      };
      const response = await fetchWithAuth(summaryApi.addDocument.url, {
        method: summaryApi.addDocument.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.respCode === "000") {
        setIsModalVisible(false);
        form.resetFields();
        fetchUserDocument();
      }
    } catch (e) {}
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

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const closeModel = () => {
    setIsModalVisible(false);

    form.resetFields();
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    } else {
      fetchAllDocument();
      fetchAllCategories();
      fetchUserDocument();
    }
  }, [user]);
  return (
    <>
      <Slideshow className="rounded-xl shadow-lg overflow-hidden mb-6" />
      <div className="container mt-3">
        <Tabs
          defaultActiveKey="1"
          className="bg-white p-4 shadow-md rounded-lg"
        >
          <TabPane
            tab={<span className="font-bold text-base">Tất cả tài liệu</span>}
            key="1"
            className="p-4 bg-gray-100 rounded-lg"
          >
            <DocumentList document={allDocument}></DocumentList>
          </TabPane>
          <TabPane
            tab={<span className="font-bold text-base">Tài liệu của tôi</span>}
            key="2"
            className="p-4 bg-gray-100 rounded-lg"
          >
            <div>
              <Button
                type="primary"
                onClick={showModal}
                icon={<PlusOutlined />}
                className="mb-4"
              >
                Thêm tài liệu
              </Button>
              <DocumentList
                document={userDocument}
                showStatus={true}
              ></DocumentList>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <Modal
        title="Thêm nội dung bài học"
        open={isModalVisible}
        onCancel={closeModel}
        footer={null}
        width="70%"
      >
        <Form form={form} layout="vertical" onFinish={handleAddDocument}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tên tài liệu"
              name="name"
              rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
            >
              <Input placeholder="Tên tài liệu" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Môn học"
              rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
            >
              <Select placeholder="Chọn môn học">
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name={"description"}
            label="Mô tả"
            className="w-full"
            rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <div className="mt-4">
            <Form.Item
              name={"documentLink"}
              label="Tải lên tài liệu"
              rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
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

          <Form.Item className="text-right mt-6">
            <Button type="primary" htmlType="submit">
              Lưu nội dung
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DocumentPage;
