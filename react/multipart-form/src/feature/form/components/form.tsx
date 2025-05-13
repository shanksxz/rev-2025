import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik, type FormikHelpers, type FormikProps } from "formik"
import { Button, Stepper, Step, StepLabel, Box, Container, Typography } from "@mui/material";
import * as yup from "yup";

const steps = ["Personal Info", "Contact Info", "Summary"];

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const formSchema = [
  yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
  }),
  yup.object({
    email: yup.string().email("Invalid email").required("Required"),
    phone: yup.string().required("Required"),
  }),
  yup.object(),
];

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};


const Step1 = ({ formik }: { formik: FormikProps<FormValues> }) => (
  <>
    <TextField
      label="First Name"
      name="firstName"
      value={formik.values.firstName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
      helperText={formik.touched.firstName && formik.errors.firstName}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Last Name"
      name="lastName"
      value={formik.values.lastName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
      helperText={formik.touched.lastName && formik.errors.lastName}
      fullWidth
      margin="normal"
    />
  </>
);


const Step2 = ({ formik }: { formik: FormikProps<FormValues> }) => (
  <>
    <TextField
      label="Email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Phone"
      name="phone"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.phone && Boolean(formik.errors.phone)}
      helperText={formik.touched.phone && formik.errors.phone}
      fullWidth
      margin="normal"
    />
  </>
);

const Step3 = ({ values }: { values: FormValues }) => (
  <Box>
    <Typography variant="h6">Review Your Details</Typography>
    <pre>{JSON.stringify(values, null, 2)}</pre>
  </Box>
);


export default function Form() {
  const [currStep, setCurrStep] = useState(0);
  const isLastStep = currStep === steps.length - 1;

  const handlePrevious = () => setCurrStep((prev) => prev - 1);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: formSchema[currStep],
    onSubmit: (values, actions: FormikHelpers<FormValues>) => {
      if (!isLastStep) {
        setCurrStep((prev) => prev + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      } else {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
        setCurrStep(0);
      }
    },
  })

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Multi-Step Form Example
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stepper activeStep={currStep} sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {currStep === 0 && <Step1 formik={formik} />}
        {currStep === 1 && <Step2 formik={formik} />}
        {currStep === 2 && <Step3 values={formik.values} />}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            disabled={currStep === 0}
            onClick={handlePrevious}
            variant="contained"
            type="button"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </Box>
      </form>
    </Container>
  )
}
