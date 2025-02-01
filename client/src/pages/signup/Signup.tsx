import style from "../../assets/styles/pages/signup.module.scss";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className={style.signUpPage}>
      <SignUp path="/sign-up" signInUrl="/sign-in/" />
    </div>
  );
};

export default SignUpPage;
