import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, Gender, EntryWithoutId, Diagnosis } from "../../types";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails";
import axios from "axios";
import AddEntryForm from "../AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: Props) => {
  void diagnoses;
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    if (id) {
      void patientService.getOne(id).then((data) => setPatient(data));
    }
  }, [id]);

  if (!patient) return null;
  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (!id) return;
      const entry = await patientService.addEntry(id, values);
      if (patient) {
        setPatient({ ...patient, entries: patient.entries.concat(entry) });
        setError(undefined);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(
          e.response?.data?.error?.[0]?.message || "Unrecognized axios error",
        );
      } else {
        setError("Unknown error");
      }
    }
  };
  const getGenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {patient.name} {getGenderIcon()}
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <AddEntryForm
        onSubmit={submitNewEntry}
        onCancel={() => setError(undefined)}
        error={error}
      />
      <Typography variant="h6">Entries</Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
