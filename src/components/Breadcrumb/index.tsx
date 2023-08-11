import React from "react";
import { Breadcrumb } from "rsuite";

interface breadcrumbData {
  active: string;
  href: string;
  label: string;
}

const BreadcrumbComponent: React.FC<breadcrumbData> = ({ href, label,active }) => {
  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item href={href}>{label}</Breadcrumb.Item>
      <Breadcrumb.Item active>{active}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default BreadcrumbComponent;
