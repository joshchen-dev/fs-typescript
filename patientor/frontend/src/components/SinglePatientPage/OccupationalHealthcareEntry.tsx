import { WorkHistory } from "@mui/icons-material";
import { Diagnosis } from "../../types";
import type { OccupationalHealthcareEntry } from "../../types";
import { entryStyle } from "../../style";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div style={entryStyle} key={entry.id}>
      <div><strong>Occupational Healthcare</strong></div>
      <div>{entry.date} <WorkHistory /> <em>{entry.employerName}</em></div>
      <div><em>{entry.description}</em></div>
      <ul>
        {entry.diagnosisCodes?.map(e => (
          <li key={e}>{e} {diagnoses.find(d => d.code === e)?.name}</li>
        ))}
      </ul>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntry;
