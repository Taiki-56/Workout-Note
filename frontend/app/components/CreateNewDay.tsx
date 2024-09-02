import NativewindComponents from "../styles/NativewindComponents";

import { FieldArray, Formik } from "formik";

const { StyledView, StyledPressable, StyledText, StyledTextInput } =
  NativewindComponents;

const CreateNewDay = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <StyledView className="w-full h-full items-center m-auto bg-black text-black">
      <Formik
        initialValues={{ title: "", exercises: [""] }} //* give empty string to exercise to initialize with one exercise input
        onSubmit={(values) => {
          console.log(
            `title: ${values.title}, exercises: ${values.exercises.join(",")}`
          );
        }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
            </StyledView>
            <FieldArray name="exercises">
              {({ push, remove }) => (
                <StyledView>
                  {values.exercises.map((exercise, index) => (
                    <StyledView>
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

                  <StyledPressable onPress={() => push("")}>
                    <StyledText className="w-[100%] p-1 text-black">
                      Add more exercise
                    </StyledText>
                  </StyledPressable>
                </StyledView>
              )}
            </FieldArray>
            <StyledView className="flex flex-row justify-between">
              <StyledPressable className="w-[50%]">
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
