import React from "react";
import { Breadcrumb } from "rsuite";

interface breadcrumbData {
  href: string;
  label: string;
}

const BreadcrumbComponent: React.FC<breadcrumbData> = ({ href, label }) => {
  return <Breadcrumb.Item href={href}>{label}</Breadcrumb.Item>;
};
export default BreadcrumbComponent;
