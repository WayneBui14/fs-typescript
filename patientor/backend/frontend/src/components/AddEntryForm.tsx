import { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { EntryWithoutId } from "../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(rating),
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c !== "")
        : [],
    });
  };

  return (
    <Box
      sx={{
        border: "2px dashed black",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        New HealthCheck Entry
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          fullWidth
          value={date}
          required
          onChange={({ target }) => setDate(target.value)}
          sx={{ marginBottom: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
          type="date"
          size="small"
        />
        <TextField
          label="Description"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
          size="small"
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ marginBottom: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
          size="small"
        />
        <TextField
          label="Health Check Rating (0-3)"
          fullWidth
          required
          type="number"
          slotProps={{
            htmlInput: { min: 0, max: 3 },
            inputLabel: { shrink: true }
          }}
          value={rating}
          onChange={({ target }) => setRating(target.value)}
          sx={{ marginBottom: 2 }}
          size="small"
        />
        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          sx={{ marginBottom: 2 }}
          size="small"
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="primary" variant="contained" type="submit">
            ADD
          </Button>
          <Button
            color="primary"
            variant="outlined"
            type="button"
            onClick={onCancel}
          >
            CANCEL
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEntryForm;
