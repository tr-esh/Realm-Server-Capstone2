// BreadcrumbsComponent.jsx
import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BreadcrumbsComponent({ labels }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {labels.map((label, index) => (
        <Link key={index} color="inherit" href="#">
          {label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
