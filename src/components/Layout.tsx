import React from "react";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => <div className="layout">{children}</div>;

export default Layout;
