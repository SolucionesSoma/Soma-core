import { useReducer, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChefHat,
  Coffee,
  CreditCard,
  CupSoda,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Palette,
  Plus,
  RotateCcw,
  Salad,
  Sandwich,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import type { Locale } from "../../../i18n";
import {
  initialState,
  products,
  reducer,
  splitCOP,
  total,
  type Order,
  type ProductId,
} from "./model";
import { demoCopy } from "./demoCopy";
import "./hopiDemo.css";

type Module =
  | "overview"
  | "orders"
  | "kitchen"
  | "cash"
  | "inventory"
  | "brand"
  | "assistant";
const navigation: [Module, typeof BarChart3][] = [
  ["overview", BarChart3],
  ["orders", ShoppingBag],
  ["kitchen", ChefHat],
  ["cash", CreditCard],
  ["inventory", Package],
  ["brand", Palette],
  ["assistant", MessageCircle],
];
const foodIcons = {
  burger: Sandwich,
  bowl: Salad,
  lemonade: CupSoda,
  coffee: Coffee,
};

export default function HopiDemo({ locale }: { locale: Locale }) {
  const [revision, setRevision] = useState(0);
  return (
    <DemoSession
      key={revision}
      locale={locale}
      reset={() => setRevision((value) => value + 1)}
    />
  );
}
function DemoSession({ locale, reset }: { locale: Locale; reset: () => void }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [module, setModule] = useState<Module>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [channel, setChannel] = useState<Order["channel"]>("table");
  const [parts, setParts] = useState(2);
  const [chatStep, setChatStep] = useState(0);
  const t = demoCopy[locale];
  const money = (value: number) =>
    new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  const name = (id: ProductId) => products.find((p) => p.id === id)![locale];
  const label = (order: Order) =>
    order.status === "ready"
      ? t.ready
      : order.status === "paid"
        ? t.paid
        : order.status === "pending"
          ? t.pending
          : t.preparing;
  const change = (next: Module) => {
    setModule(next);
    setMobileOpen(false);
  };
  const pending = state.orders.filter((o) => o.status === "pending");
  const preparing = state.orders.filter((o) => o.status === "preparing");
  const ready = state.orders.filter((o) => o.status === "ready");
  const paid = state.orders.filter((o) => o.status === "paid");
  const collected = paid.reduce((sum, o) => sum + total(o.items), 0);
  const menuProducts = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p[locale]
        .toLocaleLowerCase(locale)
        .includes(query.toLocaleLowerCase(locale)),
  );
  const orderBody = (order: Order) => (
    <>
      <div className="hd-order-top">
        <strong>H-{order.id}</strong>
        <span className={`hd-status ${order.status}`}>{label(order)}</span>
      </div>
      <small>{order.channel === "table" ? t.table : t.delivery}</small>
      <ul>
        {order.items.map((item) => (
          <li key={item.product}>
            <span>
              {item.quantity} × {name(item.product)}
            </span>
            <b>{money(total([item]))}</b>
          </li>
        ))}
      </ul>
      <div className="hd-order-total">
        <span>{t.total}</span>
        <strong>{money(total(order.items))}</strong>
      </div>
    </>
  );
  return (
    <div
      className={`hopi-demo ${state.brand === "copper" ? "hd-copper" : ""}`}
      data-testid="hopi-demo"
    >
      <div className="hd-note">
        <span>{t.note}</span>
        <button onClick={reset}>
          <RotateCcw size={14} />
          {t.reset}
        </button>
      </div>
      <div className="hd-shell">
        <aside
          className={`hd-side ${mobileOpen ? "open" : ""}`}
          aria-label={t.navLabel}
        >
          <div className="hd-logo">
            {state.brand === "hopi" ? (
              <img src="/hopi-rabbit.webp" width="40" height="40" alt="" />
            ) : (
              <span className="hd-monogram">C</span>
            )}
            <span>
              <strong>{state.brand === "hopi" ? "HOPI" : "CASA COBRE"}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <nav>
            {navigation.map(([id, Icon]) => (
              <button
                key={id}
                onClick={() => change(id)}
                aria-current={module === id ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{t.nav[id]}</span>
                {id === "kitchen" && preparing.length > 0 && (
                  <b aria-hidden="true">{preparing.length}</b>
                )}
              </button>
            ))}
          </nav>
          <div className="hd-side-foot">
            <span className="hd-online" />
            {locale === "es" ? "Turno de ejemplo" : "Sample shift"}
            <small>
              {locale === "es"
                ? "Propietario · Compañía demo"
                : "Owner · Demo company"}
            </small>
          </div>
        </aside>
        <div className="hd-main">
          <header className="hd-topbar">
            <button
              className="hd-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t.close : t.open}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <small>
                {state.brand === "hopi" ? "Hopi" : "Casa Cobre"} /{" "}
                {t.nav[module]}
              </small>
              <h3>{module === "overview" ? t.summary : t.nav[module]}</h3>
            </div>
            <span className="hd-avatar" aria-hidden="true">
              DM
            </span>
          </header>
          <div className="hd-content">
            <div className="hd-notice" role="status">
              {state.notice ? t.notices[state.notice] : t.greeting}
            </div>
            {module === "overview" && (
              <>
                <div className="hd-metrics">
                  {[
                    [t.active, state.orders.length - paid.length],
                    [t.kitchen, preparing.length],
                    [t.ready, ready.length],
                    [t.collected, money(collected)],
                  ].map(([key, value]) => (
                    <article key={key}>
                      <span>{key}</span>
                      <strong>{value}</strong>
                      <small>{t.branch}</small>
                    </article>
                  ))}
                </div>
                <div className="hd-overview-grid">
                  <article className="hd-panel">
                    <h4>{t.activity}</h4>
                    <div className="hd-order-list">
                      {state.orders
                        .slice()
                        .reverse()
                        .map((order) => (
                          <button
                            key={order.id}
                            onClick={() =>
                              change(
                                order.status === "pending"
                                  ? "orders"
                                  : order.status === "preparing"
                                    ? "kitchen"
                                    : "cash",
                              )
                            }
                          >
                            <span>
                              <b>H-{order.id}</b>
                              <small>
                                {order.channel === "table"
                                  ? t.table
                                  : t.delivery}
                              </small>
                            </span>
                            <span className={`hd-status ${order.status}`}>
                              {label(order)}
                            </span>
                            <strong>{money(total(order.items))}</strong>
                          </button>
                        ))}
                    </div>
                  </article>
                  <article className="hd-next">
                    <ChefHat size={34} />
                    <span>
                      HOPI / {locale === "es" ? "OPERACIÓN" : "OPERATIONS"}
                    </span>
                    <h4>{t.shortcuts}</h4>
                    <p>{t.approval}</p>
                    <button onClick={() => change("orders")}>
                      {t.newOrder}
                      <ArrowRight size={16} />
                    </button>
                    <button onClick={() => change("kitchen")}>
                      {t.seeKitchen}
                      <ArrowRight size={16} />
                    </button>
                    <button onClick={() => change("cash")}>
                      {t.seeCash}
                      <ArrowRight size={16} />
                    </button>
                  </article>
                </div>
              </>
            )}
            {module === "orders" && (
              <>
                <div className="hd-view-head">
                  <h4>{t.menuTitle}</h4>
                  <small>{t.priceNote}</small>
                </div>
                <div className="hd-toolbar">
                  <label className="hd-search">
                    <Search size={16} />
                    <input
                      aria-label={t.search}
                      placeholder={t.search}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <div className="hd-chips">
                    {(["all", "food", "drinks"] as const).map((key) => (
                      <button
                        key={key}
                        aria-pressed={category === key}
                        onClick={() => setCategory(key)}
                      >
                        {t[key]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="hd-order-layout">
                  <div className="hd-product-grid">
                    {menuProducts.length ? (
                      menuProducts.map((product) => {
                        const Icon = foodIcons[product.id];
                        return (
                          <article className="hd-product" key={product.id}>
                            <div className={`hd-food ${product.id}`}>
                              <Icon size={48} strokeWidth={1.1} />
                            </div>
                            <div>
                              <small>
                                {product.category === "food"
                                  ? t.food
                                  : t.drinks}
                              </small>
                              <h5>{product[locale]}</h5>
                              <strong>{money(product.price)}</strong>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "cart",
                                    product: product.id,
                                    delta: 1,
                                  })
                                }
                                aria-label={`${t.add} ${product[locale]}`}
                              >
                                <Plus size={16} />
                                {t.add}
                              </button>
                            </div>
                          </article>
                        );
                      })
                    ) : (
                      <p className="hd-empty">{t.noResults}</p>
                    )}
                  </div>
                  <article className="hd-cart hd-panel">
                    <h4>{t.cart}</h4>
                    <label>
                      {locale === "es" ? "Tipo de pedido" : "Order type"}
                      <select
                        value={channel}
                        onChange={(event) =>
                          setChannel(event.target.value as Order["channel"])
                        }
                      >
                        <option value="table">{t.table}</option>
                        <option value="delivery">{t.delivery}</option>
                      </select>
                    </label>
                    {state.cart.length ? (
                      state.cart.map((item) => (
                        <div className="hd-cart-item" key={item.product}>
                          <strong>{name(item.product)}</strong>
                          <div>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "cart",
                                  product: item.product,
                                  delta: -1,
                                })
                              }
                              aria-label={`${t.remove} ${name(item.product)}`}
                            >
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "cart",
                                  product: item.product,
                                  delta: 1,
                                })
                              }
                              aria-label={`${t.add} ${name(item.product)}`}
                            >
                              <Plus size={14} />
                            </button>
                            <b>{money(total([item]))}</b>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="hd-empty">{t.cartEmpty}</p>
                    )}
                    <div className="hd-order-total">
                      <span>{t.total}</span>
                      <strong>{money(total(state.cart))}</strong>
                    </div>
                    <button
                      className="hd-primary"
                      disabled={!state.cart.length}
                      onClick={() => dispatch({ type: "submit", channel })}
                    >
                      {t.confirm}
                      <ArrowRight size={16} />
                    </button>
                    <small>{t.approval}</small>
                  </article>
                </div>
                <div className="hd-view-head">
                  <h4>{t.pending}</h4>
                  <span>{pending.length}</span>
                </div>
                <div className="hd-ticket-grid">
                  {pending.length ? (
                    pending.map((order) => (
                      <article className="hd-ticket" key={order.id}>
                        {orderBody(order)}
                        <button
                          className="hd-primary"
                          onClick={() =>
                            dispatch({ type: "approve", id: order.id })
                          }
                        >
                          <Check size={16} />
                          {t.approve}
                        </button>
                      </article>
                    ))
                  ) : (
                    <p className="hd-empty">{t.empty}</p>
                  )}
                </div>
              </>
            )}
            {module === "kitchen" && (
              <>
                <div className="hd-view-head">
                  <h4>{t.kitchenTitle}</h4>
                  <p>{t.kitchenCopy}</p>
                </div>
                <div className="hd-ticket-grid">
                  {preparing.length ? (
                    preparing.map((order) => (
                      <article className="hd-ticket" key={order.id}>
                        {orderBody(order)}
                        <button
                          className="hd-primary"
                          onClick={() =>
                            dispatch({ type: "ready", id: order.id })
                          }
                        >
                          <Check size={16} />
                          {t.markReady}
                        </button>
                      </article>
                    ))
                  ) : (
                    <p className="hd-empty">{t.empty}</p>
                  )}
                </div>
              </>
            )}
            {module === "cash" && (
              <>
                <div className="hd-view-head">
                  <h4>{t.cashTitle}</h4>
                  <p>{t.cashCopy}</p>
                </div>
                <label className="hd-split-control">
                  {t.split}
                  <select
                    value={parts}
                    onChange={(event) => setParts(Number(event.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="hd-ticket-grid">
                  {ready.length ? (
                    ready.map((order) => (
                      <article className="hd-ticket" key={order.id}>
                        {orderBody(order)}
                        <div className="hd-shares">
                          {splitCOP(total(order.items), parts).map(
                            (amount, i) => (
                              <span key={i}>
                                {t.person} {i + 1}
                                <b>{money(amount)}</b>
                              </span>
                            ),
                          )}
                        </div>
                        <button
                          className="hd-primary"
                          onClick={() =>
                            dispatch({ type: "pay", id: order.id, parts })
                          }
                        >
                          {t.record}
                          <Check size={16} />
                        </button>
                      </article>
                    ))
                  ) : (
                    <p className="hd-empty">{t.empty}</p>
                  )}
                </div>
                <h4 className="hd-subtitle">{t.receipt}</h4>
                {paid.length ? (
                  paid.map((order) => (
                    <div className="hd-receipt" key={order.id}>
                      <Check size={18} />
                      <strong>H-{order.id}</strong>
                      <span>
                        {order.payments
                          .map((amount) => money(amount))
                          .join(" + ")}
                      </span>
                      <b>{money(total(order.items))}</b>
                    </div>
                  ))
                ) : (
                  <p className="hd-empty">{t.paidEmpty}</p>
                )}
              </>
            )}
            {module === "inventory" && (
              <>
                <div className="hd-view-head">
                  <h4>{t.stockTitle}</h4>
                  <p>{t.stockCopy}</p>
                </div>
                <div className="hd-mode">
                  <label>
                    <input
                      type="checkbox"
                      checked={state.strict}
                      onChange={(event) =>
                        dispatch({
                          type: "strict",
                          value: event.target.checked,
                        })
                      }
                    />
                    {t.strict}
                  </label>
                  <p>{state.strict ? t.strictCopy : t.flexibleCopy}</p>
                </div>
                <div className="hd-stock-grid">
                  {products.map((product) => (
                    <StockCard
                      key={product.id}
                      title={product[locale]}
                      stock={state.stock[product.id]}
                      locale={locale}
                      empty={() =>
                        dispatch({ type: "empty", product: product.id })
                      }
                      adjust={(amount) =>
                        dispatch({
                          type: "adjust",
                          product: product.id,
                          amount,
                        })
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {module === "brand" && (
              <>
                <div className="hd-view-head">
                  <h4>{t.brandTitle}</h4>
                  <p>{t.brandCopy}</p>
                </div>
                <div className="hd-brand-options">
                  <button
                    aria-pressed={state.brand === "hopi"}
                    onClick={() => dispatch({ type: "brand", value: "hopi" })}
                  >
                    <span className="hd-swatch blue" />
                    {t.brandDefault}
                  </button>
                  <button
                    aria-pressed={state.brand === "copper"}
                    onClick={() => dispatch({ type: "brand", value: "copper" })}
                  >
                    <span className="hd-swatch copper" />
                    {t.brandCopper}
                  </button>
                </div>
                <article className="hd-brand-preview">
                  <small>{t.preview}</small>
                  {state.brand === "hopi" ? (
                    <img
                      src="/hopi-rabbit.webp"
                      alt="Hopi"
                      width="90"
                      height="90"
                    />
                  ) : (
                    <span className="hd-monogram large">C</span>
                  )}
                  <strong>
                    {state.brand === "hopi" ? "HOPI" : "CASA COBRE"}
                  </strong>
                  <h4>{t.previewTitle}</h4>
                  <p>{t.previewCopy}</p>
                  <button
                    className="hd-primary"
                    onClick={() => change("orders")}
                  >
                    {t.menuTitle}
                    <ArrowRight size={16} />
                  </button>
                </article>
              </>
            )}
            {module === "assistant" && (
              <>
                <div className="hd-view-head">
                  <h4>{t.assistantTitle}</h4>
                  <p>{t.assistantCopy}</p>
                </div>
                <div className="hd-chat">
                  <p>
                    <small>{t.bot}</small>
                    {t.botHello}
                  </p>
                  {chatStep > 0 && (
                    <>
                      <p className="guest">
                        <small>{t.customer}</small>
                        {t.showMenu}
                      </p>
                      <p>
                        <small>{t.bot}</small>
                        {t.menuReply}
                      </p>
                    </>
                  )}
                  {chatStep > 1 && (
                    <>
                      <p className="guest">
                        <small>{t.customer}</small>
                        {t.addCombo}
                      </p>
                      <p>
                        <small>{t.bot}</small>
                        {t.addedReply}
                      </p>
                    </>
                  )}
                  <div className="hd-chat-actions">
                    {chatStep === 0 ? (
                      <button
                        className="hd-primary"
                        onClick={() => setChatStep(1)}
                      >
                        {t.showMenu}
                        <ArrowRight size={16} />
                      </button>
                    ) : chatStep === 1 ? (
                      <button
                        className="hd-primary"
                        onClick={() => {
                          dispatch({
                            type: "cart",
                            product: "burger",
                            delta: 1,
                          });
                          dispatch({
                            type: "cart",
                            product: "lemonade",
                            delta: 1,
                          });
                          setChatStep(2);
                        }}
                      >
                        {t.addCombo}
                        <Plus size={16} />
                      </button>
                    ) : (
                      <>
                        <button
                          className="hd-primary"
                          disabled={!state.cart.length}
                          onClick={() => {
                            dispatch({ type: "submit", channel: "delivery" });
                            setChatStep(0);
                            change("orders");
                          }}
                        >
                          {t.confirmDelivery}
                          <Check size={16} />
                        </button>
                        <button onClick={() => change("orders")}>
                          {t.backMenu}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function StockCard({
  title,
  stock,
  locale,
  adjust,
  empty,
}: {
  title: string;
  stock: number;
  locale: Locale;
  adjust: (amount: number) => void;
  empty: () => void;
}) {
  const [amount, setAmount] = useState("5");
  const t = demoCopy[locale];
  const valid =
    amount.trim() !== "" &&
    Number.isInteger(Number(amount)) &&
    Math.abs(Number(amount)) <= 999;
  return (
    <article className="hd-panel hd-stock">
      <h5>{title}</h5>
      <span>{t.stock}</span>
      <strong className={stock < 0 ? "negative" : ""}>{stock}</strong>
      {stock < 0 && <small className="negative">{t.negative}</small>}
      <label>
        {t.adjust}
        <input
          type="number"
          min="-999"
          max="999"
          step="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <button
        className="hd-primary"
        disabled={!valid || Number(amount) === 0}
        onClick={() => adjust(Number(amount))}
      >
        {t.apply}
      </button>
      <button className="hd-text-button" disabled={stock === 0} onClick={empty}>
        {t.out}
      </button>
    </article>
  );
}
