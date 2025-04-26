import { Suspense } from "react";
import RedirectInput from "../_components/redirect_input";
import RedirectButton from "../_components/redirect_button";
import styles from '../../styles/Shared.module.css';

export default function TravelerCount() {
    return(
        <div className="relative min-h-screen w-screen flex items-center justify-center bg-sky-50">
            <div className="flex flex-col items-center justify-center h-screen w-screen text-4xl font-semibold">
                <div className={styles.question}>
                    Solo or accompanied?
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                    <div className = "w-80 h-64">
                        <Suspense><RedirectButton href="budget">Solo</RedirectButton></Suspense>
                    </div>
                    <div className = "flex flex-col justify-center items-center w-80 h-64 rounded-[2rem] bg-white shadow-lg">
                        <p className="text-3xl text-slate-700 text-center font-bold mb-[-1rem]">Accompanied by</p>
                        <div className="mx-4">
                            <div className={styles['input-box']}>
                                <Suspense><RedirectInput href="budget"></RedirectInput></Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}