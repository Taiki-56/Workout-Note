// import React from "react";
import { withExpoSnack } from "nativewind";
import React, { useState } from "react";
import CreateNewDay from "../components/CreateNewDay";
import NativewindComponents from "../styles/NativewindComponents";

const { StyledView, StyledPressable, StyledText, StyledModal, StyledImage } =
  NativewindComponents;

const HomeScreen = () => {
  const [modalVisible, setrModalVisible] = useState(false);

  return (
    <StyledView className="h-[100%] p-4 flex flex-col w-full ">
      {/*  show create new day modal */}
      <StyledModal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setrModalVisible(!modalVisible)}
        className="flex h-[90%]">
        <StyledView className="flex flex-row  h-[90%]">
          <CreateNewDay closeModal={() => setrModalVisible(false)} />
          {/* <StyledPressable onPress={() => setrModalVisible(false)}>
            <RxCrossCircled />
          </StyledPressable> */}
        </StyledView>
      </StyledModal>
      <StyledView className="flex flex-row justify-end">
        <StyledPressable className="w-[20%] border">
          <StyledText className="m-auto">Edit</StyledText>
        </StyledPressable>
      </StyledView>
      <StyledView className="mb-auto">
        <StyledView className="bg-black w-[60%] p-3 m-auto mt-5">
          <StyledPressable className="w-[100%]">
            <StyledText className="text-white m-auto">Chest Day</StyledText>
          </StyledPressable>
        </StyledView>
      </StyledView>
      {/* just to make space */}
      <StyledView className="flex-1" />
      <StyledView className="bg-black w-[60%] p-3 m-auto mt-auto">
        <StyledPressable onPress={() => setrModalVisible(true)}>
          <StyledText className="text-white m-auto">Add New Day</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
};

//* wuthout withExpoSnack, you can't see any styles with nativewind
export default withExpoSnack(HomeScreen);
