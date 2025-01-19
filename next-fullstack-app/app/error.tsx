"use client";
import React from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  // in a real life application, we would log the error to an error tracking service, there are many logging services out there eg sentry, this will save it there for persistence
  console.error("Error", error);
  return (
    <div>
      <p>An unexpected error has occurred.</p>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
