// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

//update cart items
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

//delete cart items
export function deleteCartItems(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "appliation/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

//reset cart after the order has placed
export async function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteCartItems(item.id);
    }
    resolve({ status: "success" });
  });
}
