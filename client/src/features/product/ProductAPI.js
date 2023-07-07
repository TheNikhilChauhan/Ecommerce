// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchFilteredProducts(filter, sort, pagination) {
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

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/products?" + queryString
    );
    const data = await response.json();
    const totalPages = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalPages: +totalPages } });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/category");
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
