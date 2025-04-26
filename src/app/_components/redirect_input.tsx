"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "./input";

export default function RedirectInput({ href }: { href: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname().slice(1);

    return(
        <div>
            <Input onSubmit={(input) => {
                const queryParamString = new URLSearchParams();
            
                searchParams.forEach((name, value) => {
                    queryParamString.append(value, name);
                })

                queryParamString.append(pathName, input);

                router.push(`/${href}?${queryParamString.toString()}`);
            }}/>
        </div>
    );
}