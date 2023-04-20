import { Breadcrumb } from "antd";
import { NewBreadcrumbProps } from "antd/es/breadcrumb/Breadcrumb";

const breadcrumbItems: NewBreadcrumbProps["items"] = [
  { title: "Home" },
  { title: "List" },
  { title: "App" },
];

export function DefaultLayoutBreadcrumb() {
  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
}
