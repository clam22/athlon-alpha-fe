import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFoundView() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="heading1 font-bold">404 - Page Not Found</h1>
      <p className="heading4 mt-4">
        The page you are looking for doesn't exist.
      </p>
      <Button asChild variant="link">
        <Link to="/" className="mt-6">
          Go back home
        </Link>
      </Button>
    </div>
  );
}
