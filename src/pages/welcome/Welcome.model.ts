import * as Yup from "yup";

export interface IWelcome {
  name: string;
}

export const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(20, "Name is too long")
    .required("Name is required"),
});

export const initValues = { name: "" };
