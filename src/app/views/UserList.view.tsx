import { Col, Row } from "antd";
import { UserList } from "../features/UserList";

export function UserListView() {
  return (
    <Row>
      <Col xs={24}>
        <UserList />
      </Col>
    </Row>
  );
}
