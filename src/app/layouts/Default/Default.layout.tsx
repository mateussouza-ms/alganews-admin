import { Layout } from "antd";
import React from "react";

import { DefaultLayoutBreadcrumb } from "./Breadcrumb";
import { DefaultLayoutContent } from "./Content";
import { DefaultLayoutHeader } from "./Header";
import { DefaultLayoutSidebar } from "./Sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Layout>
      <DefaultLayoutHeader />
      <Layout id="PageLayout">
        <DefaultLayoutSidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
          <DefaultLayoutBreadcrumb />
          <DefaultLayoutContent>{children}</DefaultLayoutContent>
        </Layout>
      </Layout>
    </Layout>
  );
}
