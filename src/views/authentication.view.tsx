import { LoginForm } from "@/components/login-form";
import { InputOTPForm } from "@/components/input-otp-form";
import { RegistrationForm } from "@/components/registration-form";
import {
  ConfirmAccountSchema,
  LoginSchema,
  RegisterSchema,
  type ConfirmAccountInput,
  type LoginInput,
  type RegisterInput,
} from "@/validations/authentication.schema";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { treeifyError } from "zod";
import type { AuthenticationType } from "@/types/authentication.type";
import { AuthenticationService } from "@/services/authentication.service";
import type { RegisterResponse } from "@/interfaces/authentication.interface";
import type { User } from "@/models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import { setUser } from "@/store/authentication.slice";

export function AuthenticationView() {
  const dispatch = useDispatch<AppDispatch>();
  const currUser = useSelector((state: RootState) => state.user.user);

  const [authentication, setAuthentication] =
    useState<AuthenticationType>("login");

  const [registrationFormData, setRegistrationFormData] =
    useState<RegisterInput>({
      name: "",
      surname: "",
      email: "",
      password: "",
    });

  const [loginFormData, setLoginFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [inputOTPFormData, setInputOTPFormData] = useState<ConfirmAccountInput>(
    {
      confirmationCode: "",
    },
  );

  const [registrationFormErrors, setRegistrationFormErrors] = useState<
    Partial<Record<keyof RegisterInput, string[]>>
  >({});

  const [loginFormErrors, setLoginFormErrors] = useState<
    Partial<Record<keyof LoginInput, string[]>>
  >({});

  const [inputOTPFormErrors, setInputOTPFormErrors] = useState<
    Partial<Record<keyof ConfirmAccountInput, string[]>>
  >({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegistrationFormInputChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setRegistrationFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputOTPInputChange = (value: string) => {
    setInputOTPFormData({
      confirmationCode: value,
    });
  };

  const handleRegistrationFormInputSubmit = async () => {
    const result = RegisterSchema.safeParse(registrationFormData);

    if (!result.success) {
      const tree = treeifyError(result.error);

      const fieldErrors: Partial<Record<keyof RegisterInput, string[]>> = {
        name: tree.properties?.name?.errors,
        surname: tree.properties?.surname?.errors,
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      };

      setRegistrationFormErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    const registerPromise =
      AuthenticationService.register(registrationFormData);

    toast.promise(registerPromise, {
      loading: "Setting up your account...",
      success: "Your account is registered",
      error: "Registration Failed",
    });

    const registerResponse: RegisterResponse = await registerPromise;
    setRegistrationFormErrors({});
    setIsSubmitting(false);

    console.log(registerResponse.userConfirmed);

    handleChangeAuthType(
      registerResponse.userConfirmed ? "login" : "confirmUser",
    );
  };

  const handleLoginFormInputSubmit = async () => {
    const result = LoginSchema.safeParse(loginFormData);

    if (!result.success) {
      const tree = treeifyError(result.error);

      const fieldErrors: Partial<Record<keyof LoginInput, string[]>> = {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      };

      setLoginFormErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const loginPromise = AuthenticationService.login(loginFormData);

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Your logged in",
      error: "Loggin in Failed",
    });

    const user: User = await loginPromise;

    dispatch(setUser(user));

    setLoginFormErrors({});
    setIsSubmitting(false);

    console.log("direct to dashboard");
    console.log(currUser?.email ?? "User is null");
    toast.info(currUser?.email ?? "User is null");
    toast("You are logged in");
    toast.success("Welcome " + currUser?.name);
  };

  const handleInputOTPFormSubmit = () => {
    toast(isSubmitting);
    const result = ConfirmAccountSchema.safeParse(inputOTPFormData);

    if (!result.success) {
      const tree = treeifyError(result.error);

      const fieldErrors: Partial<Record<keyof ConfirmAccountInput, string[]>> =
        {
          confirmationCode: tree.properties?.confirmationCode?.errors,
        };

      setInputOTPFormErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);

    toast.promise(
      AuthenticationService.confirmAccount({
        email: registrationFormData.email,
        confirmationCode: inputOTPFormData.confirmationCode,
      }),
      {
        loading: "Verifying the Confirmation Code",
        success: "Your account is verified",
        error: "Failed to verify code",
      },
    );

    setInputOTPFormErrors({});
    setIsSubmitting(false);
    setAuthentication("login");
  };

  const handleChangeAuthType = (authType: AuthenticationType) => {
    setAuthentication(authType);
  };

  return (
    <div className="fixed h-full w-full flex ">
      <div className="hidden xl:basis-1/2 xl:flex h-full items-end justify-center">
        <img
          className="hidden dark:block h-10/12"
          src="/assets/black-bg-user-authentication-image.png"
        />
        <img
          className="block dark:hidden h-10/12"
          src="/assets/white-bg-user-authentication-image.png"
        />
      </div>
      <div className="w-full xl:basis-1/2 flex items-center justify-center">
        {authentication === "register" && (
          <RegistrationForm
            formData={registrationFormData}
            errors={registrationFormErrors}
            handleChange={handleRegistrationFormInputChange}
            handleSubmit={handleRegistrationFormInputSubmit}
            handleAuthType={handleChangeAuthType}
            isSubmitting={isSubmitting}
          />
        )}

        {authentication === "login" && (
          <LoginForm
            formData={loginFormData}
            errors={loginFormErrors}
            handleChange={handleLoginFormInputChange}
            handleSubmit={handleLoginFormInputSubmit}
            handleAuthType={handleChangeAuthType}
            isSubmitting={isSubmitting}
          />
        )}

        {authentication === "confirmUser" && (
          <InputOTPForm
            formData={inputOTPFormData}
            handleChange={handleInputOTPInputChange}
            handleSubmit={handleInputOTPFormSubmit}
            errors={inputOTPFormErrors}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
