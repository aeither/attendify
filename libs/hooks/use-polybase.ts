import { Button, Stack, Typography } from "@mui/material";
import { toast } from "sonner";
import { Auth } from "@polybase/auth";
import {
  ethPersonalSign,
  ethPersonalSignRecoverPublicKey,
} from "@polybase/eth";
import { Polybase } from "@polybase/client";
import { useCollection } from "@polybase/react";
import { useEffect, useState } from "react";

const db = new Polybase({
  defaultNamespace:
    "pk/0xa6ca155c486fde1b93ec326c8d6d625a24cea697027449ea8a51dad1752e26998fd99b0ff13d7d3078fe5154a819868d171a2317f121b7328e7d15ca674ae3b3/alpha",
});
const auth = typeof window !== "undefined" ? new Auth() : null;

/**
 * Utility
 */

async function getPublicKey() {
  if (!auth) return;
  const msg = "Login to app";
  const sig = await auth.ethPersonalSign(msg);
  const publicKey = ethPersonalSignRecoverPublicKey(sig, msg);
  return "0x" + publicKey.slice(4);
}

export const useCollectionUser = () => {
  const query = db.collection("User");
  return useCollection(query);
};

/**
 * Mutations
 */

export function usePB() {
  const [authed, setAuthed] = useState(false);

  const signIn = async () => {
    if (!auth) return;

    const res = await auth.signIn();
    console.log("🚀 ~ file: use-polybase.ts:38 ~ signIn ~ res:", res);
    if (!res) return;

    // get public
    let publicKey = res.publicKey ? res.publicKey : await getPublicKey();
    if (!publicKey) return;

    db.signer(async (data: string) => {
      return {
        h: "eth-personal-sign",
        sig: await auth.ethPersonalSign(data),
      };
    });

    // Create user if not exists
    try {
      const user = await db.collection("User").record(publicKey).get();
      console.log("User", user);
    } catch (e) {
      await db.collection("User").create([publicKey]);
    }

    setAuthed(!!res);
  };

  const signOut = async () => {
    if (!auth) return;
    const res = await auth.signOut();
    setAuthed(!!res);
    toast("hello");
  };

  const updateName = async (name: string) => {
    const publicKey = await getPublicKey();
    if (!publicKey) return;
    const res = await db
      .collection("User")
      .record(publicKey)
      .call("setName", [name]);
  };

  useEffect(() => {
    if (!auth) return;

    const unsub = auth.onAuthUpdate((authState) => {
      if (!authState) return;

      setAuthed(!!authState);

      db.signer(async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await auth.ethPersonalSign(data),
        };
      });
    });

    return unsub;
  }, []);

  return {
    authed,
    signIn,
    signOut,
    updateName,
  };
}
