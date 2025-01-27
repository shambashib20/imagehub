"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ImageKitProvider, IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
    const authenticator = async () => {
        try {
            const res = await fetch("/api/imagekit-auth");
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Request failed with status ${res.status}: ${errorText}`);
            }
            const data = await res.json();
            return {
                signature: data.signature,
                expire: data.expire,
                token: data.token
            };
        } catch (error: any) {
            throw error;
        }
    };


    return (
        <SessionProvider refetchInterval={5*60}>
            <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
    )

}
