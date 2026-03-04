import type { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldLabel } from "./ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import type { ConfirmAccountInput } from "@/validations/authentication.schema";

interface InputOTPForm {
  confirmationCode: string;
}

interface InputOTPFormProps {
  formData: InputOTPForm;
  errors?: Partial<Record<keyof ConfirmAccountInput, string[]>>;
  handleChange: (value: string) => void;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  isSubmitting: boolean;
}

export function InputOTPForm({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
}: InputOTPFormProps) {

  return (
    <Card className="w-9/12 lg:w-6/12 flex-col">
      <CardHeader>
        <CardTitle className="flex justify-center heading3">
          Verify you email address
        </CardTitle>
        <CardDescription className="flex justify-center pt-2">
          We sent an verification code to your email address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field className="flex justify-center pt-3">
          <FieldLabel
            htmlFor="otp-verification"
            className="flex justify-center pb-3"
          >
            Verification Code
          </FieldLabel>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={formData.confirmationCode}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {errors?.confirmationCode && (
            <FieldError className="flex-col justify-center mt-2">
              {errors.confirmationCode.map((error) => (
                <div className="flex justify-center">{error}</div>
              ))}
            </FieldError>
          )}
        </Field>
      </CardContent>
      <CardFooter className="pt-5">
        <Field>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
