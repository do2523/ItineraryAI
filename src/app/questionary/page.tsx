import React, { Suspense } from "react";
import RedirectButton from "../_components/redirect_button";
import styles from '../../styles/Shared.module.css';


export default function Questionary() {
    return(
        <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#F0F9FF]">
            <div className="flex flex-col items-center justify-center h-screen w-screen text-4xl font-semibold">
                    <div className={styles.question}>
                        What kind of traveler are you?
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mt-8">
                        <div className = "w-48 h-48">
                            <Suspense><RedirectButton color="green" href="traveler_count">Adventure Seeker</RedirectButton></Suspense>
                        </div>
                        <div className = "w-48 h-48">
                            <Suspense><RedirectButton color="cyan" href="traveler_count">Relaxation Enthusiast</RedirectButton></Suspense>
                        </div>
                        <div className = "w-48 h-48">
                            <Suspense><RedirectButton color="stone" href="traveler_count">Culture Enjoyer</RedirectButton></Suspense>
                        </div>
                        <div className = "w-48 h-48">
                            <Suspense><RedirectButton color="amber" href="traveler_count">The Foodie</RedirectButton></Suspense>
                        </div>
                    </div>
                </div>
            </div>
    )
}