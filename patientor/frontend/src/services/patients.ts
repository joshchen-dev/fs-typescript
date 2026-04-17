import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string, object: EntryFormValues) => {
  const targetUrl = `${apiBaseUrl}/patients/${id}/entries`;
  
  const res = await axios.post(targetUrl, object);
  return res.data;
};

export default {
  getAll,
  create: createPatient,
  createEntry
};

