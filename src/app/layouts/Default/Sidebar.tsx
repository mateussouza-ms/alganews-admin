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
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

export function DefaultLayoutSidebar() {
  const [isBroken, setIsBroken] = useState(false);

  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
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
          label: <Link to="/usuarios">Consulta</Link>,
          icon: <TableOutlined />,
          onClick: () => navigate("/usuarios"),
        },
        {
          key: "/usuarios/cadastro",
          label: <Link to="/usuarios/cadastro">Cadastro</Link>,
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
          label: <Link to="/pagamentos">Consulta</Link>,
          icon: <TableOutlined />,
          onClick: () => navigate("/pagamentos"),
        },
        {
          key: "/pagamentos/cadastro",
          label: <Link to="/pagamentos/cadastro">Cadastro</Link>,
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
          label: <Link to="/fluxo-de-caixa/receitas">Receita</Link>,
          icon: <RiseOutlined />,
          onClick: () => navigate("/fluxo-de-caixa/receitas"),
        },
        {
          key: "/fluxo-de-caixa/despesas",
          label: <Link to="/fluxo-de-caixa/despesas">Despesa</Link>,
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
