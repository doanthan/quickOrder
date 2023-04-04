import { useEffect, useRef } from "react";

import { canvasPreview } from "./canvasPreview.js";

export default function CropPreview({ img, crop, canvasRef }) {
  useEffect(() => {
    if (!crop?.width || !crop?.height || !img || !canvasRef.current) {
      return;
    }

    canvasPreview(img, canvasRef.current, crop, 1, 0);
  }, [img, crop]);

  if (crop && img) {
    return (
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          maxHeight: 250,
          maxWidth: 250,
          objectFit: "contain",
        }}
      />
    );
  }
}
