import { Button, Typography } from "@mui/material";
import { toast } from "sonner";

export default function Home() {
  return (
    <>
      <div>hello world</div>
      <Typography variant="h2">Lorem Ipsum</Typography>
      <Button onClick={() => toast('hello')} variant="contained">Hello World</Button>
    </>
  );
}
