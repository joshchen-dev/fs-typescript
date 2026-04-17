import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { JSX } from "@emotion/react/jsx-runtime";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { useState } from "react";
import { AxiosError } from "axios";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const SinglePatientPage = ({ patients, setPatients, diagnoses }: Props) => {
  const id = useParams().id;
  const targetPatient = patients.find(p => p.id === id);
  const [error, setError] = useState<AxiosError>();

  if (!targetPatient) {
    return (<div>
      <h3>patient not found...</h3>
    </div>);
  }

  let sexIcon: JSX.Element;

  switch (targetPatient?.gender) {
    case "male": {
      sexIcon = <Male />;
      break;
    } case "female": {
      sexIcon = <Female />;
      break;
    } default: {
      sexIcon = <QuestionMark />;
    }
  }

  const entries = targetPatient?.entries !== null
    ? targetPatient?.entries.map(entry => (
      <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
    ))
    : null;

  return (
    <div>
      <h2>{targetPatient?.name} {sexIcon}</h2>
      <div>ssn: {targetPatient?.ssn}</div>
      <div>occupation: {targetPatient?.occupation}</div>
      <div>date of birth: {targetPatient?.dateOfBirth}</div>
      <h3>Entries</h3>
      <div>{entries}</div>
      <div><AddEntryForm patients={patients} patient={targetPatient} setPatients={setPatients} error={error} setError={setError} /></div>
    </div>
  );
};

export default SinglePatientPage;