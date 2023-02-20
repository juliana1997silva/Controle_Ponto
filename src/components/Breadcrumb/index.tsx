import React from "react";
import { useNavigate } from "react-router";
import { Breadcrumb } from "rsuite";

interface breadcrumbData {
  hrefBack: string;
  label: string;
  active: string;
}

const BreadcrumbComponent: React.FC<breadcrumbData> = ({
  hrefBack,
  label,
  active,
}) => {
  const navegate = useNavigate();
  return (
    <Breadcrumb>
      <Breadcrumb.Item
        onClick={(e: any) => {
          e.preventDefault();
          navegate(hrefBack);
        }}
      >
        {label}
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{active}</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default BreadcrumbComponent;
