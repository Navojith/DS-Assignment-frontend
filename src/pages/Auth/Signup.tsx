import SignUpForm from "../../components/Auth/SignupForm";
import PageContainer from "../../components/PageContainer/PageContainer";

const SignUp = () => {
  return (
    <PageContainer justifyContentCenter={true} alignItemsCenter={true}>
      <SignUpForm />
    </PageContainer>
  );
};

export default SignUp;
