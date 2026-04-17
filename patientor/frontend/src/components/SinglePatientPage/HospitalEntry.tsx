import { HealthAndSafety } from "@mui/icons-material";
import { entryStyle } from "../../style";
import { Diagnosis } from "../../types";
import type { HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div style={entryStyle} key={entry.id}>
      <div><strong>Hospital</strong></div>
      <div>{entry.date} <HealthAndSafety /> </div>
      <div><em>{entry.description}</em></div>
      <ul>
        {entry.diagnosisCodes?.map(e => (
          <li key={e}>{e} {diagnoses.find(d => d.code === e)?.name}</li>
        ))}
      </ul>
      <div>Discharge: {entry.discharge.date} {entry.discharge.criteria} </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntry;