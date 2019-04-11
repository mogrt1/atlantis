import React from "react";
import PropTypes from "prop-types";
import { Grid, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon
} from "@material-ui/icons";

const GameListPagination = ({
  onChange,
  currentPage,
  totalPages,
  perPage,
  totalItems
}) => (
  <Box clone p={1}>
    <Grid container justify="space-between" alignItems="center">
      <Box display={{ xs: `none`, sm: `inline-block` }}>
        {`${(currentPage - 1) * perPage + 1}-${currentPage *
          perPage} of ${totalItems || totalPages * perPage}`}
      </Box>
      <IconButton
        onClick={() => onChange(1)}
        disabled={currentPage === 1}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <PrevIcon />
      </IconButton>
      <IconButton
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <NextIcon />
      </IconButton>
      <IconButton
        onClick={() => onChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </Grid>
  </Box>
);

export const paginationPropTypes = {
  onChange: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  perPage: PropTypes.number,
  totalItems: PropTypes.number
};

GameListPagination.propTypes = paginationPropTypes;

export default GameListPagination;
