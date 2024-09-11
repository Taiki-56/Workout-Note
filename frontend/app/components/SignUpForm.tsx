import clsx from "clsx";
import { Formik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GestureResponderEvent } from "react-native";
import * as yup from "yup";

import { signUpFetch } from "../api/signUp.fetch";
import NativewindComponents from "../styles/NativewindComponents";
const {
  StyledView,
  StyledPressable,
  StyledText,
  StyledModal,
  StyledImage,
  StyledTextInput,
} = NativewindComponents;

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be maximum 20 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      "Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit."
    )
    .required("Password is required!"),
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

type ToastType = {
  message: string;
  type: string;
};

const SignUpForm = () => {
  const [toast, setToast] = useState<ToastType>({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <StyledView className="w-[60%] h-[70%] m-auto bg-gray-200">
      {toast.message && (
        <StyledView
          className={clsx(
            "fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5",
            {
              "bg-red-500": toast.type === "error",
              "bg-green-500": toast.type === "success",
            }
          )}>
          {toast.message}
        </StyledView>
      )}

      <Formik<FormData>
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          const data = await signUpFetch(values);

          //* when submitting new user, show a message according to the result
          if (data.message) {
            setToast({ message: data.message, type: "success" });
            setTimeout(() => {
              setToast({ message: "", type: "" });
            }, 4000);
          } else {
            setToast({ message: data.error, type: "error" });
            setTimeout(() => {
              setToast({ message: "", type: "" });
            }, 4000);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <StyledView className="">
            <StyledView className="p-2">
              <StyledText>Name: </StyledText>
              <StyledTextInput
                className="border border-black p-1"
                placeholder="Your name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name && (
                <StyledText className="text-red-500 ml-1 my-3">
                  {errors.name}
                </StyledText>
              )}
            </StyledView>
            <StyledView className="p-2">
              <StyledText>Email: </StyledText>
              <StyledTextInput
                className="border border-black p-1"
                placeholder="Your e-mail"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <StyledText className="text-red-500 ml-1 my-3">
                  {errors.email}
                </StyledText>
              )}
            </StyledView>
            <StyledView className="p-2">
              <StyledText>Password: </StyledText>
              <StyledTextInput
                secureTextEntry={!showPassword}
                className="border border-black p-1"
                placeholder="Your password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <StyledText className="text-red-500 ml-1 my-3">
                  {errors.password}
                </StyledText>
              )}
              <StyledView
                className={clsx(
                  `text-gray-300 absolute right-2 cursor-pointer`,
                  {
                    "text-blue-800": showPassword,
                  }
                )}>
                {showPassword ? (
                  <FaEye
                    size={25}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <FaEyeSlash
                    size={25}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </StyledView>
            </StyledView>
            <StyledPressable
              className="w-[50%] m-auto"
              // TODO Need to check if () needed for handleSubmit
              onPress={
                handleSubmit as unknown as (
                  event: GestureResponderEvent
                ) => void
              }>
              <StyledText className="m-auto">Sign Up</StyledText>
            </StyledPressable>
          </StyledView>
        )}
      </Formik>
    </StyledView>
  );
};

export default SignUpForm;
