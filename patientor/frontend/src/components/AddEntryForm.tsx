import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Typography,
  Divider,
  Alert,
  FormControl,
} from "@mui/material";

import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [type, setType] = useState<EntryWithoutId["type"]>("HealthCheck");

  // HealthCheck fields
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy,
  );

  // Hospital fields
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value as EntryWithoutId["type"];
      setType(value);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type,
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        const sickLeave =
          sickLeaveStartDate && sickLeaveEndDate
            ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
            : undefined;
        onSubmit({
          ...baseEntry,
          type,
          employerName,
          sickLeave,
        });
        break;
    }
  };

  return (
    <div
      style={{
        border: "2px dashed gray",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6">New Entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="entry-type-label">Entry type</InputLabel>
          <Select
            labelId="entry-type-label"
            value={type}
            label="Entry type"
            onChange={onTypeChange}
          >
            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          margin="normal"
          required={true}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="normal"
          required={true}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          margin="normal"
          required={true}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={diagnosisCodes}
            label="Diagnosis codes"
            onChange={({ target }) =>
              setDiagnosisCodes(
                typeof target.value === "string"
                  ? target.value.split(",")
                  : target.value,
              )
            }
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider style={{ margin: "20px 0" }} />

        {/* Dynamic fields based on type */}
        {type === "HealthCheck" && (
          <div>
            <InputLabel>Healthcheck rating</InputLabel>
            <Select
              fullWidth
              value={healthCheckRating.toString()}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            >
              <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>
                1 - Low Risk
              </MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>
                2 - High Risk
              </MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>
                3 - Critical Risk
              </MenuItem>
            </Select>
          </div>
        )}

        {type === "Hospital" && (
          <div>
            <Typography variant="subtitle1">Discharge</Typography>
            <TextField
              label="Date"
              fullWidth
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              margin="dense"
            />
            <TextField
              label="Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              margin="dense"
            />
          </div>
        )}

        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              margin="dense"
            />
            <Typography variant="subtitle1" style={{ marginTop: 10 }}>
              Sick Leave (Optional)
            </Typography>
            <TextField
              label="Start Date"
              fullWidth
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              margin="dense"
            />
            <TextField
              label="End Date"
              fullWidth
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              margin="dense"
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add New Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
