import { usePB } from "@/libs/hooks/use-polybase";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [nftId, setNftId] = useState("");

  const { authed, signIn, signOut, updateName, address, name } = usePB();

  return (
    <>
      <div>hello world</div>
      <Typography variant="h2">Lorem Ipsum</Typography>

      <Button onClick={() => updateName("hello")} variant="contained">
        Update record
      </Button>

      {authed ? (
        <>
          <Typography variant="h3">{name}</Typography>
          <Typography>{address}</Typography>
          <Button onClick={signOut} variant="contained">
            Logout
          </Button>
        </>
      ) : (
        <Button onClick={signIn} variant="contained">
          Login
        </Button>
      )}
    </>
  );
}
