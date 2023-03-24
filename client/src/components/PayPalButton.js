import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({
  total,
  onPaymentSuccess,
  onPaymentError,
  disabled,
}) => {
  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
  };
  return (
    <PayPalScriptProvider
      options={{
        currency: "AUD",
        "client-id":
          "AbWJPlzbHCozZ4v2mTSAofkuW9u-A9v8lvO9yYMu6EOAuNWRR1POHH_Oh8p2bG0p5VuA6zxd_ugK2UwK",
      }}
    >
      <PayPalButtons
        disabled={disabled}
        forceReRender={[total()]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onPaymentSuccess(data);
          });
        }}
        onError={(err) => {
          onPaymentError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
