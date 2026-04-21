import { OccupationalHealthcareEntry } from "../types";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <Box border={1} borderRadius={2} p={2} mb={2}>
    <Typography>
      {entry.date} <WorkIcon /> <b>{entry.employerName}</b>
    </Typography>
    <Typography>
      <i>{entry.description}</i>
    </Typography>
    <Typography>diagnose by {entry.specialist}</Typography>
  </Box>
);

export default OccupationalEntryDetails;
