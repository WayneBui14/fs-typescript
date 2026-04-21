import { HealthCheckEntry } from "../types";
import { Box, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const heartColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography>
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <FavoriteIcon style={{ color: heartColor(entry.healthCheckRating) }} />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntryDetails;
