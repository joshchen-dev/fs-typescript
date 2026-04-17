import { AssignmentTurnedIn, Favorite } from "@mui/icons-material";
import { entryStyle } from "../../style";
import { Diagnosis } from "../../types";
import type { HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const ratingToColor: Record<number, string> = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red"
};

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div style={entryStyle} key={entry.id}>
      <div><strong>Health Check</strong></div>
      <div>{entry.date} <AssignmentTurnedIn /> </div>
      <div><em>{entry.description}</em></div>
      <ul>
        {entry.diagnosisCodes?.map(e => (
          <li key={e}>{e} {diagnoses.find(d => d.code === e)?.name}</li>
        ))}
      </ul>
      <div>Health Risk: <Favorite sx={{ color: ratingToColor[entry.healthCheckRating] }} /></div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;