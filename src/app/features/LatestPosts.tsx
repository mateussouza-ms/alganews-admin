import { Avatar, Card, Col, Row } from "antd";
import { useEffect } from "react";
import { useLatestPosts } from "../../core/hooks/useLatestPosts";

export function LatestPosts() {
  const { fetchPosts, posts } = useLatestPosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Row gutter={16}>
      {posts?.map((post) => (
        <Col key={post.id} span={8}>
          <Card
            cover={
              <img
                alt={post.title}
                src={post.imageUrls.small}
                height={168}
                style={{ objectFit: "cover" }}
              />
            }
          >
            <Card.Meta
              avatar={<Avatar src={post.editor.avatarUrls.small} />}
              title={post.title}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
