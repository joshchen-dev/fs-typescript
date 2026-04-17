import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import patinetsService from "../../services/patients";
import { BaseEntry, EntryFormValues, Patient } from "../../types";
import axios, { AxiosError } from "axios";
import Notification from "./Notification";
import { JSX } from "@emotion/react/jsx-runtime";

const away: React.CSSProperties = {
  margin: "10px auto"
};

interface Props {
  patient: Patient;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  setError: React.Dispatch<React.SetStateAction<AxiosError | undefined>>;
  error: AxiosError | unknown;
}

const HealthCheckFormContent = (): JSX.Element => {
  return (
    <div>
      <div style={away}><TextField name="rating" label="Health Check Rating (0-3)" required fullWidth /></div>
    </div>
  );
};

const OccupationalHealthcareFormContent = (): JSX.Element => {
  return (
    <div>
      <div style={away}><TextField name="employer" label="Employer Name" required fullWidth /></div>
      <div style={away}><TextField name="sickLeaveStart" label="Sick Leave Start Date" fullWidth /></div>
      <div style={away}><TextField name="sickLeaveEnd" label="Sick Leave End Date" fullWidth /></div>
    </div>
  );
};

const HospitalFormContent = (): JSX.Element => {
  return (
    <div>
      <div style={away}><TextField name="dischargeDate" label="Discharge Date" required fullWidth /></div>
      <div style={away}><TextField name="dischargeCriteria" label="Discharge Criteria" required fullWidth /></div>
    </div>
  );
};

const AddEntryForm = ({ patients, setPatients, patient, error, setError }: Props) => {
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    let entryDetails: EntryFormValues;
    const baseData: Omit<BaseEntry, 'id'> = {
      date: String(formData.get("date")),
      description: String(formData.get("description")),
      specialist: String(formData.get("specialist")),
      diagnosisCodes: String(formData.get("code")).length > 0
        ? String(formData.get("code")).split(",").map(c => c.trim())
        : undefined
    };

    switch (type) {
      case "HealthCheck":
        entryDetails = {
          type,
          ...baseData,
          healthCheckRating: Number(formData.get("rating")),
        };
        break;
      case "Hospital":
        entryDetails = {
          type,
          ...baseData,
          discharge: {
            date: String(formData.get("dischargeDate")).trim(),
            criteria: String(formData.get("dischargeCriteria")).trim()
          }
        };
        break;
      case "OccupationalHealthcare":
        entryDetails = {
          type,
          ...baseData,
          employerName: String(formData.get("employer")),
          sickLeave: {
            startDate: String(formData.get("sickLeaveStart")).trim() || "",
            endDate: String(formData.get("sickLeaveEnd")).trim() || ""
          }
        };
        break;
      default:
        const exhaustiveCheck: never = type;
        console.log(exhaustiveCheck);
        return;
    }

    try {
      const createdPatient = await patinetsService.createEntry(patient.id, entryDetails);
      const newPatients = patients.map(p => p.id === patient.id
        ? createdPatient
        : p
      );
      setPatients(newPatients);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response?.data.error);
        setError(error);
        setTimeout(() => {
          setError(undefined);
        }, 5 * 1000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form style={{ border: "solid grey", borderRadius: "10px", padding: "10px" }} onSubmit={submit}>
      <h2>New HealthCheck Entry</h2>
      <Notification error={error} />
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }} style={away}>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select labelId="entry-type" label="Entry Type" value={type} onChange={(event) => {
            setType(event.target.value);
          }}>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>
        <div style={away}><TextField name="date" label="Date" required fullWidth /></div>
        <div style={away}><TextField name="description" label="Description" required fullWidth /></div>
        <div style={away}><TextField name="specialist" label="Specialist" required fullWidth /></div>
        <div style={away}><TextField name="code" label="Diagnosis Codes (comma-separated)" fullWidth /></div>
        {type === "HealthCheck" && <HealthCheckFormContent />}
        {type === "OccupationalHealthcare" && <OccupationalHealthcareFormContent />}
        {type === "Hospital" && <HospitalFormContent />}
      </div>
      <Button variant="contained" type="submit">create</Button>
    </form>
  );
};

export default AddEntryForm;