import {
  createConfirmAccountSchema,
  type ConfirmAccountInput,
} from "@/validations/authentication.schema";
import { useForm } from "./use-form.hook";
import { useState } from "react";
import { treeifyError } from "zod";
import { AuthenticationService } from "@/services/authentication.service";
import { toast } from "sonner";
import { setAuthMode, setisConfirmed } from "@/store/authentication.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";

export function useOTP() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currUserUnconfirmedEmail = useAppSelector(
    (state) => state.user.unconfirmedEmail,
  );
  const { values, handleValueChange, isSubmitting, setIsSubmitting } =
    useForm<ConfirmAccountInput>({
      confirmationCode: "",
    });
  const [inputOTPFormErrors, setInputOTPFormErrors] = useState<
    Partial<Record<keyof ConfirmAccountInput, string[]>>
  >({});

  const handleInputOTP = async () => {
    setIsSubmitting(true);
    const ConfirmAccountSchema = createConfirmAccountSchema(t);
    const result = ConfirmAccountSchema.safeParse(values);
    if (!result.success) {
      setIsSubmitting(false);
      const tree = treeifyError(result.error);

      const fieldErrors: Partial<Record<keyof ConfirmAccountInput, string[]>> =
        {
          confirmationCode: tree.properties?.confirmationCode?.errors,
        };

      return setInputOTPFormErrors(fieldErrors);
    }

    try {
      await AuthenticationService.confirmAccount({
        email: currUserUnconfirmedEmail,
        confirmationCode: values.confirmationCode,
      });
      setIsSubmitting(false);
      toast.success("Account Confirmed Successfully", {
        description: "Your email address has been conirmed.",
      });
      dispatch(setisConfirmed());
      dispatch(setAuthMode("login"));
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error("Confirmation Failed", {
        description: error.message,
      });
      console.log(error);
    }
  };

  const handleOTPChange = (value: string) => {
    handleValueChange("confirmationCode", value);
  };

  return {
    inputOTPFormData: values,
    inputOTPFormErrors,
    onInputOTPChange: handleOTPChange,
    onInputOTPSubmit: handleInputOTP,
    isOTPSubmitting: isSubmitting,
  };
}
