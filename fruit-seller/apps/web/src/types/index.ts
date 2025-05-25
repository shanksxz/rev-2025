import * as yup from "yup";

export const signInSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const signUpSchema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
	confirmPassword: yup.string().required("Confirm password is required"),
});

export type Session = {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
        role: "admin" | "user";
    };
};

export type SignInSchemaType = yup.InferType<typeof signInSchema>;
export type SignUpSchemaType = yup.InferType<typeof signUpSchema>;
