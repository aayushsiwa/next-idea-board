import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

initializeApp({
    credential: applicationDefault(),
});

export async function fetchUser(token: string) {
    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        const user = await getAuth().getUser(decodedToken.uid);
        return user;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = await fetchUser(token);
        return res.status(200).json(user);
    } catch (error:any) {
        return res.status(401).json({ error: error.message });
    }
}
