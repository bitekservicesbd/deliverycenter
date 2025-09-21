"use client";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const QrCodeScanner = () => {
  const videoRef = useRef(null);
  const [qrScanner, setQrScanner] = useState(null);
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    if (videoRef.current) {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log("Decoded QR code:", result.data);
          setScannedResult(result.data);
        },
        {
          onDecodeError: (error) => {
            console.warn(error);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      setQrScanner(scanner);
      scanner.start();

      return () => {
        scanner.stop();
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video
        ref={videoRef}
        className="h-[500px] w-full border-2 border-black"
      ></video>

      {scannedResult && (
        <div className="rounded border bg-gray-100 p-2">
          <strong>Scanned Result:</strong> {scannedResult}
        </div>
      )}

      <button
        className="rounded bg-red-500 px-4 py-2 text-white"
        onClick={() => qrScanner?.stop()}
      >
        Stop Scanner
      </button>
      <button
        className="rounded bg-green-500 px-4 py-2 text-white"
        onClick={() => qrScanner?.start()}
      >
        Start Scanner
      </button>
    </div>
  );
};

export default QrCodeScanner;
