import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { JSX } from "@emotion/react/jsx-runtime";

interface Props {
  patients: Patient[]
}

const SinglePatientPage = ({ patients }: Props) => {
  const id = useParams().id;
  const targetPatient = patients.find(p => p.id === id);
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

  return (
    <div>
      <h2>{targetPatient?.name} {sexIcon}</h2>
      <div>occupation: {targetPatient?.occupation}</div>
      <div>date of birth: {targetPatient?.dateOfBirth}</div>
    </div>
  );
};

export default SinglePatientPage;