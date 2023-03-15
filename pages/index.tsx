import { useCopyToClipboard } from "@/libs/hooks/use-copy-to-clipboard";
import { useAccount } from "@/libs/hooks/use-polybase";
import { CheckCircleOutline, ContentCopy } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [nftId, setNftId] = useState("");
  const { copyToClipboard, hasCopied } = useCopyToClipboard();
  const { authed, signIn, signOut, updateName, address, name } = useAccount();

  return (
    <>
      <Typography variant="h2">Lorem Ipsum</Typography>

      <Button onClick={() => updateName("hello")} variant="contained">
        Update record
      </Button>

      {authed && address ? (
        <>
          <Typography variant="h3">{name}</Typography>
          <div className="flex items-center gap-2">
            <Typography>{address}</Typography>
            <IconButton onClick={() => copyToClipboard(address)}>
              {hasCopied ? (
                <CheckCircleOutline fontSize="small" />
              ) : (
                <ContentCopy fontSize="small" />
              )}
            </IconButton>
          </div>
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
