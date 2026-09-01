import { Suspense } from "react";

import { CheckoutView } from "./checkout-view";

export const metadata = {
  title: "Checkout — MinuteX",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-ink-soft">
          Loading checkout…
        </div>
      }
    >
      <CheckoutView />
    </Suspense>
  );
}
