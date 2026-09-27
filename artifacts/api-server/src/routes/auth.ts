import { Router, type IRouter } from "express";
import { GetAuthSessionResponse } from "@workspace/api-zod";
import { getClerkUserId, getOrCreateAppUser } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/auth/session", async (req, res): Promise<void> => {
  const clerkUserId = getClerkUserId(req);
  if (!clerkUserId) {
    res.json(GetAuthSessionResponse.parse({ authenticated: false, user: null }));
    return;
  }

  const user = await getOrCreateAppUser(clerkUserId);
  res.json(
    GetAuthSessionResponse.parse({
      authenticated: Boolean(user),
      user: user
        ? {
            id: user.id,
            clerkUserId: user.clerkUserId,
            email: user.email,
            role: user.role,
            displayName: user.displayName,
          }
        : null,
    }),
  );
});

export default router;