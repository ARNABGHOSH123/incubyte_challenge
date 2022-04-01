import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const CreateWordForm = ({
  loading,
  wordCreatedSuccess,
  setWordCreatedSuccess,
}) => {
  return (
    <Form>
      <div className={"flex flex-col space-y-2 items-center"}>
        <Input
          disabled={loading}
          name={"word"}
          label={
            <span>
              Enter a new word: <span className="text-red-500">*</span>
            </span>
          }
          type={"text"}
          onDataChange={(_) => {
            setWordCreatedSuccess(false);
          }}
          className={`border w-48 border-b-4 focus:outline-none py-4 px-2 ${
            loading ? "border-gray-500" : "border-red-500"
          } rounded h-8`}
        />
        {wordCreatedSuccess && (
          <div className={"text-green-500 text-xs"}>
            Word created successfully
          </div>
        )}
        <div>
          <button
            disabled={loading}
            type="submit"
            className={`${
              loading ? "bg-gray-400" : "bg-red-400 hover:bg-red-500"
            } text-white p-2 rounded w-48`}
          >
            {loading ? "Creating..." : "Create Word"}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default function CreateWords() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [wordCreatedSuccess, setWordCreatedSuccess] = useState(false);

  const initialValues = {
    word: "",
  };
  const onSubmit = async (values) => {
    try {
      setError(null);
      setLoading(true);
      await axios?.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-word`,
        { word: values?.word },
        { headers: { "Content-Type": "application/json" } }
      );
      setLoading(false);
      setWordCreatedSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error?.response);
      setWordCreatedSuccess(false);
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values?.word) {
      errors.word = "* Required";
    }
    return errors;
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      validateOnChange={true}
    >
      <CreateWordForm
        loading={loading}
        wordCreatedSuccess={wordCreatedSuccess}
        setWordCreatedSuccess={setWordCreatedSuccess}
      />
    </Formik>
  );
}
