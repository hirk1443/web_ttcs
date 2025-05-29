import { useState, useRef } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  InboxOutlined,
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
const { Dragger } = Upload;
const DetailsTable = ({
  detailsList,
  courseList,
  fetchAllDetails,
  setDetailsList,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();

  const searchInput = useRef(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setSearchText("");
  };

  const handleDelete = async (id) => {
    const response = await fetchWithAuth(
      summaryApi.deleteDetails.url + `/${id}`,
      {
        method: summaryApi.deleteDetails.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.respCode === "000") {
      setDetailsList(detailsList.filter((details) => details.id !== id));
    } else {
      console.log(data);
    }
  };

  const closeModel = () => {
    setCurrentCourse(null);
    setIsModalVisible(false);
    if (!currentCourse) form.resetFields();
  };

  const showModal = (course = null) => {
    setCurrentCourse(course);
    setIsModalVisible(true);
    if (course) {
      form.setFieldsValue({
        name: course.name,
        description: course.description,
        category: course.category?.id,
      });
    } else {
      if (!currentCourse) form.resetFields();
    }
  };

  const handleUploadImage = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "images");

    try {
      const response = await fetch(summaryApi.uploadImage.url, {
        method: summaryApi.uploadImage.method,
        body: formData,
      });

      if (!response.ok) throw new Error("Upload thất bại");

      const result = await response.json();

      setTimeout(() => {
        onSuccess({
          uid: file.uid,
          name: file.name,
          status: "done",
          url: result.data.secure_url,
        });
        message.success("Upload thành công!");
      }, 500);
    } catch (error) {
      console.error(error);
      message.error("Upload thất bại!");
      onError(error);
    }
  };
  const handleAddAllDetails = async (values) => {
    try {
      const results = await Promise.all(
        values.details.map(async (course) => {
          const payload = {
            name: course.name,
            description: course.description || "",
            courseId: course.courseId,
            imageURL: course.image?.[0]?.url || "",
          };

          const response = await fetchWithAuth(summaryApi.addDetails.url, {
            method: summaryApi.addDetails.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (!response.ok || data.respCode !== "000") {
            throw new Error(data.message || "Thêm chương thất bại");
          }

          return data;
        })
      );

      // Nếu không có lỗi, mới show success
      message.success("Thêm tất cả các chương thành công!");
      form.resetFields();
      closeModel();
      await fetchAllDetails();
    } catch (error) {
      console.error("Upload error:", error);
      message.error(error.message || "Đã có lỗi xảy ra khi thêm các chương");
    }
  };

  const handleUpdateCourse = (values) => {
    const fetchUpdateCourse = async () => {
      const response = await fetchWithAuth(
        summaryApi.updateProduct.url + currentCourse.id,
        {
          method: summaryApi.updateProduct.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: values.name,
            Description: values.description,
            BrandId: values.brand,
            CategoryId: values.category,
          }),
        }
      );
      const data = await response.json();
      if (data.respCode === "000" && data.data) {
        const updatedProducts = courseList.map((courses) => {
          if (courses.id === currentCourse.id) {
            return data.data;
          }
          return courses;
        });
        setDetailsList(updatedProducts);
        closeModel();
      } else {
        console.log(data);
      }
    };
    fetchUpdateCourse();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : false,
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên chương",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khóa học liên quan",
      dataIndex: ["course", "name"],
      key: "courseId",
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
      title: "Hình Ảnh",
      dataIndex: "imageURL",
      render: (record) => {
        return <img className="w-10 h-6" src={record}></img>;
      },
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
            title="Khi xóa chương, tất cả tài liệu liên quan sẽ bị xóa, tiếp tục?"
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
    <>
      <Button
        type="primary"
        onClick={() => showModal(null)}
        icon={<PlusOutlined />}
        className="mb-4"
      >
        Thêm chương
      </Button>
      <Table dataSource={detailsList} columns={columns} rowKey="id" />;
      <Modal
        title={currentCourse ? "Cập nhật chương" : "Thêm chương"}
        open={isModalVisible}
        onCancel={closeModel}
        footer={null}
        width={"80%"}
      >
        <Form form={form} layout="vertical" onFinish={handleAddAllDetails}>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Tải lên tất cả
            </Button>
          </Form.Item>
          <Form.List name="details">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="relative">
                    {index > 0 && <Divider className="my-6" />}

                    <MinusCircleOutlined
                      className="absolute top-0 right-0 text-red-500 text-lg cursor-pointer"
                      onClick={() => remove(name)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        label="Tên chương"
                        rules={[
                          { required: true, message: "Trường này là bắt buộc" },
                        ]}
                        className="w-full"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "courseId"]}
                        label="Khóa học liên quan"
                        rules={[
                          { required: true, message: "Trường này là bắt buộc" },
                        ]}
                        className="w-full"
                      >
                        <Select placeholder="Chọn khóa học">
                          {courseList.map((cat) => (
                            <Option key={cat.id} value={cat.id}>
                              {cat.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        label="Mô tả"
                        className="w-full"
                      >
                        <Input.TextArea rows={2} />
                      </Form.Item>

                      <Form.Item
                        name={[name, "image"]}
                        label="Ảnh chương"
                        rules={[
                          {
                            required: true,
                            message: "Trường này là bắt buộc!",
                          },
                        ]}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                          if (Array.isArray(e)) return e;
                          return e?.fileList?.map((file) => {
                            if (file.response) {
                              return {
                                ...file,
                                url: file.response.url || file.url,
                              };
                            }
                            return file;
                          });
                        }}
                        className="w-full"
                      >
                        <Upload
                          accept="image/*"
                          listType="picture"
                          maxCount={1}
                          beforeUpload={(file) => {
                            const isImage = file.type.startsWith("image/");
                            if (!isImage) {
                              message.error("Chỉ được upload ảnh!");
                            }
                            return isImage || Upload.LIST_IGNORE;
                          }}
                          customRequest={handleUploadImage}
                        >
                          <Button icon={<InboxOutlined />}>Chọn ảnh</Button>
                        </Upload>
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
                    className="mt-6"
                  >
                    Thêm chương mới
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default DetailsTable;
