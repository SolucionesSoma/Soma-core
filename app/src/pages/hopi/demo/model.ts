export type ProductId = "burger" | "bowl" | "lemonade" | "coffee";
export type Item = { product: ProductId; quantity: number };
export type Order = {
  id: number;
  channel: "table" | "delivery";
  status: "pending" | "preparing" | "ready" | "paid";
  items: Item[];
  payments: number[];
};
export type State = {
  orders: Order[];
  stock: Record<ProductId, number>;
  cart: Item[];
  strict: boolean;
  brand: "hopi" | "copper";
  notice:
    | ""
    | "submitted"
    | "approved"
    | "ready"
    | "paid"
    | "shortage"
    | "adjusted";
};
export type Action =
  | { type: "cart"; product: ProductId; delta: number }
  | { type: "submit"; channel: Order["channel"] }
  | { type: "approve" | "ready"; id: number }
  | { type: "pay"; id: number; parts: number }
  | { type: "empty"; product: ProductId }
  | { type: "adjust"; product: ProductId; amount: number }
  | { type: "strict"; value: boolean }
  | { type: "brand"; value: State["brand"] }
  | { type: "reset" };
export const products: {
  id: ProductId;
  es: string;
  en: string;
  category: string;
  price: number;
}[] = [
  {
    id: "burger",
    es: "Hamburguesa de la casa",
    en: "House burger",
    category: "food",
    price: 28000,
  },
  {
    id: "bowl",
    es: "Bowl de la huerta",
    en: "Garden bowl",
    category: "food",
    price: 24000,
  },
  {
    id: "lemonade",
    es: "Limonada natural",
    en: "Fresh lemonade",
    category: "drinks",
    price: 9000,
  },
  {
    id: "coffee",
    es: "Café colombiano",
    en: "Colombian coffee",
    category: "drinks",
    price: 6000,
  },
];
export const total = (items: Item[]) =>
  items.reduce(
    (sum, item) =>
      sum + products.find((p) => p.id === item.product)!.price * item.quantity,
    0,
  );
export const splitCOP = (amount: number, parts: number) => {
  const count = Number.isInteger(parts) ? Math.max(1, Math.min(6, parts)) : 1;
  return Array.from(
    { length: count },
    (_, i) => Math.floor(amount / count) + (i < amount % count ? 1 : 0),
  );
};
export const initialState = (): State => ({
  orders: [
    {
      id: 101,
      channel: "table",
      status: "ready",
      items: [
        { product: "burger", quantity: 1 },
        { product: "lemonade", quantity: 2 },
      ],
      payments: [],
    },
    {
      id: 102,
      channel: "delivery",
      status: "preparing",
      items: [{ product: "bowl", quantity: 2 }],
      payments: [],
    },
    {
      id: 103,
      channel: "table",
      status: "pending",
      items: [{ product: "burger", quantity: 2 }],
      payments: [],
    },
  ],
  stock: { burger: 12, bowl: 8, lemonade: 24, coffee: 30 },
  cart: [],
  strict: false,
  brand: "hopi",
  notice: "",
});
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "reset":
      return initialState();
    case "cart": {
      const quantity = Math.max(
        0,
        Math.min(
          20,
          (state.cart.find((i) => i.product === action.product)?.quantity ??
            0) + action.delta,
        ),
      );
      return {
        ...state,
        notice: "",
        cart: [
          ...state.cart.filter((i) => i.product !== action.product),
          ...(quantity ? [{ product: action.product, quantity }] : []),
        ],
      };
    }
    case "submit":
      return state.cart.length
        ? {
            ...state,
            cart: [],
            notice: "submitted",
            orders: [
              ...state.orders,
              {
                id: Math.max(...state.orders.map((o) => o.id)) + 1,
                channel: action.channel,
                status: "pending",
                items: state.cart.map((i) => ({ ...i })),
                payments: [],
              },
            ],
          }
        : state;
    case "strict":
      return { ...state, strict: action.value, notice: "" };
    case "brand":
      return { ...state, brand: action.value, notice: "" };
    case "empty":
      return {
        ...state,
        stock: { ...state.stock, [action.product]: 0 },
        notice: "adjusted",
      };
    case "adjust":
      return Number.isInteger(action.amount) && Math.abs(action.amount) <= 999
        ? {
            ...state,
            stock: {
              ...state.stock,
              [action.product]: state.stock[action.product] + action.amount,
            },
            notice: "adjusted",
          }
        : state;
    case "approve": {
      const order = state.orders.find((o) => o.id === action.id);
      if (!order || order.status !== "pending") return state;
      if (
        state.strict &&
        order.items.some((i) => state.stock[i.product] < i.quantity)
      )
        return { ...state, notice: "shortage" };
      const stock = { ...state.stock };
      order.items.forEach((i) => {
        stock[i.product] -= i.quantity;
      });
      return {
        ...state,
        stock,
        notice: "approved",
        orders: state.orders.map((o) =>
          o.id === order.id ? { ...o, status: "preparing" } : o,
        ),
      };
    }
    case "ready":
      return state.orders.some(
        (o) => o.id === action.id && o.status === "preparing",
      )
        ? {
            ...state,
            notice: "ready",
            orders: state.orders.map((o) =>
              o.id === action.id ? { ...o, status: "ready" } : o,
            ),
          }
        : state;
    case "pay":
      return state.orders.some(
        (o) => o.id === action.id && o.status === "ready",
      )
        ? {
            ...state,
            notice: "paid",
            orders: state.orders.map((o) =>
              o.id === action.id
                ? {
                    ...o,
                    status: "paid",
                    payments: splitCOP(total(o.items), action.parts),
                  }
                : o,
            ),
          }
        : state;
  }
}
