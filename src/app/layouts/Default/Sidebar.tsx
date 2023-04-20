import {
  DiffOutlined,
  FallOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useState } from "react";

const { Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "users",
    label: "Usuários",
    icon: <UserOutlined />,
    children: [
      {
        key: "users_search",
        label: "Consulta",
        icon: <TableOutlined />,
      },
      {
        key: "users_register",
        label: "Cadastro",
        icon: <PlusCircleOutlined />,
      },
    ],
  },
  {
    key: "payments",
    label: "Pagamentos",
    icon: <UserOutlined />,
    children: [
      {
        key: "payments_search",
        label: `Consulta`,
        icon: <TableOutlined />,
      },
      {
        key: "payments_register",
        label: `Cadastro`,
        icon: <PlusCircleOutlined />,
      },
    ],
  },
  {
    key: "cashFlow",
    label: `Fluxo de Caixa`,
    icon: <DiffOutlined />,
    children: [
      {
        key: "revenue",
        label: `Receita`,
        icon: <RiseOutlined />,
      },
      {
        key: "expense",
        label: `Despesa`,
        icon: <FallOutlined />,
      },
    ],
  },
];

export function DefaultLayoutSidebar() {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <Sider
      width={200}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={setIsBroken}
      className={isBroken ? "broken" : undefined}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
}
