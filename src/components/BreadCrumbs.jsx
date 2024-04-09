"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const BreadCrumbs = ({ details }) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          style={{ color: "#000", fontSize: 20 }}
        >
          Helperzz
        </Link>
        <Link
          style={{ color: "#000", fontSize: 20 }}
          underline="hover"
          color="inherit"
          href={`/category/on/toronto/${details?.details?.tag}`}
        >
          {details?.details?.category_name}
        </Link>
        <Typography
          color="text.primary"
          style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}
        >
          {details?.details?.company_name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};
export default BreadCrumbs;
