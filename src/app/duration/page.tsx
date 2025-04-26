"use client";

import { Suspense, useRef, useState } from "react";
import RedirectInput from "../_components/redirect_input";
import styles from "../../styles/Shared.module.css";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SuspenseDuration() {
  const router = useRouter();
  const createSearch = api.location.createSearch.useMutation();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<string | null>(null);
  const hasRun = useRef(false); // Flag to prevent running useEffect multiple times

  useEffect(() => {
    if (hasRun.current) return; // Skip effect if already run once
    const destination = searchParams.get("destination");
    if (destination && destination !== location) {
      createSearch.mutate({ location: destination });
      setLocation(destination);
      hasRun.current = true; // Mark as run
    }
  }, [searchParams]);
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center bg-[#F0F9FF]">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className={styles["responsive-container"]}>
          <img
            src="/calendar.png"
            alt="description of image"
            className="mr-6"
          />
          <div className={styles.question}>
            How long is your stay?
            <div className={styles["input-box"]}>
              <RedirectInput href="questionary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Duration() {
  <Suspense fallback={<div>Loading...</div>}>
    return <SuspenseDuration />;
  </Suspense>;
}
