import { useState, useRef } from "react";
import { SearchOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { Button, Input, Space, Table, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import fetchWithAuth from "../../../helps/fetchWithAuth";
import summaryApi from "../../../common";

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
const DocumentTable = ({ documents, setDocuments }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

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

  const handleChangeStatus = async (id, stt) => {
    const response = await fetchWithAuth(
      summaryApi.changeDocumentStatus.url + `?id=${id}&status=${stt}`,
      {
        method: summaryApi.changeDocumentStatus.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.respCode === "000") {
      setDocuments();
    } else {
      console.log(data);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetchWithAuth(
      summaryApi.deleteDocument.url + `?id=${id}`,
      {
        method: summaryApi.deleteDocument.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.respCode === "000") {
      setDocuments();
    } else {
      console.log(data);
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Môn học",
      dataIndex: ["category", "name"],
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Thời gian tải lên",
      dataIndex: "createdAt",
      key: "created_at",
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ["descend", "ascend"],
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <div
            className={` text-center text-xs font-bold text-white px-2 py-1 rounded ${
              statusColors[record.status] || "bg-gray-400"
            }`}
          >
            {statusTitle[record.status]}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          {record.status === "PENDING" && (
            <>
              <button
                type="link"
                className="text-blue-500 hover:text-blue-400 flex items-center"
                onClick={() => {
                  handleChangeStatus(record.id, "APPROVED");
                }}
              >
                <RiEditLine className="mr-1 text-xl" /> Xét duyệt
              </button>
              <Popconfirm
                title="Bạn có chắc là không xét duyệt chứ?"
                onConfirm={() => handleChangeStatus(record.id, "REJECTED")}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="link"
                  className="text-red-500 hover:text-red-400 flex items-center"
                >
                  <RiDeleteBinLine className="mr-1 text-xl" /> Không duyệt
                </button>
              </Popconfirm>
            </>
          )}

          {record.status === "REJECTED" && (
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
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        className="rounded-lg"
        columns={columns}
        dataSource={documents}
        rowKey="id"
      />
    </div>
  );
};
export default DocumentTable;
