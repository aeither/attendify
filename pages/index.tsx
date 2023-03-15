import { Button, Stack, Typography } from "@mui/material";
import { toast } from "sonner";
import { Auth } from "@polybase/auth";
import {
  ethPersonalSign,
  ethPersonalSignRecoverPublicKey,
} from "@polybase/eth";
import { Polybase } from "@polybase/client";
import { useEffect, useState } from "react";
import { useCollectionUser, usePB } from "@/libs/hooks/use-polybase";

export default function Home() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [nftId, setNftId] = useState("");

  const { data, error, loading } = useCollectionUser();
  console.log("🚀 ~ file: index.tsx:17 ~ Home ~ data:", data);
  const { authed, signIn, signOut, updateName } = usePB();

  return (
    <>
      <div>hello world</div>
      <Typography variant="h2">Lorem Ipsum</Typography>

      <Button onClick={() => updateName("hello")} variant="contained">
        Update record
      </Button>

      {authed ? (
        <Button onClick={signOut} variant="contained">
          Logout
        </Button>
      ) : (
        <Button onClick={signIn} variant="contained">
          Login
        </Button>
      )}
    </>
  );
}
