import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Input,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { ColumnProps } from "antd/es/table";
import { format } from "date-fns";
import { User } from "ms-alganews-sdk";
import { useEffect } from "react";
import { useUsers } from "../../core/hooks/useUsers";

const userRoles = {
  EDITOR: {
    label: "Editor",
    color: "blue",
  },
  MANAGER: {
    label: "Gerente",
    color: "red",
  },
  ASSISTANT: {
    label: "Assistente",
    color: "warning",
  },
};

type UserRoles = keyof typeof userRoles;

export function UserList() {
  const { users, fetchUsers, toggleUserStatus, fetching } = useUsers();

  function getColumnSearchProps(
    dataIndex: keyof User.Summary,
    displayName?: string
  ): ColumnProps<User.Summary> {
    return {
      filterDropdown: ({
        selectedKeys,
        setSelectedKeys,
        confirm,
        clearFilters,
      }) => (
        <Card>
          <Input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            placeholder={`Buscar ${displayName || dataIndex}`}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              size="small"
              style={{ width: 90 }}
              onClick={() => confirm()}
              icon={<SearchOutlined />}
            >
              Buscar
            </Button>
            <Button size="small" style={{ width: 90 }} onClick={clearFilters}>
              Limpar
            </Button>
          </Space>
        </Card>
      ),
      onFilter: (value, record) => {
        if (!record[dataIndex]) return false;

        return record[dataIndex]
          .toString()
          .toLocaleLowerCase()
          .includes(String(value).toLocaleLowerCase());
      },

      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#09f" : undefined }} />
      ),
    };
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        rowKey={"id"}
        loading={fetching}
        columns={[
          {
            dataIndex: "name",
            title: "Nome",
            width: 160,
            render: (value: string, row) => (
              <Space>
                <Avatar size={"small"} src={row.avatarUrls.small} />
                <Typography.Text ellipsis style={{ maxWidth: 120 }}>
                  {value}
                </Typography.Text>
              </Space>
            ),
            ...getColumnSearchProps("name", "Nome"),
          },
          {
            dataIndex: "email",
            title: "E-mail",
            ellipsis: true,
            width: 160,
            ...getColumnSearchProps("email", "E-mail"),
          },
          {
            dataIndex: "role",
            title: "Perfil",
            align: "center",
            render: (value: UserRoles) => (
              <Tag color={userRoles[value].color}>{userRoles[value].label}</Tag>
            ),
          },
          {
            dataIndex: "createdAt",
            title: "Data de criação",
            render: (value: string) => format(new Date(value), "dd/MM/yyyy"),
          },
          {
            dataIndex: "active",
            title: "Ativo",
            align: "center",
            render: (value: boolean, user) => (
              <Switch
                defaultChecked={value}
                onChange={() => toggleUserStatus(user)}
              />
            ),
          },
          {
            dataIndex: "id",
            title: "Ações",
            align: "center",

            render: (id: number) => (
              <>
                <Button icon={<EyeOutlined />} size="small" />
                <Button icon={<EditOutlined />} size="small" />
              </>
            ),
          },
        ]}
      />
    </>
  );
}
