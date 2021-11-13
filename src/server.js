import { app } from "./app.js";
import { imgApp } from "./image-server/img-server.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});

imgApp.listen(4001, () => {
  console.log(`Img server running ${4001}`);
});
