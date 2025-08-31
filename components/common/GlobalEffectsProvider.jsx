"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function GlobalEffectsProvider() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  const pathname = usePathname();
  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  return <></>;
}
