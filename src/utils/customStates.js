import { useState } from "react";

export function useFormState(initialVal) {
  const [val, stateSetVal] = useState(initialVal);
  const [err, setErr] = useState("");

  function setVal(newVal) {
    stateSetVal(newVal);
    setErr("");
  }

  return { val, setVal, err, setErr };
}

export function getFormStateValues(fieldsObj) {
  const output = {};
  for (const field in fieldsObj) {
    output[field] = fieldsObj[field].val;
  }
  return output;
}

export function getFormStateValuesAsFormData(fieldsObj) {
  const formData = new FormData();
  for (const field in fieldsObj) {
    const val = fieldsObj[field].val;
    if (val instanceof Array) {
      formData.append(
        field,
        val.map((arrVal) => arrVal)
      );
    } else {
      formData.append(field, val);
    }
  }
  return formData;
}
/**
 * Place the error messages in the corresponding places.
 * @param  {Error} resAction
 * @param  {Object} fieldsObj
 * @param  {(msg: string) => void} setGeneralError
 */
export function handleFormStateErrors(resAction, fieldsObj, setGeneralError) {
  if (!resAction.response) {
    setGeneralError(resAction.message);
    return;
  }
  if (resAction.response.data.name === "FirebaseError") {
    setGeneralError(resAction.message);
    return;
  }
  const { msg, err } = resAction.response.data;
  if (err) {
    for (const field in fieldsObj) {
      fieldsObj[field]?.setErr(err[field]);
    }
  }
  setGeneralError(msg);
}
