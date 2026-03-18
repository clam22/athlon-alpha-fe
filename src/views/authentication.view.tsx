import { LoginForm } from "@/components/login-form";
import { InputOTPForm } from "@/components/input-otp-form";
import { RegistrationForm } from "@/components/registration-form";
import { useRegister } from "@/hooks/use-register.hook";
import { useLogin } from "@/hooks/use-login.hook";
import { useOTP } from "@/hooks/use-otp.hook";
import type { AuthenticationMode } from "@/types/authentication.type";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthMode } from "@/store/authentication.slice";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export function AuthenticationView() {
  const mode = useAppSelector((state) => state.user.authenticationMode);
  const dispatch = useAppDispatch();

  const handleChangeAuthType = (authType: AuthenticationMode) => {
    dispatch(setAuthMode(authType));
  };

  const {
    registerFormData,
    registerFormErrors,
    onRegisterChange,
    onRegisterSubmit,
    isRegisterSubmitting,
  } = useRegister();
  const {
    loginFormData,
    loginFormErrors,
    onLoginChange,
    onLoginSubmit,
    isLoginSubmitting,
  } = useLogin();
  const {
    inputOTPFormData,
    inputOTPFormErrors,
    onInputOTPChange,
    onInputOTPSubmit,
    isOTPSubmitting,
  } = useOTP();
  return (
    <div className="fixed h-full w-full flex ">
      <div className="absolute left-20 top-15 right-20 flex items-center justify-between z-10">
        <h1 className="heading1">ἌΘΛΟΝ</h1>
        <div className="flex gap-4">
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
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
        {mode === "register" && (
          <RegistrationForm
            formData={registerFormData}
            errors={registerFormErrors}
            handleChange={onRegisterChange}
            handleSubmit={onRegisterSubmit}
            handleAuthType={handleChangeAuthType}
            isSubmitting={isRegisterSubmitting}
          />
        )}

        {mode === "login" && (
          <LoginForm
            formData={loginFormData}
            errors={loginFormErrors}
            handleChange={onLoginChange}
            handleSubmit={onLoginSubmit}
            handleAuthType={handleChangeAuthType}
            isSubmitting={isLoginSubmitting}
          />
        )}

        {mode === "confirmUser" && (
          <InputOTPForm
            formData={inputOTPFormData}
            handleChange={onInputOTPChange}
            handleSubmit={onInputOTPSubmit}
            errors={inputOTPFormErrors}
            isSubmitting={isOTPSubmitting}
          />
        )}
      </div>
    </div>
  );
}
