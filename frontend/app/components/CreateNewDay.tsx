import clsx from "clsx";
import { FieldArray, Formik } from "formik";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import * as yup from "yup";

import { dayFetch } from "../api/day.fetch";
import NativewindComponents from "../styles/NativewindComponents";

const formSchema = yup.object().shape({
  title: yup.string().required("Day name is required!"),
  exercises: yup
    .array()
    .of(yup.string())
    //* on this code, adding validation for when all the exercises are empty
    //* if it returns false, show error message
    .test(
      "exercises-not-all-empty",
      "At least one exercise is required!",
      (value) => {
        //* filter exercises if value is empty string, like ""
        const filteredExercises = value?.filter(
          (exercise) => exercise?.trim() !== ""
        );

        return filteredExercises && filteredExercises.length > 0;
      }
    ),
});

type FormData = {
  title: string;
  exercises: string[];
};

type ToastType = {
  message: string;
  type: string;
};

const { StyledView, StyledPressable, StyledText, StyledTextInput } =
  NativewindComponents;

const CreateNewDay = ({ closeModal }: { closeModal: () => void }) => {
  const [toast, setToast] = useState<ToastType>({ message: "", type: "" });
  return (
    <StyledView className="w-full h-full items-center m-auto bg-black text-black">
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
        //* give empty string to exercise to initialize with one exercise input
        initialValues={{ title: "", exercises: [""] }}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          //* on this code, filter exercises if value is empty string, like ""
          //* which means user cannot send data if all the exercises are empty
          const filteredExercises = values.exercises.filter(
            (exercise) => exercise.trim() !== ""
          );

          //* return the error if all the exercises are empty
          if (filteredExercises.length === 0) {
            setToast({
              message: "At least one exercise is required!",
              type: "error",
            });
            return;
          }

          const filteredData = {
            ...values,
            exercises: filteredExercises,
          };

          await dayFetch(filteredData);
          await closeModal();
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <StyledView className="bg-gray-200">
            <StyledView className=" w-[90%] p-3 mt-5">
              <StyledText>Day name: </StyledText>
              <StyledTextInput
                className="w-[100%] p-1 text-black"
                placeholder="ex) Chest Day, Leg Day, Push Day"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              {errors.title && touched.title && (
                <StyledText className="text-red-500 ml-1 my-3">
                  {errors.title}
                </StyledText>
              )}
            </StyledView>
            <FieldArray name="exercises">
              {({ push, remove }) => (
                <StyledView>
                  <StyledView>
                    {values.exercises.map((exercise, index) => (
                      <StyledView key={index}>
                        <StyledText>Exercise name: </StyledText>
                        <StyledTextInput
                          className="w-[100%] p-1 text-black"
                          placeholder="ex) bench press, squat"
                          onChangeText={handleChange(`exercises[${index}]`)}
                          onBlur={handleBlur(`exercises[${index}]`)}
                          value={exercise}
                        />
                        {/* //* Create delete button only when you have more than 1 exercise */}
                        {index > 0 && (
                          <StyledPressable onPress={() => remove(index)}>
                            <StyledText className="w-[100%] p-1 text-black">
                              Delete
                            </StyledText>
                          </StyledPressable>
                        )}
                      </StyledView>
                    ))}
                  </StyledView>

                  <StyledPressable onPress={() => push("")}>
                    <StyledText className="w-[100%] p-1 text-black">
                      Add more exercise
                    </StyledText>
                  </StyledPressable>
                </StyledView>
              )}
            </FieldArray>
            <StyledView className="flex flex-row justify-between">
              <StyledPressable
                className="w-[50%]"
                onPress={
                  handleSubmit as unknown as (
                    event: GestureResponderEvent
                  ) => void
                }>
                <StyledText className="text-white m-auto">Save</StyledText>
              </StyledPressable>
              <StyledPressable
                className="w-[50%]"
                onPress={closeModal}>
                <StyledText className="text-white m-auto">Cancel</StyledText>
              </StyledPressable>
            </StyledView>
          </StyledView>
        )}
      </Formik>
    </StyledView>
  );
};

export default CreateNewDay;
