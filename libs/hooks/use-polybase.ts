import { Auth } from "@polybase/auth";
import { Polybase } from "@polybase/client";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

/**
 * useAccount
 */

export function useAccount() {
  const [authed, setAuthed] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState<string | null | undefined>();

  const signIn = async () => {
    if (!auth) return;

    const res = await auth.signIn();
    if (!res) return;
  };

  const signOut = async () => {
    if (!auth) return;
    const res = await auth.signOut();
    toast("hello");
  };

  const updateName = async (name: string) => {
    const publicKey = await getPublicKey();
    if (!publicKey) return;
    const res = await db
      .collection("User")
      .record(publicKey)
      .call("setName", [name]);
    return res;
  };

  useEffect(() => {
    if (!auth) return;

    const unsub = auth.onAuthUpdate(async (authState) => {
      setAuthed(!!authState);

      if (!authState) return;

      // If login
      setAddress(authState.userId);
      db.signer(async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await auth.ethPersonalSign(data),
        };
      });

      // get public
      let publicKey = authState.publicKey
        ? authState.publicKey
        : await getPublicKey();
      if (!publicKey) return;

      // Create user if not exists
      try {
        const res = await db.collection("User").record(publicKey).get();
        setName(res.data.name);
      } catch (e) {
        const res = await db.collection("User").create([publicKey]);
        setName(res.data.name);
      }
    });

    return unsub;
  }, []);

  return {
    authed,
    address,
    name,
    signIn,
    signOut,
    updateName,
  };
}
