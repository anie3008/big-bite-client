

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"


export const createMenu = async (data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/menu`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create menu item");
    }
    return res.json()
};

export const getMenu = async () => {
  const res = await fetch(`${BASE_URL}/menu`);

  const text = await res.text();

  console.log("Menu API URL:", `${BASE_URL}/menu`);
  console.log("Response status:", res.status);
  console.log("Response:", text);

  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status}`);
  }

  return JSON.parse(text);
};

export const getAvailableMenu = async () => {
  const res = await fetch(`${BASE_URL}/menu/available`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch available menu items");
  }

  return res.json();
};

export const getMenuById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/menu/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch menu item");
  }

  return res.json();
};

export const getUserById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch vendor");
  }

  return res.json();
};

export const updateMenu = async (
  id: string,
  data: Record<string, unknown>
) => {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update menu item");
  }

  return res.json();
};

export const deleteMenu = async (id: string) => {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete menu item");
  return res.json();
};

export const createOrder = async (data: Record<string, unknown>) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  return res.json();
};


export const getCustomerOrders = async (customerId: string) => {
  const res = await fetch(
    `${BASE_URL}/orders?customerId=${encodeURIComponent(customerId)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch customer orders");
  }

  return res.json();
};
export const cancelOrder = async (orderId: string) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to cancel order");
  }

  return res.json();
};

export const getVendorOrders = async (vendorId: string) => {
  const res = await fetch(
    `${BASE_URL}/orders?vendorId=${encodeURIComponent(vendorId)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vendor orders");
  }

  return res.json();
};