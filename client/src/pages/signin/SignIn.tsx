import React from "react";
import style from "../../assets/styles/pages/signin.module.scss";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <div className={style.signInPage}>
      <SignIn path="/sign-in" signUpUrl="/sign-up/"/>
    </div>
  );
};

export default SignInPage;
