import { withExpoSnack } from "nativewind";
import SignUpForm from "../components/SignUpForm";
import NativewindComponents from "../styles/NativewindComponents";

const { StyledView, StyledPressable, StyledText, StyledModal, StyledImage } =
  NativewindComponents;

const SignUpScreen = () => {
  return (
    <StyledView className="h-screen w-screen bg-black">
      <SignUpForm />
    </StyledView>
  );
};

export default withExpoSnack(SignUpScreen);
