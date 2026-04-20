import { HospitalEntry } from "../types";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <Box border={1} borderRadius={2} p={2} mb={2}>
    <Typography>
      {entry.date} <LocalHospitalIcon />
    </Typography>
    <Typography>
      <i>{entry.description}</i>
    </Typography>
    <Typography>
      Discharge: {entry.discharge.date} - {entry.discharge.criteria}
    </Typography>
    <Typography>diagnose by {entry.specialist}</Typography>
  </Box>
);

export default HospitalEntryDetails;
