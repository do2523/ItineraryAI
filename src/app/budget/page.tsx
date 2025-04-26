import { Suspense } from "react";
import RedirectInput from "../_components/redirect_input";
import styles from '../../styles/Shared.module.css';

export default function Budget() {
    return (
        <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#F0F9FF]">
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <div className={styles['responsive-container']}>
                <img src="/money.png" alt="description of image" className="mr-6" />
                    <div className={styles.question}>
                        {"What's your trip budget?"}
                        <div className={styles['input-box']}>
                            <Suspense><RedirectInput href="./itinerary" /></Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}