import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, Gender } from "../../types";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      void patientService.getOne(id).then((data) => setPatient(data));
    }
  }, [id]);

  if (!patient) return null;

  const GenderIcon = () => {
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
        {patient.name} <GenderIcon />
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Typography variant="h6">Entries</Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
