export type GuestCartItem = {
  id: string; // product id, used as row id too
  product_id: string;
  title: string;
  price: number;
  slug: string;
  cover_image_url: string | null;
};

const KEY = "guest_cart_v1";

export const readGuestCart = (): GuestCartItem[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};

export const writeGuestCart = (items: GuestCartItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("guest-cart-changed"));
};

export const addGuestCartItem = (item: GuestCartItem) => {
  const items = readGuestCart();
  if (!items.find((i) => i.product_id === item.product_id)) {
    items.push(item);
    writeGuestCart(items);
  }
};

export const removeGuestCartItem = (id: string) => {
  writeGuestCart(readGuestCart().filter((i) => i.id !== id));
};
