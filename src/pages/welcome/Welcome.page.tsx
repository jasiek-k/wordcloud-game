import React, { useCallback } from "react";
import { Formik, Field, Form } from "formik";
import { useHistory } from "react-router-dom";

import { GAMEPLAY_ROUTE, USERNAME_STORAGE } from "../../config";

import { initValues, schema, IWelcome } from "./Welcome.model";
import "./Welcome.styles.scss";

const Welcome: React.FC = () => {
  const { push } = useHistory();

  const submitName = useCallback(
    ({ name }: IWelcome) => {
      localStorage.setItem(USERNAME_STORAGE, name);
      push(GAMEPLAY_ROUTE);
    },
    [push]
  );

  return (
    <div className="page">
      <div className="page--content">
        <h1 className="common-header">Wordcloud game</h1>
        <Formik
          initialValues={initValues}
          validationSchema={schema}
          onSubmit={submitName}
        >
          {({ errors }) => (
            <Form className="welcome__form">
              <div className="welcome__form__input">
                <Field
                  className="welcome__form__input--field"
                  placeholder="Enter your nickname here..."
                  name="name"
                  type="text"
                />
                {errors?.name && (
                  <span className="welcome__form__input--error">
                    {errors.name}
                  </span>
                )}
              </div>
              <button className="common-button" type="submit">
                play
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Welcome;
