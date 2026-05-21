import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
            width: 148,
            height: 148,
            borderRadius: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
            boxShadow: "0 24px 54px rgba(37, 99, 235, 0.3)",
          }}
        >
          <div
            style={{
              width: 82,
              height: 66,
              position: "relative",
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                height: 25,
                border: "10px solid rgba(255,255,255,0.96)",
                borderRadius: 11,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "20px 8px auto 8px",
                height: 25,
                border: "10px solid rgba(255,255,255,0.78)",
                borderRadius: 11,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "40px 16px auto 16px",
                height: 25,
                border: "10px solid rgba(255,255,255,0.58)",
                borderRadius: 11,
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
