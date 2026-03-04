import { AtSign, Eye, EyeOff, RectangleEllipsis, Smile } from "lucide-react";
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
import { useState, type ChangeEvent, type MouseEventHandler } from "react";
import type { AuthenticationType } from "@/types/authentication.type";
import type { RegisterInput } from "@/validations/authentication.schema";

interface RegistrationForm {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  formData: RegistrationForm;
  errors?: Partial<Record<keyof RegistrationForm, string[]>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  handleAuthType: (e: AuthenticationType) => void;
  isSubmitting?: boolean;
}

export function RegistrationForm({
  formData,
  errors = {},
  handleChange,
  handleSubmit,
  handleAuthType,
  isSubmitting,
}: RegistrationFormProps) {
  const [isPasswordViewable, SetIsPasswordViewable] = useState<Boolean>(false);
  const handlePasswordViewability = () => {
    SetIsPasswordViewable(!isPasswordViewable);
  };

  const displayErrors = (fieldName: keyof RegisterInput) => {
    return errors?.[fieldName]?.map((error, index) => (
      <FieldError className="flex-col justify-center">
        <div key={index}>{error}</div>
      </FieldError>
    ));
  };

  return (
    <Card className="w-9/12 lg:w-6/12">
      <CardHeader>
        <CardTitle className="heading3">Registration</CardTitle>
        <CardDescription>
          Enter your details to register an account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            size="lg"
            className="heading4"
            onClick={() => handleAuthType("login")}
          >
            Login
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
                  <FieldLabel>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Name..."
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                    />
                    <InputGroupAddon>
                      <Smile />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.name && displayErrors("name")}
                </Field>
                <Field>
                  <FieldLabel>Surname</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Surname..."
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      aria-invalid={!!errors.surname}
                    />
                    <InputGroupAddon>
                      <Smile />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.surname && displayErrors("surname")}
                </Field>
                <Field>
                  <FieldLabel className="">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Email..."
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      type="email"
                    />
                    <InputGroupAddon>
                      <AtSign />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.email && displayErrors("email")}
                </Field>
                <Field>
                  <FieldLabel className="">Password</FieldLabel>
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
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
}
