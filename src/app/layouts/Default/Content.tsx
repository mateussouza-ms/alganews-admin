import { Layout } from "antd";
const { Content } = Layout;

interface DefaultLayoutContentProps {
  children: React.ReactNode;
}
export function DefaultLayoutContent({ children }: DefaultLayoutContentProps) {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      {children}
    </Content>
  );
}
