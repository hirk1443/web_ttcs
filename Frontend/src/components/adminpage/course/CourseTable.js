import { useState, useRef } from "react";
import { SearchOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
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
} from "antd";
import Highlighter from "react-highlight-words";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";

const { Option } = Select;
const { Dragger } = Upload;
const CourseTable = ({
  courseList,
  setCourseList,
  categoryList,
  fetchAllCourse,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();

  const searchInput = useRef(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageURL, setImage] = useState("");

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
    const response = await fetchWithAuth(summaryApi.deleteCourse.url + id, {
      method: summaryApi.deleteCourse.method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.respCode === "000") {
      setCourseList(courseList.filter((course) => course.id !== id));
    } else {
      console.log(data);
    }
  };

  const closeModel = () => {
    setCurrentCourse(null);
    setIsModalVisible(false);
    if (!currentCourse) form.resetFields();
  };

  const showModal = (course) => {
    setCurrentCourse(course);
    setIsModalVisible(true);
    if (course) {
      form.setFieldsValue({
        name: course.name,
        description: course.description,
        teacher: course.teacher,
        category: course.category?.id,
      });
    } else {
      if (!currentCourse) form.resetFields();
    }
  };

  const handleUploadImage = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }) => {
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
        setImage(result.data.secure_url);
        onSuccess({ url: result.url });
        message.success("Upload thành công!");
      }, 500);
    } catch (error) {
      console.error(error);
      message.error("Upload thất bại!");
      onError(error);
    }
  };
  const handleAddCourse = async (values) => {
    try {
      const payload = {
        name: values.name,
        teacher: values.teacher,
        categoryId: values.category,
        description: values.description || "",
        imageURL: imageURL,
      };

      const response = await fetchWithAuth(summaryApi.addCourse.url, {
        method: summaryApi.addCourse.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Thêm khóa học thất bại");
      }

      message.success("Thêm khóa học thành công!");
      form.resetFields();

      closeModel();
      setCurrentCourse(null);
      await fetchAllCourse();
    } catch (error) {
      console.error(error);
      message.error("Đã có lỗi xảy ra khi thêm khóa học");
    }
  };

  const handleUpdateCourse = async (values) => {
    try {
      const payload = {
        name: values.name,
        teacher: values.teacher,
        categoryId: values.category,
        description: values.description || "",
        imageURL: currentCourse.imageURL,
      };

      const response = await fetchWithAuth(
        summaryApi.updateCourseById.url + `${currentCourse.id}`,
        {
          method: summaryApi.updateCourseById.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Thêm khóa học thất bại");
      }

      message.success("Thêm khóa học thành công!");
      form.resetFields();

      closeModel();
      setCurrentCourse(null);

      await fetchAllCourse();
    } catch (error) {
      console.error(error);
      message.error("Đã có lỗi xảy ra khi thêm khóa học");
    }
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Môn học",
      dataIndex: ["category", "name"],
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Giáo viên",
      dataIndex: "teacher",
      key: "teacher",
      ...getColumnSearchProps("teacher"),
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
              setCurrentCourse(record);
              showModal(record);
            }}
          >
            <RiEditLine className="mr-1 text-xl" /> Chỉnh sửa
          </button>

          <Popconfirm
            title="Khi xóa khóa học, tất cả chương liên quan sẽ bị xóa, tiếp tục?"
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
        onClick={() => showModal(null)}
        icon={<PlusOutlined />}
        className="mb-4"
      >
        Thêm khóa học
      </Button>
      <Table
        className="rounded-lg"
        columns={columns}
        dataSource={courseList}
        rowKey="id"
      />
      <Modal
        title={currentCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
        open={isModalVisible}
        onCancel={() => closeModel()}
        footer={null}
      >
        <Form
          form={form}
          onFinish={currentCourse ? handleUpdateCourse : handleAddCourse}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên khóa học"
            rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
            initialValue={currentCourse?.name}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
          <Form.Item
            name="teacher"
            label="Tên giáo viên"
            initialValue={currentCourse?.teacher}
            rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
          >
            <Input placeholder="Nhập tên giáo viên" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Môn học"
            rules={[{ required: true, message: "Trường này là bắt buộc!" }]}
            initialValue={currentCourse?.category?.id}
          >
            <Select
              placeholder="Select a category"
              dropdownRender={(menu) => <>{menu}</>}
            >
              {categoryList.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            initialValue={currentCourse?.description}
          >
            <Input placeholder="Thêm chút mô tả cho cuộc đời thêm vui" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh khóa học"
            rules={[
              { required: imageURL != "", message: "Trường này là bắt buộc!" },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Dragger
              accept="image/*"
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("Chỉ được upload file ảnh!");
                }
                return isImage || Upload.LIST_IGNORE;
              }}
              customRequest={handleUploadImage}
              listType="picture"
              maxCount={1}
              disabled={currentCourse && currentCourse.imageURL && !imageURL} // Disable if image exists and no new image selected
            >
              {/* Show existing image if available */}
              {currentCourse && currentCourse.imageURL && !imageURL ? (
                <img
                  src={currentCourse.imageURL}
                  alt="Current Course"
                  style={{ width: "100%" }}
                />
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Tải ảnh lên đây</p>
                  <p className="ant-upload-hint">
                    Một lần và duy nhất, sau khi tải ảnh lên không thể hoàn tác
                  </p>
                </>
              )}
            </Dragger>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            {currentCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
export default CourseTable;
