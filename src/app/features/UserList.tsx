import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Switch, Table, Tag, Typography } from "antd";
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
  const { users, fetchUsers, toggleUserStatus } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        rowKey={"id"}
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
          },
          {
            dataIndex: "email",
            title: "E-mail",
            ellipsis: true,
            width: 160,
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
