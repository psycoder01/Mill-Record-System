import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export const StatusListSkeleton = () => (
  <React.Fragment>
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export const RateListSkeleton = () => (
  <React.Fragment>
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  </React.Fragment>
);
