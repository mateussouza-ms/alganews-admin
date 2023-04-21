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
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export function DefaultLayoutSidebar() {
  const [isBroken, setIsBroken] = useState(false);

  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      key: "users",
      label: "Usuários",
      icon: <UserOutlined />,
      children: [
        {
          key: "/usuarios",
          label: "Consulta",
          icon: <TableOutlined />,
          onClick: () => navigate("/usuarios"),
        },
        {
          key: "/usuarios/cadastro",
          label: "Cadastro",
          icon: <PlusCircleOutlined />,
          onClick: () => navigate("/usuarios/cadastro"),
        },
      ],
    },
    {
      key: "payments",
      label: "Pagamentos",
      icon: <UserOutlined />,
      children: [
        {
          key: "/pagamentos",
          label: `Consulta`,
          icon: <TableOutlined />,
          onClick: () => navigate("/pagamentos"),
        },
        {
          key: "/pagamentos/cadastro",
          label: `Cadastro`,
          icon: <PlusCircleOutlined />,
          onClick: () => navigate("/pagamentos/cadastro"),
        },
      ],
    },
    {
      key: "cashFlow",
      label: `Fluxo de Caixa`,
      icon: <DiffOutlined />,
      children: [
        {
          key: "/fluxo-de-caixa/receitas",
          label: `Receita`,
          icon: <RiseOutlined />,
          onClick: () => navigate("/fluxo-de-caixa/receitas"),
        },
        {
          key: "/fluxo-de-caixa/despesas",
          label: `Despesa`,
          icon: <FallOutlined />,
          onClick: () => navigate("/fluxo-de-caixa/despesas"),
        },
      ],
    },
  ];

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
