# Issue

- `patientor-tests` contradicts with `patientor-api-tests`. `patientor-api-tests` expects the backend doesn't include `ssn` field for patients data, while `patientor-tests` expects the patients data sent from the backend includes `ssn` field.