import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
const compiled = await build({
  entryPoints: ["src/pages/hopi/demo/model.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const { initialState, products, reducer, splitCOP, total } = await import(
  "data:text/javascript;base64," +
    Buffer.from(compiled.outputFiles[0].text).toString("base64")
);

test("confirmation waits for staff, then approval reserves once and kitchen precedes payment", () => {
  let state = reducer(initialState(), {
    type: "cart",
    product: "burger",
    delta: 2,
  });
  state = reducer(state, { type: "submit", channel: "table" });
  assert.equal(state.orders.at(-1).status, "pending");
  assert.equal(state.stock.burger, 12);
  assert.equal(state.cart.length, 0);
  const id = state.orders.at(-1).id;
  assert.equal(
    reducer(state, { type: "pay", id, parts: 2 }).orders.at(-1).status,
    "pending",
  );
  state = reducer(state, { type: "approve", id });
  assert.equal(state.stock.burger, 10);
  assert.equal(reducer(state, { type: "approve", id }).stock.burger, 10);
  state = reducer(state, { type: "ready", id });
  state = reducer(state, { type: "pay", id, parts: 3 });
  assert.equal(state.orders.at(-1).status, "paid");
  assert.equal(
    state.orders.at(-1).payments.reduce((a, b) => a + b, 0),
    56000,
  );
  assert.deepEqual(
    reducer(state, { type: "pay", id, parts: 3 }).orders,
    state.orders,
  );
});

test("strict mode rejects entire reservation; flexible mode allows negative stock and adjustment", () => {
  let state = initialState();
  state = reducer(state, { type: "adjust", product: "burger", amount: -12 });
  state = reducer(state, { type: "strict", value: true });
  const before = structuredClone(state.stock);
  state = reducer(state, { type: "approve", id: 103 });
  assert.deepEqual(state.stock, before);
  assert.equal(state.orders.find((o) => o.id === 103).status, "pending");
  assert.equal(state.notice, "shortage");
  state = reducer(state, { type: "strict", value: false });
  state = reducer(state, { type: "approve", id: 103 });
  assert.equal(state.stock.burger, -2);
  state = reducer(state, { type: "adjust", product: "burger", amount: 5 });
  assert.equal(state.stock.burger, 3);
});

test("splits preserve every COP, empty cart cannot create order, totals use catalogue", () => {
  assert.deepEqual(splitCOP(10001, 3), [3334, 3334, 3333]);
  for (let parts = 1; parts <= 6; parts++) {
    assert.equal(
      splitCOP(55001, parts).reduce((a, b) => a + b, 0),
      55001,
    );
  }
  assert.equal(
    reducer(initialState(), { type: "submit", channel: "delivery" }).orders
      .length,
    3,
  );
  assert.equal(
    total([{ product: "burger", quantity: 2 }]),
    products[0].price * 2,
  );
});

test("full reset restores stock, orders, cart, brand and strict mode", () => {
  let state = reducer(initialState(), { type: "brand", value: "copper" });
  state = reducer(state, { type: "strict", value: true });
  state = reducer(state, { type: "cart", product: "burger", delta: 1 });
  state = reducer(state, { type: "reset" });
  assert.deepEqual(state, initialState());
});

test("empty stock works above the manual adjustment limit", () => {
  let state = reducer(initialState(), {
    type: "adjust",
    product: "burger",
    amount: 999,
  });
  assert.equal(state.stock.burger, 1011);
  state = reducer(state, { type: "empty", product: "burger" });
  assert.equal(state.stock.burger, 0);
});
