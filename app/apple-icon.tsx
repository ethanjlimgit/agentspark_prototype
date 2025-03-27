import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 120,
        background: "linear-gradient(to bottom right, #9333ea, #4f46e5)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "40px",
      }}
    >
      A
    </div>,
    {
      ...size,
    },
  )
}

