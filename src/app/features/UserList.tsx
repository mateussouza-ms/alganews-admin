import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Input,
  Space,
  Switch,
  Table,
  Tag,
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
        pagination={false}
        columns={[
          {
            title: "Usuários",
            responsive: ["xs"],
            render: (user: User.Summary) => (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Nome">{user.name}</Descriptions.Item>

                <Descriptions.Item label="E-mail">
                  {user.email}
                </Descriptions.Item>

                <Descriptions.Item label="Criação">
                  {format(new Date(user.createdAt), "dd/MM/yyyy")}
                </Descriptions.Item>

                <Descriptions.Item label="Perfil">
                  <Tag color={userRoles[user.role].color}>
                    {userRoles[user.role].label}
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Ações">
                  <Button icon={<EyeOutlined />} size="small" />
                  <Button icon={<EditOutlined />} size="small" />
                </Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            dataIndex: "avatarUrls",
            title: "",
            width: 48,
            fixed: "left",
            responsive: ["sm"],
            render: (value: User.Summary["avatarUrls"]) => (
              <Avatar size={"small"} src={value.small} />
            ),
          },
          {
            dataIndex: "name",
            title: "Nome",
            width: 160,
            ellipsis: true,
            responsive: ["sm"],
            ...getColumnSearchProps("name", "Nome"),
          },
          {
            dataIndex: "email",
            title: "E-mail",
            ellipsis: true,
            width: 160,
            responsive: ["sm"],
            ...getColumnSearchProps("email", "E-mail"),
          },
          {
            dataIndex: "role",
            title: "Perfil",
            align: "center",
            width: 100,
            responsive: ["sm"],
            sorter: (a, b) => {
              return userRoles[a.role].label.localeCompare(
                userRoles[b.role].label
              );
            },
            render: (value: UserRoles) => (
              <Tag color={userRoles[value].color}>{userRoles[value].label}</Tag>
            ),
          },
          {
            dataIndex: "createdAt",
            title: "Data de criação",
            width: 120,
            responsive: ["sm"],
            sorter: (a, b) => {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            },
            render: (value: string) => format(new Date(value), "dd/MM/yyyy"),
          },
          {
            dataIndex: "active",
            title: "Ativo",
            align: "center",
            width: 100,
            responsive: ["sm"],
            render: (value: boolean, user) => (
              <Switch checked={value} onChange={() => toggleUserStatus(user)} />
            ),
          },
          {
            dataIndex: "id",
            title: "Ações",
            align: "center",
            width: 100,
            responsive: ["sm"],
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
