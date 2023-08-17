//fetching single product for product overview
export function fetchSingleProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

//fetching filtered products
export function fetchFilteredProducts(filter, sort, pagination, admin) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += "admin=true";
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/products?" + queryString + "isAdmin=true"
    );
    const data = await response.json();
    const totalPages = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalPages: +totalPages } });
  });
}

//fetching all the categories
export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/brands");
    const data = await response.json();
    resolve({ data });
  });
}

//creating new product
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

//update the product from edit
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
