import { Avatar, Layout, Row } from "antd";

import logoImg from "../../../assets/logo.svg";

const { Header } = Layout;

export function DefaultLayoutHeader() {
  return (
    <Header className="header">
      <Row
        justify="space-between"
        align="middle"
        style={{ height: "100%", maxWidth: 1190, margin: "0 auto" }}
      >
        <img src={logoImg} alt="Logo do Alganews" />
        <Avatar style={{ background: "#ccc" }} />
      </Row>
    </Header>
  );
}
