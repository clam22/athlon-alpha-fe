import { Eye, EyeOff, RectangleEllipsis, Smile } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import React, { useState } from "react";
import type { AuthenticationType } from "@/types/authentication.type";
import type { LoginInput } from "@/validations/authentication.schema";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  formData: LoginForm;
  errors?: Partial<Record<keyof LoginForm, string[]>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  handleAuthType: (auth: AuthenticationType) => void;
  isSubmitting?: boolean;
}

export function LoginForm({
  formData,
  errors = {},
  handleChange,
  handleSubmit,
  handleAuthType,
  isSubmitting,
}: LoginFormProps) {
  const [isPasswordViewable, SetIsPasswordViewable] = useState<Boolean>(false);
  const handlePasswordViewability = () => {
    SetIsPasswordViewable(!isPasswordViewable);
  };

  const displayErrors = (fieldName: keyof LoginInput) => {
    return errors?.[fieldName]?.map((error, index) => (
      <FieldError className="flex-col justify-center">
        <div key={index}>{error}</div>
      </FieldError>
    ));
  };

  return (
    <Card className="w-9/12 lg:w-6/12">
      <CardHeader>
        <CardTitle className="heading3">Log In</CardTitle>
        <CardDescription>Enter your details to log in</CardDescription>
        <CardAction>
          <Button
            variant="link"
            size="lg"
            className="heading4"
            onClick={() => handleAuthType("register")}
          >
            Register
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          id="registrationForm"
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Email..."
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                    />
                    <InputGroupAddon>
                      <Smile />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.email && displayErrors("email")}
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Password..."
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={!!errors.password}
                      type={isPasswordViewable ? "text" : "password"}
                    />
                    <InputGroupAddon>
                      <RectangleEllipsis />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        onClick={handlePasswordViewability}
                      >
                        <EyeOff
                          className={`${isPasswordViewable ? "hidden" : "block"}`}
                        />
                        <Eye
                          className={`${isPasswordViewable ? "block" : "hidden"}`}
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.password && displayErrors("password")}
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className=" flex-col justify-end gap-4 pt-6">
        <Button
          className="w-full"
          size="lg"
          type="submit"
          disabled={isSubmitting}
          form="registrationForm"
          onClick={handleSubmit}
        >
          {isSubmitting ? "Logging..." : "Log in"}
        </Button>
        <Button className="w-full" size="lg" variant="secondary">
          Passwordless Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
