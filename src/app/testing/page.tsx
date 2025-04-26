"use client";
import { api } from "~/trpc/react";
import { useState } from "react";

export default function Page() {
  const [location, setLocation] = useState("");

  const createSearch = api.location.createSearch.useMutation();

  const handleSubmit = () => {
    createSearch.mutate({ location });
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
