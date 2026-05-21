import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
            boxShadow: "0 10px 24px rgba(37, 99, 235, 0.28)",
          }}
        >
          <div
            style={{
              width: 30,
              height: 24,
              position: "relative",
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                height: 10,
                border: "4px solid rgba(255,255,255,0.95)",
                borderRadius: 5,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "7px 3px auto 3px",
                height: 10,
                border: "4px solid rgba(255,255,255,0.78)",
                borderRadius: 5,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "14px 6px auto 6px",
                height: 10,
                border: "4px solid rgba(255,255,255,0.58)",
                borderRadius: 5,
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
